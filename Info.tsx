import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import { Appearance, Platform, StyleSheet, Text, View } from 'react-native'
import { appStyles } from './utils'


export default function Info() {

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

    const platform = {
        OS: Platform.OS,
        Version: Platform.Version,
        isTV: Platform.isTV,
        isTesting: Platform.isTesting,
        colorScheme: Appearance.getColorScheme()
    }

    return (
        <View style={appStyles.page}>
            <Text>Platform {JSON.stringify(platform)}</Text>
            <Text>{moment(time).format()}</Text>
            
        </View>
    )
}


