import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useCallback, useState } from 'react'
import { FlatList, Pressable, RefreshControl, SectionBase, SectionList, SectionListData, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


const styles = StyleSheet.create({
    list: {
        borderColor: '#070',
        borderWidth: 4,
        width: '100%',
        flex: 1
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    // title: {
    //     fontSize: 24,
    // },
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

type Item = {
    id: string,
    name: string,
}
type Section = SectionBase<Item> & {
    title: string
}

const sections: SectionListData<Item, Section>[] = [
    {
        title: 'Group A',
        data: [
            { id: `_${++nextId}`, name: 'Devin' },
            { id: `_${++nextId}`, name: 'Dan' },
            { id: `_${++nextId}`, name: 'Dominic' },
            { id: `_${++nextId}`, name: 'Jackson' },
            { id: `_${++nextId}`, name: 'James' },
            { id: `_${++nextId}`, name: 'Joel' },
            { id: `_${++nextId}`, name: 'John' },
            { id: `_${++nextId}`, name: 'Jillian' },
            { id: `_${++nextId}`, name: 'Jimmy' },
            { id: `_${++nextId}`, name: 'Julie' }
        ]
    },
    {
        title: 'Group B',
        data: [
            { id: `_${++nextId}`, name: 'Devin' },
            { id: `_${++nextId}`, name: 'Dan' },
            { id: `_${++nextId}`, name: 'Dominic' },
            { id: `_${++nextId}`, name: 'Jackson' },
            { id: `_${++nextId}`, name: 'James' },
            { id: `_${++nextId}`, name: 'Joel' },
            { id: `_${++nextId}`, name: 'John' },
            { id: `_${++nextId}`, name: 'Jillian' },
            { id: `_${++nextId}`, name: 'Jimmy' },
            { id: `_${++nextId}`, name: 'Julie' }
        ]
    },
    {
        title: 'Group C',
        data: [
            { id: `_${++nextId}`, name: 'Devin' },
            { id: `_${++nextId}`, name: 'Dan' },
            { id: `_${++nextId}`, name: 'Dominic' },
            { id: `_${++nextId}`, name: 'Jackson' },
            { id: `_${++nextId}`, name: 'James' },
            { id: `_${++nextId}`, name: 'Joel' },
            { id: `_${++nextId}`, name: 'John' },
            { id: `_${++nextId}`, name: 'Jillian' },
            { id: `_${++nextId}`, name: 'Jimmy' },
            { id: `_${++nextId}`, name: 'Julie' }
        ]
    }
]

export type SectionListScreenProps = {}

export default function SectionListScreen(props: SectionListScreenProps & Partial<NativeStackScreenProps<any>>) {
    // console.log("List>>", props)

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }, [])

    const [selectedId, setSelectedId] = useState<string>()

    let selectedItem: Item | undefined;
    selectedId && sections.some((section)=>{
        return selectedItem = section.data.find((item)=>item.id === selectedId)
    })

    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <Text>SectionList</Text>
            <SectionList style={styles.list}
                sections={sections}
                keyExtractor={(item, idx) => {
                    return item.id
                }}
                renderSectionHeader={({section: {title}}) => {
                    return <Text style={styles.header}>{title}</Text>
                }}
                renderItem={({item}) => {
                    return <View style={styles.item}>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
            <Text>Selectable SectionList {selectedItem && ` : ${selectedItem.name}`}</Text>
            <SectionList style={styles.list}
                sections={sections}
                keyExtractor={(item, idx) => {
                    return item.id
                }}
                renderSectionHeader={({section: {title}}) => {
                    return <Text style={styles.header}>{title}</Text>
                }}
                renderItem={({ item, index }) => {
                    const selected = item.id === selectedId
                    return <TouchableOpacity key={index} style={[styles.item, selected && styles.itemSelected]} onPress={() => { setSelectedId(item.id) }} >
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