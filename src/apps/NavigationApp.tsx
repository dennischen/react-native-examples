import { appStyles } from '@/appStyles'
import { utilStyles } from '@/utilStyles'
import { NavigationContainer } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, Animated, Button, Text, View } from 'react-native'
import screens, { ScreenParamList } from './screens'
import I18nProvider, { TranslationLoaders } from '@/contexts/I18nProvider'
import { getDeviceLanguage, web } from '@/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useRef, useState } from 'react'

type NavboxProps = NativeStackScreenProps<ScreenParamList>

const Stack = createNativeStackNavigator<ScreenParamList>()

const USER_LANGUAGE = "userLanguage"

const translationLoaders: TranslationLoaders = {
    "en": () => require('@assets/i18n/en.json'),
    "zh": () => require('@assets/i18n/zh.json'),
    "zh_CN": () => require('@assets/i18n/zh_CN.json')
}

export default function NavigationApp() {

    const [initLanguage, setInitLanguage] = useState<string | undefined>()


    useEffect(() => {
        (async () => {
            const userLanguage: string = await AsyncStorage.getItem(USER_LANGUAGE) || getDeviceLanguage() || 'en'
            setTimeout(()=>{
                setInitLanguage(userLanguage)
            },0)//2000 for test load delay
        })()
    }, [])



    // const userLanguage = getDeviceLanguage() || 'en'
    const onChangeLanguage = (language: string) => {

        AsyncStorage.setItem(USER_LANGUAGE, language)
        //initLanguage is for async AsyncStorage.getItem
        //and I18nProvider will update it language, don't need to update 
        //we don't need to update it
    }

    return initLanguage ? <I18nProvider fallbackLanguage='en' translationLoaders={translationLoaders} language={initLanguage} onChangeLanguage={onChangeLanguage}>
        <NavigationContainer>
            <StatusBar style='light' backgroundColor='#000' translucent={false} />
            <Stack.Navigator initialRouteName={screens.keys().next().value as any} screenOptions={{ headerShown: false }}>
                {new Array(...screens.values()).map((s) => <Stack.Screen
                    key={s.name}
                    name={s.name as any}
                    options={{ title: s.title }}
                    component={Navbox}
                />)}
            </Stack.Navigator>
        </NavigationContainer>
    </I18nProvider> : <InitLoading />
}

function InitLoading() {
    const fadeAnim = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(fadeAnim, {
            delay: 500,
            toValue: 1,
            duration: 1000,
            useNativeDriver: !web
        }).start()
    })
    return <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <StatusBar style='light' backgroundColor='#000' translucent={false} />
        <Animated.View style={{ opacity: fadeAnim, }}>
            <ActivityIndicator size="large" />
        </Animated.View>
    </View>
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


