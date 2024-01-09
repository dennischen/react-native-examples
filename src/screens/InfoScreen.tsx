import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import utilStyles from '@/utilStyles'
import { deviceLanguage } from '@/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import moment from 'moment/moment'
import { useEffect, useMemo, useState } from 'react'
import { Appearance, Platform, Text, View } from 'react-native'


export type InfoScreenProps = {
}

export default function Info(props: InfoScreenProps & Partial<NativeStackScreenProps<any>>) {

    //use Memo to prevent rerender log when timeout
    useMemo(() => {
        // console.log("Info>>", props)
    }, [props])


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
        colorScheme: Appearance.getColorScheme(),
        deviceLanguage: deviceLanguage
    }

    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <View style={[utilStyles.vlayout, { backgroundColor: '#aaa7' }]}>
                {Object.entries(platform).map(([key, value]) => (
                    <Text key={key}>
                        {key} = {value}
                    </Text>
                ))}
            </View>
            <Text>{moment(time).format()}</Text>
        </View>
    )
}


console.log(">>>>Loaded InfoScreen")