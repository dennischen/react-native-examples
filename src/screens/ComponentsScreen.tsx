import { appStyles } from '@/appStyles'
import Button from '@/components/Button'
import RerenderCounter from '@/components/RerenderCounter'
import utilStyles from '@/utilStyles'
import { web } from '@/utils'
import FontAwesome from "@expo/vector-icons/FontAwesome"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { launchImageLibraryAsync } from 'expo-image-picker'
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

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


export type ComponentsScreenProps = {}

export default function ComponentsScreen(props: ComponentsScreenProps & Partial<NativeStackScreenProps<any>>) {
    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <ScrollView style={styles.scroll} contentContainerStyle={{ alignItems: 'center', gap: 8 }}>
                <Buttons />
            </ScrollView>
        </View>
    )
}


function alert(msg: string, title: string = '') {
    if(web && typeof window === 'object'){
        (window as any).alert(msg)
    }else{
        Alert.alert(title, msg)
    }
}

function Buttons() {

    const onPress = () => {
        alert("onPress")
    }
    const onLongPress = () => {
        alert("onLongPress")
    }

    return <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap', padding: 8 }]}>
        <Button label='Pick a picture' icon='picture-o' onPress={onPress} onLongPress={onLongPress} vibration={true}></Button>
        <Button label='Pick a picture' theme='gery'></Button>
        <Button icon='picture-o' theme='red'></Button>
        <Button label='Pick a picture' icon='picture-o' iconPosition='right' theme='green'></Button>
        <Button label='Pick a picture' icon='picture-o' iconPosition='top' theme='blue'></Button>
        <Button label='Pick a picture' icon='picture-o' iconPosition='bottom' theme='blue'></Button>

    </View>
}


console.log(">>>>Loaded APIScreen")