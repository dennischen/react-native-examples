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
import { Image, ScrollView, StyleSheet, View } from 'react-native'

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

    const [pictureUri, setPictureUri] = useState<string | undefined>(undefined)

    const pickImageAsync = useCallback(async () => {
        let result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            //Log entire result will get below warning
            //Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48
            console.log("Result", result.assets)
            setPictureUri(result.assets[0].uri)
        } else {
            alert('You did not select any image.')
        }
    }, [])

    return <View style={[utilStyles.vlayout, { gap: 4, flexWrap: 'wrap' }]}>
        <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap' }]}>
            <Button label='Pick a picture' icon='picture-o' onPress={pickImageAsync}></Button>
            <Button label='Clear' onPress={() => setPictureUri(undefined)}></Button>
        </View>
        {pictureUri && <Image source={{ uri: pictureUri }} style={{ width: 100, height: 100 }}></Image>}
    </View>
}


console.log(">>>>Loaded APIScreen")