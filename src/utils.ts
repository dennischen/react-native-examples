import { Appearance, NativeModules, Platform } from "react-native"


export const web = Platform.OS === 'web'
export const android = Platform.OS === 'android'
export const iOS = Platform.OS === 'ios'

export const tv = Platform.isTV

/**
 * User could chagne the mode anytime, so, always call to check when rendering
 * @returns 
 */
export function isDark() {
    return 'dark' === Appearance.getColorScheme()
}

/**
 * User could chagne the mode anytime, so, always call to check when rendering
 * @returns 
 */
export function isLight() {
    return 'light' === Appearance.getColorScheme()
}

export const select = Platform.select

export const deviceLanguage: string | undefined =
    iOS ?
        (NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        ) : (
            android
                ? NativeModules.I18nManager.localeIdentifier
                : undefined
        )

