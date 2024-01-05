
import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#0f0',
        borderWidth: 2,
        borderColor: '#ff0',
        width: '100%'
    },
    imageBackground: {
        width: 100,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fffe',
        fontSize: 16,
        backgroundColor: '#0007',
        width: '100%',
        textAlign: 'center'
    }
})

const srcRequire = require('@assets/favicon.png')
const srcUri = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
}
const srcUriData = {
    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
}

export type ImageBackgroundScreenProps = {}

export default function ImageBackgroundScreen(props: ImageBackgroundScreenProps & Partial<NativeStackScreenProps<any>>) {
    // console.log("Scroll>>", props)
    let i = 0
    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <ScrollView style={styles.scroll}>
            <ImageBackground
                    style={styles.imageBackground}
                    source={srcUri}
                >
                    <Text style={styles.text}>default=cover</Text>
                </ImageBackground>
                <ImageBackground
                    style={styles.imageBackground}
                    source={srcUri}
                    resizeMode='cover'
                >
                    <Text style={styles.text}>cover</Text>
                </ImageBackground>
                <ImageBackground
                    style={styles.imageBackground}
                    source={srcUri}
                    resizeMode='stretch'
                >
                    <Text style={styles.text}>stretch</Text>
                </ImageBackground>
                <ImageBackground
                    style={styles.imageBackground}
                    source={srcUri}
                    resizeMode='contain'
                >
                    <Text style={styles.text}>contain</Text>
                </ImageBackground>
                <ImageBackground
                    style={styles.imageBackground}
                    source={srcUri}
                    resizeMode='center'
                >
                    <Text style={styles.text}>center</Text>
                </ImageBackground>
                <ImageBackground
                    style={styles.imageBackground}
                    source={srcUri}
                    resizeMode='repeat'
                >
                    <Text style={styles.text}>repeat</Text>
                </ImageBackground>
            </ScrollView>
        </View>
    )
}


console.log(">>>>Loaded ImageBackgroundScreen")