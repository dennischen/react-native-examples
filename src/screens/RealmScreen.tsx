
import { appStyles } from '@/appStyles'
import Button from '@/components/Button'
import RerenderCounter from '@/components/RerenderCounter'
import Task from '@/models/Task'
import utilStyles from '@/utilStyles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RealmProvider, useQuery, useRealm } from '@realm/react'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const styles = StyleSheet.create({
    textbox: {
        borderColor: '#333',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 3,
        padding: 8
    }
})

export type RealmScreenProps = {}

let count = 0

export function RealmScreen(props: RealmScreenProps & Partial<NativeStackScreenProps<any>>) {

    const [value, setValue] = useState('1')

    const realm = useRealm()
    const tasks = useQuery(Task)


    return (
        <View style={[appStyles.screen, { gap: 8, alignItems: 'stretch' }]}>
            <RerenderCounter />
            <ScrollView>
                <View style={[utilStyles.vlayout, { gap: 4, alignItems: 'stretch' }]}>
                    <TextInput value={value} style={styles.textbox} onChangeText={(text) => setValue(text)}></TextInput>
                    <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap', justifyContent: 'center' }]}>
                        <Button label='Query' onPress={async () => {

                        }}></Button>
                        <Button label='Create' onPress={async () => {
                            realm.write(() => {
                                realm.create('Task', Task.generate('test ' + value))
                            })
                        }}></Button>


                    </View>
                    {tasks?.length > 0 && <View style={[utilStyles.vlayout, { gap: 4 }]}>
                        {tasks.map((task) => {
                            console.log(">>", task)
                            return <View key={task._id.toString()} style={[utilStyles.hlayout, { gap: 4 }]}>
                                <Text style={{ flexGrow: 1 }}>{task.description}</Text>
                                <Pressable onPress={() => {
                                    realm.write(() => {
                                        task.isComplete = !task.isComplete
                                    })
                                }}>
                                    <Text>{task.isComplete ? '✅' : '☑️'}</Text>
                                </Pressable>
                                <Pressable onPress={() => {
                                    realm.write(() => {
                                        realm.delete(task)
                                    })
                                }}>
                                    <Text>🗑️</Text>
                                </Pressable>
                            </View>
                        })}
                    </View>}

                </View>
            </ScrollView>
        </View>
    )
}

export default function RealmScreenWrap(props: RealmScreenProps & Partial<NativeStackScreenProps<any>>) {
    return (
        <RealmProvider schema={[Task]}><RealmScreen {...props} /></RealmProvider>
    )
}


console.log(">>>>Loaded RealmScreen")