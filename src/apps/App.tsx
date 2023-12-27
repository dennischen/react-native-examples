import { appStyles } from '@/appStyles'
import { utilStyles } from '@/utilStyles'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Button, Text, View } from 'react-native'
import screens from './screens'

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
            {(()=>{
                const CO = screens.get(screen)?.component()
                return CO && <CO />
            })()}
        </View>
    )
}


