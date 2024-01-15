
import { appStyles } from '@/appStyles'
import Button from '@/components/Button'
import RerenderCounter from '@/components/RerenderCounter'
import utilStyles from '@/utilStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import * as FileSystem from 'expo-file-system'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { alert, android, web } from '@/utils'


const styles = StyleSheet.create({
    textbox: {
        borderColor: '#333',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 3,
        padding: 8
    }
})

const { StorageAccessFramework } = FileSystem



const file3Uri = FileSystem.documentDirectory + "value3.txt"

export type StorageScreenProps = {}

export default function StorageScreen(props: StorageScreenProps & Partial<NativeStackScreenProps<any>>) {

    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [value3, setValue3] = useState('')
    const [value4, setValue4] = useState('')

    const [externalDir, setExternalDir] = useState('')

    useEffect(() => {
        (async () => {
            const externalDir = await AsyncStorage.getItem("externalDir")
            if (externalDir) {
                setExternalDir(externalDir)
            }
        }
        )()
    }, [])



    return (
        <View style={[appStyles.screen, { gap: 8, alignItems: 'stretch' }]}>
            <RerenderCounter />
            <ScrollView>
                <View style={[utilStyles.vlayout, { gap: 4, alignItems: 'stretch' }]}>
                    <TextInput value={value1} style={styles.textbox} onChangeText={(text) => setValue1(text)}></TextInput>
                    <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap', justifyContent: 'center' }]}>
                        <Button label='Save to store' onPress={() => {
                            AsyncStorage.setItem("value1", value1)
                        }}></Button>
                        <Button label='Load from store' onPress={async () => {
                            setValue1(await AsyncStorage.getItem("value1") ?? '')
                        }}></Button>
                        <Button label='clear' onPress={async () => {
                            AsyncStorage.clear()
                            setValue1('')
                            setExternalDir('')
                        }}></Button>
                    </View>
                </View>
                {!web && <View style={[utilStyles.vlayout, { gap: 4, alignItems: 'stretch' }]}>
                    <TextInput value={value2} style={styles.textbox} onChangeText={(text) => setValue2(text)}></TextInput>
                    <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap', justifyContent: 'center' }]}>
                        <Button label='Save to secure' onPress={() => {
                            SecureStore.setItemAsync("value2", value2)
                        }}></Button>
                        <Button label='Load from secure' onPress={async () => {
                            setValue2(await SecureStore.getItemAsync("value2") ?? '')
                        }}></Button>
                    </View>
                </View>}
                {!web && <View style={[utilStyles.vlayout, { gap: 4, alignItems: 'stretch' }]}>
                    <Text>documentDirectory : {FileSystem.documentDirectory}</Text>
                    <TextInput value={value3} style={styles.textbox} onChangeText={(text) => setValue3(text)}></TextInput>
                    <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap', justifyContent: 'center' }]}>
                        <Button label='Save to file' onPress={async () => {
                            const fileInfo = await FileSystem.getInfoAsync(file3Uri)
                            console.log(">>>>>>>", fileInfo)
                            await FileSystem.writeAsStringAsync(file3Uri, value3)
                            alert(`Wrote ${value3} to file ${file3Uri}`)
                        }}></Button>
                        <Button label='Load from file' onPress={async () => {
                            const fileInfo = await FileSystem.getInfoAsync(file3Uri)
                            console.log(">>>>>>>", fileInfo)
                            if (fileInfo.exists && !fileInfo.isDirectory) {
                                setValue3(await FileSystem.readAsStringAsync(file3Uri))
                            } else {
                                alert(`No such file ${JSON.stringify(fileInfo)}`)
                            }
                        }}></Button>
                    </View>
                </View>}
                {android && <View style={[utilStyles.vlayout, { gap: 4, alignItems: 'stretch' }]}>
                    <Text>externalDir : {externalDir}, {StorageAccessFramework.getUriForDirectoryInRoot(externalDir)}</Text>
                    <TextInput value={value4} style={styles.textbox} onChangeText={(text) => setValue4(text)}></TextInput>
                    <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap', justifyContent: 'center' }]}>
                        <Button label='Save to external' onPress={async () => {


                            const requestPermission = async () => {
                                const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync(StorageAccessFramework.getUriForDirectoryInRoot('my-expo-test'))
                                let externalDir = ''
                                if (permissions.granted) {
                                    const dirUri = permissions.directoryUri
                                    //from the "primary:", where : is %3A
                                    const idx = dirUri.lastIndexOf('%3A')
                                    if (idx) {
                                        externalDir = permissions.directoryUri.substring(idx + 3)
                                        await AsyncStorage.setItem("externalDir", externalDir)
                                        setExternalDir(externalDir)
                                        console.log(`set directory to ${externalDir}`)
                                    }
                                }
                                return {
                                    granted: permissions.granted,
                                    externalDir
                                }
                            }

                            let externalDirUri
                            let permission: { granted: boolean, externalDir: string } | undefined = undefined
                            if (externalDir) {
                                externalDirUri = StorageAccessFramework.getUriForDirectoryInRoot(externalDir)
                                let info
                                try {
                                    //check permission again by access it with FileSystem
                                    info = await FileSystem.getInfoAsync(externalDirUri)
                                } catch (err) { }

                                //the isDirectory is always false by my test
                                console.log(`Dir Info ${JSON.stringify(info)}`)
                                if (!info || !info.exists) {
                                    //request again
                                    if (!(permission = await requestPermission()).granted) {
                                        alert(`No directory access permission`)
                                        return
                                    }
                                }
                            } else {
                                if (!(permission = await requestPermission()).granted) {
                                    alert(`No directory access permission`)
                                    return
                                }
                                externalDirUri = StorageAccessFramework.getUriForDirectoryInRoot(permission.externalDir)
                            }


                            const fileName = "value4y.txt"

                            try {
                                const fileUri = externalDirUri + encodeURIComponent(`/${fileName}`)
                                //will throw exception if file not found
                                let info = await FileSystem.getInfoAsync(fileUri)
                                //the existed and directory is not trustable
                                await FileSystem.writeAsStringAsync(fileUri, value4)
                                alert(`Wrote ${value4} to external ${fileUri}`)

                            } catch (err) {
                                //create then save for the not found case
                                //create a existed file will cause StorageAccessFramework append filename (index).ext to file
                                const fileUri = await StorageAccessFramework.createFileAsync(externalDirUri, fileName, "text/plain")
                                await FileSystem.writeAsStringAsync(fileUri, value4)
                                alert(`Create & Wrote ${value4} to external ${fileUri}`)
                            }
                        }}></Button>
                        <Button label='Load from external' onPress={async () => {


                        }}></Button>
                    </View>
                </View>}
            </ScrollView>
        </View>
    )
}


console.log(">>>>Loaded StorageScreen")