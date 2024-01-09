import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import utilStyles from '@/utilStyles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useCallback } from 'react'
import { Button, Permission, PermissionsAndroid, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'


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


export type AndroidPermissionScreenProps = {}

export default function AndroidPermissionScreen(props: AndroidPermissionScreenProps & Partial<NativeStackScreenProps<any>>) {


    const grantPermission = useCallback(async (permission: Permission) => {
        try {
            console.log('>>>>>Try to grant', permission)

            //by my test in my phone (android. 12)
            //1.1 if not configued yet, it shows ratinale to user if provided
            //1.2 then, system permission request shows to let user check permission, the result will be keeped
            //2 if denied, or denied before, the await never pass.
            //3 if allowed before, it shows ratinale to user if provided, then pass the await to next code
            //
            const granted = await PermissionsAndroid.request(
                permission
                // ,{
                //     title: 'Cool Photo App Camera Permission',
                //     message:
                //         'Cool Photo App needs access to your camera ' +
                //         'so you can take awesome pictures.',
                //     buttonNeutral: 'Ask Me Later',
                //     buttonNegative: 'Cancel',
                //     buttonPositive: 'Request',
                // },
            )
            //in my test, the await never pass if user deny the request
            //(and will keep the result until user remove it in app permission management)
            ToastAndroid.show(`${permission} : ${granted}`, ToastAndroid.SHORT)
        } catch (err) {
            console.warn('2>>>>>', err)
        }
    }, [])

    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <ScrollView style={styles.scroll} contentContainerStyle={{ alignItems: 'center', gap: 8 }}>
                <View style={[utilStyles.hlayout, { gap: 4 }]}>
                    <Text>Permission</Text>
                    <Button onPress={() => { grantPermission(PermissionsAndroid.PERMISSIONS.CAMERA) }} title="Camera" />
                    <Button onPress={() => { grantPermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE) }} title="STORAGE" />
                </View>
            </ScrollView>
        </View>
    )
}


console.log(">>>>Loaded APIScreen")