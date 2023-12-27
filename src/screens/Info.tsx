import { appStyles } from '@/appStyles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import moment from 'moment/moment'
import { useEffect, useMemo, useState } from 'react'
import { Appearance, Platform, Text, View } from 'react-native'


export type InfoProp = {
} & Partial<NativeStackScreenProps<any>>

export default function Info(prop: InfoProp) {
    useMemo(() => {
        console.log("Info>>", prop)
    }, [prop])


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
        <View style={appStyles.screen}>
            <Text>Platform {JSON.stringify(platform)}</Text>
            <Text>{moment(time).format()}</Text>

        </View>
    )
}


