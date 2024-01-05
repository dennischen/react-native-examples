import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useCallback, useState } from 'react'
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


const styles = StyleSheet.create({
    list: {
        borderColor: '#070',
        borderWidth: 4,
        width: '100%',
        flex: 1
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',


        backgroundColor: '#aa0',

        borderColor: '#0e0',
        borderWidth: 2,
        borderStyle: 'dashed',
        padding: 4,
        height: 64,
    },
    itemSelected: {
        backgroundColor: '#00e'
    },
    text: {
        fontSize: 20,
    },
    textSelected: {
        color: '#eee'
    }
})

let nextId = 0

const data = [
    { id: `_${++nextId}`, name: 'Devin' },
    { id: `_${++nextId}`, name: 'Dan' },
    { id: `_${++nextId}`, name: 'Dominic' },
    { id: `_${++nextId}`, name: 'Jackson' },
    { id: `_${++nextId}`, name: 'James' },
    { id: `_${++nextId}`, name: 'Joel' },
    { id: `_${++nextId}`, name: 'John' },
    { id: `_${++nextId}`, name: 'Jillian' },
    { id: `_${++nextId}`, name: 'Jimmy' },
    { id: `_${++nextId}`, name: 'Julie' },

    { id: `_${++nextId}`, name: 'Devin' },
    { id: `_${++nextId}`, name: 'Dan' },
    { id: `_${++nextId}`, name: 'Dominic' },
    { id: `_${++nextId}`, name: 'Jackson' },
    { id: `_${++nextId}`, name: 'James' },
    { id: `_${++nextId}`, name: 'Joel' },
    { id: `_${++nextId}`, name: 'John' },
    { id: `_${++nextId}`, name: 'Jillian' },
    { id: `_${++nextId}`, name: 'Jimmy' },
    { id: `_${++nextId}`, name: 'Julie' },

    { id: `_${++nextId}`, name: 'Devin' },
    { id: `_${++nextId}`, name: 'Dan' },
    { id: `_${++nextId}`, name: 'Dominic' },
    { id: `_${++nextId}`, name: 'Jackson' },
    { id: `_${++nextId}`, name: 'James' },
    { id: `_${++nextId}`, name: 'Joel' },
    { id: `_${++nextId}`, name: 'John' },
    { id: `_${++nextId}`, name: 'Jillian' },
    { id: `_${++nextId}`, name: 'Jimmy' },
    { id: `_${++nextId}`, name: 'Julie' },
]

export type ListScreenProps = {}

export default function ListScreen(props: ListScreenProps & Partial<NativeStackScreenProps<any>>) {
    // console.log("List>>", props)

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }, [])

    const [selectedId, setSelectedId] = useState<string>()

    const selectedItem = data.find((item) => item.id === selectedId)

    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <Text>List</Text>
            <FlatList style={styles.list}
                data={data}
                renderItem={({ item }) => {
                    return <View style={styles.item}>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
            <Text>Selectable List {selectedItem && ` : ${selectedItem.name}` }</Text>
            <FlatList style={styles.list}
                data={data}
                renderItem={({ item }) => {
                    const selected = item.id === selectedId
                    return <TouchableOpacity style={[styles.item, selected && styles.itemSelected]} onPress={() => { setSelectedId(item.id) }} >
                        <Text style={[styles.text, selected && styles.textSelected]}>{item.name}</Text>
                    </TouchableOpacity >
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    )
}


console.log(">>>>Loaded ListScreen")