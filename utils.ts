import { Appearance, Platform, StyleSheet } from "react-native"


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

export const styles = StyleSheet.create({
    hlayout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    vlayout: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
})

export const appStyles = StyleSheet.create({
    app: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',

        backgroundColor: '#fff',
        padding: 4,
        borderWidth: 4,
        borderColor: '#00f'
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        
        backgroundColor: '#ff0',
        padding: 4,
        borderWidth: 4,
        borderColor: '#f0f',
        width: '100%'
    },
})

