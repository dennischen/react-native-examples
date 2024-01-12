import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import utilStyles from '@/utilStyles'
import FontAwesome from "@expo/vector-icons/FontAwesome"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { AntDesign } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, StyleSheet, View } from 'react-native'

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


export type IconsScreenProps = {}

const color1 = '#777'
const color2 = '#c00'
const color3 = '#0c0'
const color4 = '#00c'

export default function IconsScreen(props: IconsScreenProps & Partial<NativeStackScreenProps<any>>) {



    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <ScrollView style={[styles.scroll, { backgroundColor: "#fff" }]} contentContainerStyle={{ alignItems: 'center', padding: 8, gap: 8, flex: 1 }}>
                <View style={[utilStyles.hlayout, { gap: 8 }]}>
                    <AntDesign
                        name="stepforward"
                        size={24}
                    />
                    <AntDesign
                        name="stepforward"
                        size={24}
                        color={color1}
                    />
                    <AntDesign
                        name="stepforward"
                        size={24}
                        color={color2}
                    />
                    <AntDesign
                        name="stepforward"
                        size={24}
                        color={color3}
                    />
                    <AntDesign
                        name="stepforward"
                        size={24}
                        color={color4}
                    />
                </View>
                <View style={[utilStyles.hlayout, { gap: 8 }]}>
                    <FontAwesome
                        name="user"
                        size={24}
                    />
                    <FontAwesome
                        name="user"
                        size={24}
                        color={color1}
                    />
                    <FontAwesome
                        name="user"
                        size={24}
                        color={color2}
                    />
                    <FontAwesome
                        name="user"
                        size={24}
                        color={color3}
                    />
                    <FontAwesome
                        name="user"
                        size={24}
                        color={color4}
                    />
                </View>
                <View style={[utilStyles.hlayout, { gap: 8 }]}>
                    <FontAwesome5
                        name="folder"
                        size={24}
                    />
                    <FontAwesome5
                        name="folder"
                        size={24}
                        color={color1}
                    />
                    <FontAwesome5
                        name="folder"
                        size={24}
                        color={color2}
                    />
                    <FontAwesome5
                        name="folder"
                        size={24}
                        color={color3}
                    />
                    <FontAwesome5
                        name="folder"
                        size={24}
                        color={color4}
                    />
                </View>
                <View style={[utilStyles.hlayout, { gap: 8 }]}>
                    <MaterialIcons
                        name="verified-user"
                        size={24}
                    />
                    <MaterialIcons
                        name="verified-user"
                        size={24}
                        color={color1}
                    />
                    <MaterialIcons
                        name="verified-user"
                        size={24}
                        color={color2}
                    />
                    <MaterialIcons
                        name="verified-user"
                        size={24}
                        color={color3}
                    />
                    <MaterialIcons
                        name="verified-user"
                        size={24}
                        color={color4}
                    />
                </View>
            </ScrollView>
        </View >
    )
}


console.log(">>>>Loaded IconsScreen")