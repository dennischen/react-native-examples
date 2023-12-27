import { appStyles } from '@/appStyles'
import { FlatList, StyleSheet, Text, View } from 'react-native'


const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
})

export default function List() {

    let i = 0;
    return (
        <View style={appStyles.screen}>
            <FlatList style={{width: '100%'}}
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


