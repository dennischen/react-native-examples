import { appStyles } from '@/appStyles'
import Button from '@/components/Button'
import RerenderCounter from '@/components/RerenderCounter'
import utilStyles from '@/utilStyles'
import FontAwesome from "@expo/vector-icons/FontAwesome"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { launchImageLibraryAsync } from 'expo-image-picker'
import { ScrollView, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
    header: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    scroll: {
        backgroundColor: '#0f0',
        borderWidth: 2,
        borderColor: '#ff0',
        width: '100%'
    }
})


export type ExpoScreenProps = {}

export default function ExpoScreen(props: ExpoScreenProps & Partial<NativeStackScreenProps<any>>) {



    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <ScrollView style={styles.scroll} contentContainerStyle={{ alignItems: 'center', gap: 8 }}>
                <Icons />
                <ImagePicker />
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

function ImagePicker() {
    const pickImageAsync = async () => {
        let result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            //Log entire result will get below warning
            //Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48
            console.log("Result", result.assets)
        } else {
            alert('You did not select any image.')
        }
    }

    return <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap' }]}>
        <Button label='Pick a picture' icon='picture-o' onPress={pickImageAsync}></Button>

    </View>
}


console.log(">>>>Loaded APIScreen")