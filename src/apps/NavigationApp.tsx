import { appStyles } from '@/appStyles'
import { utilStyles } from '@/utilStyles'
import { web } from '@/utils'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Button, Text, View } from 'react-native'
import App from './App'
import screens, { ScreenParamList } from './screens'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

type NavboxProps = NativeStackScreenProps<ScreenParamList>

const Stack = createNativeStackNavigator<ScreenParamList>()

export default function NavigationApp() {

    return <NavigationContainer>
        <StatusBar style='light' translucent={false} />
        <Stack.Navigator initialRouteName={screens.keys().next().value as any} screenOptions={{ headerShown: false }}>
            {new Array(...screens.values()).map((s) => <Stack.Screen
                key={s.name}
                name={s.name as any}
                options={{ title: s.title }}
                component={Navbox}
            />)}
        </Stack.Navigator>
    </NavigationContainer>
}

function Navbox({ navigation, route }: NavboxProps) {
    const appName = process.env.EXPO_PUBLIC_APP_NAME

    return <View style={appStyles.app}>
        <Text>{appName} : Screen : {screens.get(route.name)?.title}</Text>
        <View style={[utilStyles.hlayout, { padding: 4, gap: 4, flexWrap: 'wrap' }]}>
            {new Array(...screens.values()).map((e) => <Button key={e.name} title={e.title}
                onPress={() => {
                    //reuse the screen (pop to it if it is in the hsitory)
                    navigation.navigate(e.name as any, { from: route.name, time: new Date().getTime() })

                    //always always push a new screen 
                    // navigation.push(e.name as any, { from: route.name, time: new Date().getTime() })
                }}
            />)}
        </View>
        {(() => {
            const CO = screens.get(route.name)?.component()
            return CO && <CO navigation={navigation} route={route} {...route.params} />
        })()}
    </View>
}


