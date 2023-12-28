import { appStyles } from '@/appStyles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { Animated, } from 'react-native'
import type { PropsWithChildren } from 'react'
import type { ViewStyle } from 'react-native'
import RerenderCounter from '@/components/RerenderCounter'
import { web } from '@/utils'
import {
    SafeAreaView,
    ScrollView,
    ImageBackground,
    useWindowDimensions,
    PanResponder
} from 'react-native'



export type AnimationProps = {
}

export default function Animation(props: AnimationProps & Partial<NativeStackScreenProps<{}>>) {
    // console.log("Animation>>", props)

    const images = new Array(6).fill(
        'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
    )

    return (
        <View style={appStyles.screen}>
            <FadeInView
                style={{
                    backgroundColor: 'powderblue',
                }}
                duration={3000}
            >
                <RerenderCounter />
                <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>
                    Fading in
                </Text>
            </FadeInView>
            <ImageScrollView images={images} imageHeight={230} />
            <PanResponderView />
        </View>
    )
}


type FadeInViewProps = PropsWithChildren<{ style: ViewStyle, duration?: number }>

function FadeInView({ style, children, duration = 2000 }: FadeInViewProps) {
    // an Animated.Value, not the unmber 0
    const fadeValue = useRef(new Animated.Value(0)).current // Initial value for opacity: 0
    useEffect(() => {
        Animated.timing(fadeValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: !web,
        }).start()
    }, [fadeValue])

    return (
        <Animated.View // Special animatable View
            style={{
                ...style,
                opacity: fadeValue, // Bind opacity to animated value
            }}>
            {children}
        </Animated.View>
    )
};


const imageScrollStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: '#000'
    },
    scrollContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: '#777'
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',

        borderWidth: 4,
        borderColor: '#ddd'
    },
    textContainer: {
        backgroundColor: 'rgba(0,0,0, 0.7)',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: 'silver',
        marginHorizontal: 4,
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
})

type ImageScrollViewProps = { images: string[], imageHeight: number }

function ImageScrollView({ images, imageHeight }: ImageScrollViewProps) {

    const scrollX = useRef(new Animated.Value(0)).current

    let { width: windowWidth } = useWindowDimensions()

    //app(left+right), screen,(left+right) and container (left+right) padding in this example app
    windowWidth -= 16 + 16 + 16

    return (
        // SafeAreaView is ios only?
        <SafeAreaView style={imageScrollStyles.container}>
            <View style={[imageScrollStyles.scrollContainer, { height: imageHeight + 32 }]}>
                <ScrollView
                    horizontal={true}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX,
                                },
                            },
                        },
                    ], {
                        //Animated.event(useNativeDriver=true) is not supported in web and andorid, unknow in ios
                        useNativeDriver: false
                    })}
                    scrollEventThrottle={1}>
                    {images.map((image, imageIndex) => {
                        return (
                            <View style={{ width: windowWidth, height: imageHeight }} key={imageIndex}>
                                <ImageBackground source={{ uri: image }} style={imageScrollStyles.card}>
                                    <View style={imageScrollStyles.textContainer}>
                                        <Text style={imageScrollStyles.infoText}>
                                            {'Image - ' + imageIndex}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        )
                    })}
                </ScrollView>
                <View style={imageScrollStyles.indicatorContainer}>
                    {images.map((image, imageIndex) => {
                        const width = scrollX.interpolate({
                            inputRange: [
                                windowWidth * (imageIndex - 1),
                                windowWidth * imageIndex,
                                windowWidth * (imageIndex + 1),
                            ],
                            outputRange: [8, 16, 8],
                            extrapolate: 'clamp',
                        })
                        return (
                            <Animated.View
                                key={imageIndex}
                                style={[imageScrollStyles.normalDot, { width }]}
                            />
                        )
                    })}
                </View>
            </View>
        </SafeAreaView>
    )
}







const panResponderStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 4,
        borderColor: '#555'
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: 'bold',
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
})


type PanResponderViewProps = {}

function PanResponderView({ }: PanResponderViewProps) {
    const pan = useRef(new Animated.ValueXY()).current
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            //Animated.event(useNativeDriver=true) is not supported in web and andorid, unknow in ios
            onPanResponderMove:
                Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
            onPanResponderRelease: () => {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: !web,
                }).start()
            },
        }),
    ).current

    return (
        <View style={panResponderStyles.container}>
            <Text style={panResponderStyles.titleText}>Drag & Release this box!</Text>
            <Animated.View
                style={{
                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                }}
                {...panResponder.panHandlers}>
                <View style={panResponderStyles.box} />
            </Animated.View>
        </View>
    )
}

