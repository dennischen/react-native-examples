import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import moment from 'moment/moment'

export default function App() {

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timeout = setInterval(() => {
            const date = new Date() 
            setTime(date)
        }, 1000)
        return () => {
            clearInterval(timeout)
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app! typescript</Text>
            <Text>{moment(time).format()}</Text>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff0',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
