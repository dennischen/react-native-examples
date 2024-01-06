import appStyles from '@/appStyles'
import utilStyles from '@/utilStyles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useRef, useState } from 'react'
import {
    Button,
    StyleSheet,
    Switch,
    Text,
    View,
    VirtualizedList
} from 'react-native'


const itemHeight = 50
const itemMargin = 8
const height = itemHeight + itemMargin * 2

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        height: itemHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: itemMargin,
        marginHorizontal: 16,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 16,
    },
})

type ItemData = {
    id: string
    title: string
}

type ItemCache = {
    size: number
    [key: number]: ItemData
}

function getItem(data: any, index: number): ItemData {
    if (data[index]) {
        return data[index]
    }
    console.log("getItem>>>>>>", Object.keys(data).length, index)
    return data[index] = {
        id: Math.random().toString(12).substring(0),
        title: `Item ${index + 1}`,
    }
}

function getItemCount(data: any) {
    // console.log("getItemCount>>>>>>", data)
    return data.size
}

function getItemLayout(data: any, index: number) {

    return {
        length: height,
        offset: height * index,
        index: index
    }
}

type ItemProps = {
    title: string
}

const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
)

export type VirtualizedListScreenProps = {

}

export default function VirtualizedListScreen(props: VirtualizedListScreenProps & Partial<NativeStackScreenProps<any>>) {
    const [endless, setEndless] = useState(true)
    const [size, setSize] = useState(300)
    const vlist = useRef<VirtualizedList<ItemData>>(null)
    const cache = useRef<ItemCache>({ size: 300 })
    const onTogleEndless = () => {
        setEndless(!endless)
    }
    //BUG, scroll to end doesn't trigger onEndReached
    const onEndReached = () => {
        if(endless){
            cache.current.size = cache.current.size + 100
            setSize(cache.current.size)
        }
    }
    return (
        <View style={appStyles.screen}>
            <View style={[utilStyles.hlayout, { gap: 4 }]}>
                <Switch value={endless} onValueChange={onTogleEndless}></Switch>
                {endless ? <Text>Endless, current max {size}</Text> : <Text>Max {size}</Text>}
            </View>
            <View style={[utilStyles.hlayout, { gap: 4, marginTop: 4 }]}>
                <Button onPress={() => { vlist.current?.scrollToOffset({ offset: 0, animated: true }) }} title="To top" />
                <Button onPress={() => { vlist.current?.scrollToIndex({ index: size / 2 - 1, animated: true }) }} title={`To ${size / 2}`} />
                <Button onPress={() => { vlist.current?.scrollToEnd({ animated: true }) }} title="To end" />
            </View>
            <VirtualizedList
                ref={vlist}
                style={{ width: '100%' }}
                data={cache.current}
                initialNumToRender={4}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={item => item.id}
                getItemLayout={getItemLayout}
                getItemCount={getItemCount}
                getItem={getItem}
                onEndReached={onEndReached}
            />
        </View>
    )
}

