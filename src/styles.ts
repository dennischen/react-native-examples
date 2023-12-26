import { StyleSheet } from "react-native"

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
