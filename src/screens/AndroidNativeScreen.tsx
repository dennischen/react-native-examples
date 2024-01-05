import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import CalendarModule from '@/native/CalendarModule'
import ImagePickerModule from '@/native/ImagePickerModule'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { Alert, Button, NativeEventEmitter, View } from 'react-native'



export type AndroidNativeScreenProps = {
}

export default function AndroidNativeScreen(props: AndroidNativeScreenProps & Partial<NativeStackScreenProps<any>>) {

    const onPress = () => {
        const constants = CalendarModule.getConstants()
        console.log("constants >>>", constants)
        Alert.alert("No Title", JSON.stringify(constants))
    }

    const doCreateEvent = async (name: string) => {
        console.log('>>>Will invoke the native module')
        // CalendarModule.createCalendarEvent('foo testName', 'bar testLocation', (callbackValue: string)=>{
        //     console.log(">>>callback value >>>", callbackValue)
        // })

        try {
            const result = await CalendarModule.createCalendarEvent(name, 'bar testLocation')
            console.log(">>>Result >>>", result)
            Alert.alert("No Title", result.id)
        } catch (err: any) {
            console.log(">>>Error >>>", JSON.stringify(err))
            Alert.alert("Error", err.message)
        }

    }

    const onPickImage = async () => {

        try {
            const result = await ImagePickerModule.pickImage()
            console.log(">>>Result >>>", result)
            Alert.alert("No Title", result)
        } catch (err: any) {
            console.log(">>>Error >>>", JSON.stringify(err))
            Alert.alert("Error", err.message)
        }

    }

    useEffect(() => {
        const eventEmitter = new NativeEventEmitter(ImagePickerModule)
        let eventListener1 = eventEmitter.addListener('OnStartPicker', event => {
            console.log(">>>>OnStartPicker : ", event)
        })
        let eventListener2 = eventEmitter.addListener('OnStopPicker', event => {
            console.log(">>>>OnStopPicker : ", event)
        })

        // Removes the listener once unmounted
        return () => {
            eventListener1.remove()
            eventListener2.remove()
        }
    }, [])


    return (
        <View style={[appStyles.screen, { gap: 4 }]}>
            <RerenderCounter />
            <Button
                title="Press me"
                onPress={onPress}
            />
            <Button
                title="Create event1"
                onPress={() => doCreateEvent("Event1")}
            />
            <Button
                title="Create nothing & error"
                onPress={() => doCreateEvent("")}
            />
            <Button
                title="Pick image"
                onPress={onPickImage}
            />
        </View>
    )
}


console.log(">>>>Loaded AndroidNativeScreen")