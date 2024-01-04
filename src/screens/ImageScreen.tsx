
import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#0f0',
        borderWidth: 2,
        borderColor: '#ff0',
        width: '100%'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
    stretch: {
        width: 100,
        height: 200,
        resizeMode: 'stretch',
    },
    cover: {
        width: 100,
        height: 200,
        resizeMode: 'cover',
    },
    contain: {
        width: 100,
        height: 200,
        resizeMode: 'contain',
    },
    repeat: {
        width: 100,
        height: 200,
        resizeMode: 'repeat',
    },
    center: {
        width: 100,
        height: 200,
        resizeMode: 'center',
    },
})

const srcRequire = require('@assets/favicon.png')
const srcUri = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
}
const srcUriData = {
    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
}

export type ImageScreenProps = {}

export default function ImageScreen(props: ImageScreenProps & Partial<NativeStackScreenProps<any>>) {
    // console.log("Scroll>>", props)
    let i = 0
    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <ScrollView style={styles.scroll}>
                <Image
                    style={styles.tinyLogo}
                    source={srcRequire}
                />
                <Image
                    style={styles.tinyLogo}
                    source={srcUri}
                />
                <Image
                    style={styles.logo}
                    source={srcUriData}
                />
                <Image
                    style={styles.stretch}
                    source={srcUri}
                />
                <Image
                    style={styles.cover}
                    source={srcUri}
                />
                <Image
                    style={styles.contain}
                    source={srcUri}
                />
                <Image
                    style={styles.center}
                    source={srcUri}
                />
                <Image
                    style={styles.repeat}
                    source={srcUri}
                />
            </ScrollView>
        </View>
    )
}


