import { appStyles } from '@/appStyles'
import Info from '@/screens/Info'
import List from '@/screens/List'
import Scroll from '@/screens/Scroll'
import Touchable from '@/screens/Touchable'
import { utilStyles } from '@/utilStyles'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Button, Pressable, Text, View } from 'react-native'


const screens = new Map([
    { name: 'info', title: 'Info', view: () => { return <Info /> } },
    { name: 'scroll', title: 'scroll', view: () => { return <Scroll /> } },
    { name: 'list', title: 'List', view: () => { return <List /> } },
    { name: 'touchable', title: 'Touchable', view: () => { return <Touchable /> } }
].map((e) => [e.name, e]))

export default function App() {

    const appName = process.env.EXPO_PUBLIC_APP_NAME;


    const [screen, setScreen] = useState(screens.keys().next().value as string)

    return (
        <View style={appStyles.app}>
            <Text>{appName} : Screen : {screens.get(screen)?.title}</Text>
            <StatusBar style='light' translucent={false} />
            <View style={[utilStyles.hlayout, { padding: 4, gap: 4, flexWrap: 'wrap' }]}>
                {new Array(...screens.values()).map((e) => <Button key={e.name} title={e.title} onPress={() => { setScreen(e.name) }} />)}
            </View>
            {screens.get(screen)?.view()}
        </View>
    )
}


