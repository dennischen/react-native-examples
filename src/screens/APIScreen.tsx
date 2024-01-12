import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import utilStyles from '@/utilStyles'
import { alert, android } from '@/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, AppState, BackHandler, Button, Dimensions, Linking, PixelRatio, ScrollView, Share, StyleSheet, Text, Vibration, View } from 'react-native'


const styles = StyleSheet.create({
    header: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    scroll: {
        backgroundColor: '#0f0',
        borderWidth: 2,
        borderColor: '#ff0',
        width: '100%'
    }
})

const windowDimensions = Dimensions.get('window')
const screenDimensions = Dimensions.get('screen')

export type APIScreenProps = {}

export default function APIScreen(props: APIScreenProps & Partial<NativeStackScreenProps<any>>) {

    const appState = useRef(AppState.currentState)
    const [appStateVisible, setAppStateVisible] = useState(appState.current)

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            console.log(">>>AppState change to ", nextAppState)
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                console.log('App has come to the foreground!')
            }

            appState.current = nextAppState
            setAppStateVisible(appState.current)
            console.log('AppState', appState.current)
        })

        return () => {
            subscription.remove()
        }
    }, [])

    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
    })

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => {
                setDimensions({ window, screen })
            },
        )
        return () => subscription?.remove()
    })

    const openUrl = useCallback(async (url: string) => {
        const supported = await Linking.canOpenURL(url)
        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url)
        } else {
            alert(`Don't know how to open this URL: ${url}`)
        }
    }, [])

    const share = useCallback(async (content: string) => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            })
            if (result.action === Share.sharedAction) {
                console.log("Share to ", result.activityType && 'unknown')
            } else if (result.action === Share.dismissedAction) {
                // dismissed
                console.log("Dismissed ")
            }
        } catch (error: any) {
            alert(error.message)
        }
    }, [])

    useEffect(() => {
        if (android) {
            const backAction = () => {
                Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    { text: 'YES', onPress: () => BackHandler.exitApp() },
                ])
                return true
            }

            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            )

            return () => backHandler.remove()
        }
    }, [])

    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <ScrollView style={styles.scroll} contentContainerStyle={{ alignItems: 'center', gap: 8 }}>
                <Text>Current state is: {appStateVisible}</Text>
                <View style={[utilStyles.vlayout, { backgroundColor: '#aaa7' }]}>
                    <Text style={styles.header}>Window Dimensions</Text>
                    {Object.entries(dimensions.window).map(([key, value]) => (
                        <Text key={key}>
                            {key} = {value}
                        </Text>
                    ))}
                </View>
                <View style={[utilStyles.vlayout, { backgroundColor: '#aaa7' }]}>
                    <Text style={styles.header}>Screen Dimensions</Text>
                    {Object.entries(dimensions.screen).map(([key, value]) => (
                        <Text key={key}>
                            {key} = {value}
                        </Text>
                    ))}
                </View>

                <View style={[utilStyles.vlayout, { backgroundColor: '#aaa7' }]}>
                    <Text style={styles.header}>Pixel Ratio</Text>
                    <Text>Pixel Ratio = {PixelRatio.get()}</Text>
                    <Text>Font Scale = {PixelRatio.getFontScale()}</Text>
                </View>
                <View style={[utilStyles.hlayout, { gap: 4 }]}>
                    <Text>Open</Text>
                    <Button onPress={() => {
                        openUrl('https://www.google.com')
                    }} title="Google" />
                    <Button onPress={() => {
                        openUrl('slack://open?team=123456')
                    }} title="Slack" />
                    <Button onPress={() => {
                        openUrl('unknown://nothing')
                    }} title="Unknown" />
                </View>
                <View style={[utilStyles.hlayout, { gap: 4 }]}>
                    <Text>Share</Text>
                    <Button onPress={() => {
                        share('you are so nice')
                    }} title="Text" />
                </View>
                <View style={[utilStyles.hlayout, { gap: 4 }]}>
                    <Text>Vibrate</Text>
                    <Button onPress={() => {
                        Vibration.vibrate()
                    }} title="Once" />
                </View>
                {android && <View style={[utilStyles.hlayout, { gap: 4 }]}>
                    <Text>Back</Text>
                    <Button onPress={() => {
                        BackHandler.exitApp()
                    }} title="Exit App" />
                </View>}
            </ScrollView>
        </View>
    )
}


console.log(">>>>Loaded APIScreen")