
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
import { getInfo, readAsStringAsync, requestExternalDirectoryPermission, writeAsStringAsync } from '@/android'


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
                            await FileSystem.writeAsStringAsync(file3Uri, value3)
                            alert(`Wrote ${value3} to file ${file3Uri}`)
                        }}></Button>
                        <Button label='Load from file' onPress={async () => {
                            const fileInfo = await FileSystem.getInfoAsync(file3Uri)
                            if (fileInfo.exists && !fileInfo.isDirectory) {
                                setValue3(await FileSystem.readAsStringAsync(file3Uri))
                            } else {
                                alert(`No such file ${JSON.stringify(fileInfo)}`)
                            }
                        }}></Button>
                    </View>
                </View>}
                {android && <View style={[utilStyles.vlayout, { gap: 4, alignItems: 'stretch' }]}>
                    <Text>externalDir : {externalDir}</Text>
                    <TextInput value={value4} style={styles.textbox} onChangeText={(text) => setValue4(text)}></TextInput>
                    <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap', justifyContent: 'center' }]}>
                        <Button label='Save to external' onPress={async () => {

                            const permission = await requestExternalDirectoryPermission(externalDir)
                            if (permission.granted) {
                                await AsyncStorage.setItem("externalDir", permission.directory)
                                setExternalDir(permission.directory)

                                await writeAsStringAsync(permission.directory, "value4.txt", value4)

                                alert(`Wrote ${value4} to external ${permission.directory}/ file`)

                            } else {
                                alert(`No directory access permission`)
                            }
                        }}></Button>
                        <Button label='Load from external' onPress={async () => {
                            const permission = await requestExternalDirectoryPermission(externalDir)
                            if (permission.granted) {
                                await AsyncStorage.setItem("externalDir", permission.directory)
                                setExternalDir(permission.directory)

                                const info = await getInfo(permission.directory, "value4.txt")

                                if(info.exists){
                                    setValue4(await readAsStringAsync(permission.directory, "value4.txt"))
                                }else{
                                    alert(`No file at ${info.directory}/${info.file}`)
                                }

                            } else {
                                alert(`No directory access permission`)
                            }

                        }}></Button>
                    </View>
                </View>}
            </ScrollView>
        </View>
    )
}


console.log(">>>>Loaded StorageScreen")