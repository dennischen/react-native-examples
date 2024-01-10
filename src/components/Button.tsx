import { android, web } from "@/utils"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Animated, ImageStyle, Pressable, StyleSheet, Text, TextStyle, Vibration, View, ViewStyle } from "react-native"

const styles = StyleSheet.create({
    button: {
        borderRadius: 3,
        borderWidth: 2,
    },
    buttonPressable: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    buttonIcon: {
    },
    buttonLabel: {
        fontSize: 16,
    },
})

type AllStyle = ViewStyle | TextStyle | ImageStyle

type ButtonTheme = {
    light?: boolean
    button?: AllStyle
    buttonPressable?: AllStyle
    buttonIcon?: AllStyle
    buttonLabel?: AllStyle
}

const greenTheme: ButtonTheme = StyleSheet.create({
    button: {
        backgroundColor: '#04AA6D',
        borderColor: '#04AA6D'
    },
    buttonPressable: {

    },
    buttonIcon: {
        color: 'white'
    },
    buttonLabel: {
        color: 'white'
    },
})


const blueTheme: ButtonTheme = StyleSheet.create({
    button: {
        backgroundColor: '#008CBA',
        borderColor: '#008CBA'
    },
    buttonPressable: {

    },
    buttonIcon: {
        color: 'white'
    },
    buttonLabel: {
        color: 'white'
    },
})

const redTheme: ButtonTheme = StyleSheet.create({
    button: {
        backgroundColor: '#f44336',
        borderColor: '#f44336'
    },
    buttonPressable: {

    },
    buttonIcon: {
        color: 'white'
    },
    buttonLabel: {
        color: 'white'
    },
})

const geryTheme: ButtonTheme = {
    ...{
        light: true,
    }, ...StyleSheet.create({
        button: {
            backgroundColor: '#e7e7e7',
            borderColor: '#e7e7e7'
        },
        buttonPressable: {

        },
        buttonIcon: {
            color: 'black'
        },
        buttonLabel: {
            color: 'black'
        },
    })
}

const blackTheme: ButtonTheme = StyleSheet.create({
    button: {
        backgroundColor: '#555555',
        borderColor: '#555555'
    },
    buttonPressable: {

    },
    buttonIcon: {
        color: 'white'
    },
    buttonLabel: {
        color: 'white'
    },
})

export type ButtonProps = {
    label?: string,
    icon?: string,
    iconPosition?: 'right' | 'left' | 'top' | 'bottom'
    theme?: 'green' | 'blue' | 'red' | 'gery' | 'black'
    vibration?: boolean
    onPress?: () => void
    onLongPress?: () => void
}


export default function Button({ label, icon, iconPosition = 'left', onPress, onLongPress, vibration, theme = 'black' }: ButtonProps) {

    const buttonTheme = useMemo(() => {
        switch (theme) {
            case "green":
                return greenTheme
            case "blue":
                return blueTheme
            case "red":
                return redTheme
            case "gery":
                return geryTheme
            case "black":
            default:
                return blackTheme
        }
    }, [theme])


    const highlightAnim: Animated.Value = android ? undefined : useRef(new Animated.Value(1)).current as any

    const onPressIn = useCallback(() => {
        Animated.timing(highlightAnim, {
            toValue: 0.8,
            duration: 1,
            useNativeDriver: !web
        }).start()
    }, [])
    const onPressOut = useCallback(() => {
        highlightAnim.stopAnimation()
        highlightAnim.setValue(1)
    }, [])

    // useEffect(() => {
    //     Animated.timing(highlightAnim, {
    //         toValue: 1,
    //         duration: 10000,
    //         useNativeDriver: !web
    //     }).start()
    // }, [highlightAnim])

    const flexDirection = useMemo(() => {
        switch (iconPosition) {
            case "right":
                return 'row-reverse'
            case "top":
                return 'column'
            case "bottom":
                return 'column-reverse'
            case "left":
            default:
                return 'row'
        }
    }, [iconPosition])

    return (
        <Animated.View style={[styles.button, buttonTheme.button, {
            opacity: highlightAnim,
        }]}>
            <Pressable
                android_ripple={android ? {
                    color: buttonTheme.light ? '#0002' : '#0005'
                } : undefined}
                onPressIn={android ? undefined : onPressIn}
                onPressOut={android ? undefined : onPressOut}
                style={[styles.buttonPressable, buttonTheme.buttonPressable, { flexDirection }]}
                onPress={onPress ? () => {
                    vibration && Vibration.vibrate(10)
                    onPress()
                } : undefined}
                onLongPress={onLongPress ? () => {
                    vibration && Vibration.vibrate(50)
                    onLongPress()
                } : undefined}
            >
                {icon && <FontAwesome
                    name={icon as any}
                    size={18}
                    style={[styles.buttonIcon, buttonTheme.buttonIcon]}
                />}
                {label &&
                    <Text style={[styles.buttonLabel, buttonTheme.buttonLabel]}>
                        {label}
                    </Text>}
            </Pressable>

        </Animated.View>
    )
}