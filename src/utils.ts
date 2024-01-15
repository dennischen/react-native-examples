import { Alert, Appearance, NativeModules, Platform } from "react-native"


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

export function getDeviceLanguage(): string | undefined {
    return iOS ?
        (NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        ) : (
            android
                ? NativeModules.I18nManager.localeIdentifier
                : undefined
        )
}


export function alert(msg: string, title: string = '') {
    console.log(`${msg}${title?` ${title}`:''}`)
    if (web && typeof window === 'object') {
        //simulate non-block of Alert.alert
        setTimeout(() => {
            (window as any).alert(msg)
        }, 1)
    } else {
        Alert.alert(title, msg)
    }
}
