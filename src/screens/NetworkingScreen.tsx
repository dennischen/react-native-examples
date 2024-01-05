import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { InteractionManager, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

type Movie = {
    id: string
    title: string
    releaseYear: string
}
export type NetworkingScreenProps = {}

export default function NetworkingScreen(props: NetworkingScreenProps & Partial<NativeStackScreenProps<any>>) {
    // console.log("Networking>>", props)

    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState<Movie[]>([])

    const getMovies = async () => {
        try {
            const response = await fetch('https://reactnative.dev/movies.json')
            const json = await response.json()
            setData(json.movies)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <View style={appStyles.screen}>
            <View style={{ flex: 1, padding: 24 }}>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={({ id }) => id}
                        renderItem={({ item }) => (
                            <Text>
                                {item.title}, {item.releaseYear}
                            </Text>
                        )}
                    />
                )}
            </View>
        </View>
    )
}

console.log(">>>>Loaded NetworkingScreen")
