import { Appearance, Platform } from "react-native"


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

