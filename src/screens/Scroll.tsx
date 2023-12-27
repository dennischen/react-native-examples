
import { appStyles } from '@/appStyles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'


const favicon = require('@assets/favicon.png')

const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64,
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#0f0',
        borderWidth: 2,
        borderColor: '#ff0',
        width: '100%'
    }
})

export type ScrollProp = {} & Partial<NativeStackScreenProps<any>>

export default function Scroll(prop: ScrollProp) {
    console.log("Scroll>>", prop)
    let i = 0
    return (
        <View style={appStyles.screen}>
            <ScrollView style={styles.scroll}>
                <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
                <Image source={favicon} />
                <Image source={logo} />
                <Image source={favicon} />
                <Image source={logo} />
                <Image source={favicon} />
                <Text style={{ fontSize: 96 }}>If you like</Text>
                <Image source={logo} />
                <Image source={favicon} />
                <Image source={logo} />
                <Image source={favicon} />
                <Image source={logo} />
                <Text style={{ fontSize: 96 }}>Scrolling down</Text>
                <Image source={favicon} />
                <Image source={logo} />
                <Image source={favicon} />
                <Image source={logo} />
                <Image source={favicon} />
                <Text style={{ fontSize: 96 }}>What's the best</Text>
                <Image source={logo} />
                <Image source={favicon} />
                <Image source={logo} />
                <Image source={favicon} />
                <Image source={logo} />
                <Text style={{ fontSize: 96 }}>Framework around?</Text>
                <Image source={favicon} />
                <Image source={logo} />
                <Image source={favicon} />
                <Image source={logo} />
                <Image source={favicon} />
                <Text style={{ fontSize: 80 }}>React Native</Text>
            </ScrollView>
        </View>
    )
}


