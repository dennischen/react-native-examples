import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FlatList, StyleSheet, Text, View } from 'react-native'


const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
})

export type ListProps = {}

export default function List(props: ListProps & Partial<NativeStackScreenProps<any>>) {
    // console.log("List>>", props)
    let i = 0
    return (
        <View style={appStyles.screen}>
            <RerenderCounter/>
            <FlatList style={{ width: '100%' }}
                data={[
                    { name: 'Devin' },
                    { name: 'Dan' },
                    { name: 'Dominic' },
                    { name: 'Jackson' },
                    { name: 'James' },
                    { name: 'Joel' },
                    { name: 'John' },
                    { name: 'Jillian' },
                    { name: 'Jimmy' },
                    { name: 'Julie' },

                    { name: 'Devin' },
                    { name: 'Dan' },
                    { name: 'Dominic' },
                    { name: 'Jackson' },
                    { name: 'James' },
                    { name: 'Joel' },
                    { name: 'John' },
                    { name: 'Jillian' },
                    { name: 'Jimmy' },
                    { name: 'Julie' },

                    { name: 'Devin' },
                    { name: 'Dan' },
                    { name: 'Dominic' },
                    { name: 'Jackson' },
                    { name: 'James' },
                    { name: 'Joel' },
                    { name: 'John' },
                    { name: 'Jillian' },
                    { name: 'Jimmy' },
                    { name: 'Julie' },
                ]}
                renderItem={({ item, index }) => <Text key={index} style={styles.item}>{item.name}</Text>}
            />
        </View>
    )
}


