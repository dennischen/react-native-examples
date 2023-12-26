import { Appearance, Platform } from "react-native"


export const isWeb = Platform.OS === 'web'
export const isAndroid = Platform.OS === 'android'
export const isIos = Platform.OS === 'ios'

export const notWeb = Platform.OS !== 'web'
export const notAndroid = Platform.OS !== 'android'
export const notIos = Platform.OS !== 'ios'


export const isTv = Platform.isTV
export const notTv = !Platform.isTV

export function isDark() {
    return 'dark' === Appearance.getColorScheme()
}

export function isLight() {
    return 'light' === Appearance.getColorScheme()
}


