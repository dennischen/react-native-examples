import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import { iOS } from '@/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import type { StatusBarStyle } from 'react-native'
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native'

const STYLES = ['default', 'dark-content', 'light-content'] as const
const TRANSITIONS = ['fade', 'slide', 'none'] as const

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ECF0F1',
    },
    buttonsContainer: {
        padding: 10,
        gap: 8
    },
    textStyle: {
        textAlign: 'center',
        marginBottom: 8,
    },
})

export type StatusBarScreenProps = {}

export default function StatusBarScreen(props: StatusBarScreenProps & Partial<NativeStackScreenProps<any>>) {
    const [hidden, setHidden] = useState(false)
    const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
        STYLES[0],
    )
    const [statusBarTransition, setStatusBarTransition] = useState<
        'fade' | 'slide' | 'none'
    >(TRANSITIONS[0])

    const changeStatusBarVisibility = () => setHidden(!hidden)

    const changeStatusBarStyle = () => {
        const styleId = STYLES.indexOf(statusBarStyle) + 1
        if (styleId === STYLES.length) {
            setStatusBarStyle(STYLES[0])
        } else {
            setStatusBarStyle(STYLES[styleId])
        }
    }

    const changeStatusBarTransition = () => {
        const transition = TRANSITIONS.indexOf(statusBarTransition) + 1
        if (transition === TRANSITIONS.length) {
            setStatusBarTransition(TRANSITIONS[0])
        } else {
            setStatusBarTransition(TRANSITIONS[transition])
        }
    }

    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle={statusBarStyle}
                showHideTransition={statusBarTransition}
                hidden={hidden}
            />
            <Text style={styles.textStyle}>
                StatusBar Visibility:{'\n'}
                {hidden ? 'Hidden' : 'Visible'}
            </Text>
            <Text style={styles.textStyle}>
                StatusBar Style:{'\n'}
                {statusBarStyle}
            </Text>
            {iOS && (
                <Text style={styles.textStyle}>
                    StatusBar Transition:{'\n'}
                    {statusBarTransition}
                </Text>
            )}
            <View style={styles.buttonsContainer}>
                <Button title="Toggle StatusBar" onPress={changeStatusBarVisibility} />
                <Button title="Change StatusBar Style" onPress={changeStatusBarStyle} />
                {iOS && (
                    <Button
                        title="Change StatusBar Transition"
                        onPress={changeStatusBarTransition}
                    />
                )}
            </View>
        </View>
    )
}


console.log(">>>>Loaded StatusBarScreen")