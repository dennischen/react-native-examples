import { appStyles } from '@/appStyles'
import Button from '@/components/Button'
import RerenderCounter from '@/components/RerenderCounter'
import utilStyles from '@/utilStyles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { launchImageLibraryAsync } from 'expo-image-picker'
import { useCallback, useState } from 'react'
import { Image, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const styles = StyleSheet.create({
    header: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    scroll: {
        backgroundColor: '#0f0',
        borderWidth: 4,
        borderColor: '#555',
        width: '100%'
    }
})


export type GestureScreenProps = {}

export default function GestureScreen(props: GestureScreenProps & Partial<NativeStackScreenProps<any>>) {
    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <ScrollView style={styles.scroll} contentContainerStyle={{ alignItems: 'center', gap: 8, flex: 1 }}>
                <ImagePicker />
            </ScrollView>
        </View>
    )
}

function ImagePicker() {

    const windowDim = useWindowDimensions()

    const [picture, setPicture] = useState<{ uri: string, width: number, height: number } | undefined>(undefined)

    const pickImageAsync = useCallback(async () => {
        let result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            //Log entire result will get below warning
            //Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48
            // console.log("Result", result.assets)

            const uri = result.assets[0].uri

            Image.getSize(uri, (width, height) => {
                const w2 = windowDim.width / 2
                const h2 = windowDim.height / 2
                const wscale = (width > w2) ? w2 / width : 1
                const hscale = (height > h2) ? h2 / height : 1
                const scale = Math.min(wscale, hscale)
                setPicture({ uri, width: width * scale, height: height * scale })
            })
        } else {
            alert('You did not select any image.')
        }
    }, [windowDim])

    return <View style={[utilStyles.vlayout, { alignItems: 'stretch', gap: 4, width: '100%', borderWidth: 4, borderColor: '#00f', minHeight: 400 }]}>
        <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap', justifyContent: 'center', borderWidth: 2, borderColor: '#f00' }]}>
            <Button label='Pick a picture' icon='picture-o' onPress={pickImageAsync}></Button>
            <Button label='Clear' onPress={() => setPicture(undefined)}></Button>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {picture && <AniImage
                uri={picture.uri}
                width={picture.width}
                height={picture.height} />}
        </View>

    </View>
}

function AniImage({ uri, width, height }: { uri: string, width: number, height: number }) {

    const savedScale = useSharedValue(1)
    const scale = useSharedValue(1)

    const savedRotation = useSharedValue(0)
    const rotation = useSharedValue(0)

    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            savedScale.value = 1
            scale.value = 1
            savedRotation.value = 0
            rotation.value = 0
            translateX.value = 0
            translateY.value = 0
        })
    const pinch = Gesture.Pinch()
        .onChange((event) => {
            scale.value = savedScale.value + (event.scale - 1)
        }).onEnd(() => {
            savedScale.value = scale.value
        })
    const drag = Gesture.Pan()
        .onChange((event) => {
            translateX.value += event.changeX
            translateY.value += event.changeY
        })
    const roate = Gesture.Rotation()
        .onChange((event) => {
            rotation.value = savedRotation.value + event.rotation
        })
        .onEnd(() => {
            savedRotation.value = rotation.value
        })


    const imageStyle = useAnimatedStyle(() => {
        return {
            width: width * (scale.value),
            height: height * (scale.value),
        }
    })

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value, },
                { translateY: translateY.value, },
                { rotateZ: `${(rotation.value / Math.PI) * 180}deg` }
            ],
        }
    })

    const composed = Gesture.Simultaneous(doubleTap, drag, pinch, roate)

    return <GestureDetector gesture={composed}>
        <Animated.View
            style={[containerStyle]}>
            <Animated.Image
                source={{ uri: uri }}
                style={[imageStyle, { width: width, height: height }]}
                resizeMode="contain" />
        </Animated.View>
    </GestureDetector>
}


console.log(">>>>Loaded GestureScreen")