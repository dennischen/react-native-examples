import { web } from "@/utils"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Animated, ImageStyle, Pressable, StyleSheet, Text, TextStyle, Vibration, View, ViewStyle } from "react-native"
import { colord } from "colord"

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 3,
        borderWidth: 2,
        paddingVertical: 8,
        paddingHorizontal: 8,

        gap: 8
    },
    buttonPressable: {
    },
    buttonIcon: {
    },
    buttonLabel: {
        fontSize: 16,
    },
})

type AllStyle = ViewStyle & TextStyle & ImageStyle

type ButtonTheme = {
    button?: AllStyle
    buttonPressable?: AllStyle
    buttonIcon?: AllStyle
    buttonLabel?: AllStyle
}


const darkTheme: ButtonTheme = StyleSheet.create({
    buttonPressable: {
    },
    buttonIcon: {
        color: 'white'
    },
    buttonLabel: {
        color: 'white'
    },
})
const lightTheme: ButtonTheme = StyleSheet.create({
    buttonPressable: {
    },
    buttonIcon: {
        color: 'black'
    },
    buttonLabel: {
        color: 'black'
    },
})

const greenTheme: ButtonTheme = {
    ...darkTheme, ...StyleSheet.create({
        button: {
            backgroundColor: '#04AA6D',
            borderColor: '#04AA6D'
        }
    })
}


const blueTheme: ButtonTheme = {
    ...darkTheme, ...StyleSheet.create({
        button: {
            backgroundColor: '#008CBA',
            borderColor: '#008CBA'
        },
        buttonPressable: {

        }
    })
}

const redTheme: ButtonTheme = {
    ...darkTheme, ...StyleSheet.create({
        button: {
            backgroundColor: '#f44336',
            borderColor: '#f44336'
        }
    })
}

const geryTheme: ButtonTheme = {
    ...lightTheme, ...StyleSheet.create({
        button: {
            backgroundColor: '#e7e7e7',
            borderColor: '#e7e7e7'
        }
    })
}

const blackTheme: ButtonTheme = {
    ...darkTheme, ...StyleSheet.create({
        button: {
            backgroundColor: '#555555',
            borderColor: '#555555'
        }
    })
}

export type ButtonProps = {
    label?: string,
    icon?: string,
    iconPosition?: 'right' | 'left' | 'top' | 'bottom'
    theme?: 'green' | 'blue' | 'red' | 'gery' | 'black'
    vibration?: boolean
    disabled?: boolean
    style?: ViewStyle
    textStyle?: TextStyle
    onPress?: () => void
    onLongPress?: () => void
}


export default function Button({ label, icon, iconPosition = 'left', disabled, onPress, onLongPress, vibration, style, textStyle, theme = 'black' }: ButtonProps) {

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


    const pressedAnim = useRef(new Animated.Value(1)).current

    const onPressIn = useCallback(() => {
        Animated.spring(pressedAnim, {
            toValue: 0.95,
            speed: 1000,
            bounciness: 100,
            useNativeDriver: !web
        }).start()
    }, [])
    const onPressOut = useCallback(() => {
        Animated.spring(pressedAnim, {
            toValue: 1,
            speed: 20,
            useNativeDriver: !web
        }).start()
    }, [])

    useEffect(() => {
        return () => {
            if (pressedAnim) {
                pressedAnim.stopAnimation()
            }
        }
    }, [])

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
        <Pressable
            disabled={disabled}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[styles.buttonPressable, buttonTheme.buttonPressable]}
            onPress={onPress ? () => {
                vibration && Vibration.vibrate(10)
                onPress()
            } : undefined}
            onLongPress={onLongPress ? () => {
                vibration && Vibration.vibrate(50)
                onLongPress()
            } : undefined}
        >
            <Animated.View style={[styles.button, buttonTheme.button, style, { flexDirection }, disabled && {
                opacity: 0.6,
            }, {
                transform: [{ scale: pressedAnim }]
            }]}>
                {icon && <FontAwesome
                    name={icon as any}
                    size={18}
                    style={[styles.buttonIcon, buttonTheme.buttonIcon, textStyle]}
                />}
                {label &&
                    <Text style={[styles.buttonLabel, buttonTheme.buttonLabel, textStyle]}>
                        {label}
                    </Text>}
            </Animated.View>
        </Pressable>
    )
}