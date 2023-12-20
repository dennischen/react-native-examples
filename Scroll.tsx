import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { appStyles } from './utils'


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

export default function Scroll() {

    let i = 0
    return (
        <View style={appStyles.page}>
            <ScrollView style={styles.scroll}>
                <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Text style={{ fontSize: 96 }}>If you like</Text>
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Text style={{ fontSize: 96 }}>Scrolling down</Text>
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Text style={{ fontSize: 96 }}>What's the best</Text>
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Text style={{ fontSize: 96 }}>Framework around?</Text>
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Image source={logo} />
                <Text style={{ fontSize: 80 }}>React Native</Text>
            </ScrollView>
        </View>
    )
}


