import { appStyles } from '@/appStyles'
import Button from '@/components/Button'
import RerenderCounter from '@/components/RerenderCounter'
import utilStyles from '@/utilStyles'
import FontAwesome from "@expo/vector-icons/FontAwesome"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
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


export type ExpoScreenProps = {}

export default function ExpoScreen(props: ExpoScreenProps & Partial<NativeStackScreenProps<any>>) {



    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <ScrollView style={styles.scroll} contentContainerStyle={{ alignItems: 'center', gap: 8, flex: 1 }}>
                <Icons />
            </ScrollView>
        </View>
    )
}

function Icons() {
    return <View style={[utilStyles.hlayout, { gap: 4 }]}>
        <FontAwesome
            name="user"
            size={18}
        />
        <FontAwesome5
            name="folder"
            size={18}
            color="#aaa"
        />
        <MaterialIcons
            name="verified-user"
            size={18}
            color="#0a0"
        />
    </View>
}


console.log(">>>>Loaded ExpoScreen")