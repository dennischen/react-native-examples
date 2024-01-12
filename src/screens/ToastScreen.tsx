import { appStyles } from '@/appStyles'
import Button from '@/components/Button'
import RerenderCounter from '@/components/RerenderCounter'
import utilStyles from '@/utilStyles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View } from 'react-native'
import Toast from 'react-native-root-toast'

export type ToastScreenProps = {
}

export default function ToastScreen(props: ToastScreenProps & Partial<NativeStackScreenProps<any>>) {


    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <View style={utilStyles.hlayout}>
                <Button label='Toast' onPress={() => {
                    Toast.show('This is a message', {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.CENTER,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                        containerStyle: {
                            backgroundColor: '#f007',
                            padding: 16
                        }
                    })
                }} />
            </View>
        </View>
    )
}


console.log(">>>>Loaded InfoScreen")