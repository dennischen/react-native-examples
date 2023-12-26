import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Button, Text, View } from 'react-native'
import Info from './screens/Info'
import List from './screens/List'
import Scroll from './screens/Scroll'
import { appStyles, styles } from './styles'



const pages = new Map([
    { name: 'info', title: 'Info', view: () => { return <Info /> } },
    { name: 'scroll', title: 'scroll', view: () => { return <Scroll /> } },
    { name: 'list', title: 'List', view: () => { return <List /> } }
].map((e) => [e.name, e]))

export default function App() {

    const [view, setView] = useState(pages.keys().next().value as string)

    return (
        <View style={appStyles.app}>
            <Text>View : {pages.get(view)?.title}</Text>
            <StatusBar style='light' translucent={false} />
            <View style={[styles.hlayout, { padding: 4, gap: 4, flexWrap: 'wrap' }]}>
                {new Array(...pages.values()).map((e) => <Button key={e.name} title={e.title} onPress={() => { setView(e.name) }} />)}
            </View>
            {pages.get(view)?.view()}
        </View>
    )
}


