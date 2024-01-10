import { StatusBar, StyleSheet } from "react-native"

/**
 * application styles
 */
export const appStyles = StyleSheet.create({
    app: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',

        backgroundColor: '#fff',
        padding: 4,
        borderWidth: 4,
        borderColor: '#00f',
    },
    screen: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',

        backgroundColor: '#ff0',
        padding: 4,
        borderWidth: 4,
        borderColor: '#f0f',
    }
})

export default appStyles
