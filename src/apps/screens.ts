import { AndroidNativeScreenProps } from '@/screens/AndroidNativeScreen'
import { AnimationScreenProps } from '@/screens/AnimationScreen'
import { ImageBackgroundScreenProps } from '@/screens/ImageBackgroundScreen'
import { ImageScreenProps } from '@/screens/ImageScreen'
import { InfoScreenProps } from '@/screens/InfoScreen'
import { KeyboardAvoidingScreenProps } from '@/screens/KeyboardAvoidingScreen'
import { ListScreenProps } from '@/screens/ListScreen'
import { NetworkingScreenProps } from '@/screens/NetworkingScreen'
import { ScrollScreenProps } from '@/screens/ScrollScreen'
import { TouchableScreenProps } from '@/screens/TouchableScreen'
import { android, iOS } from '@/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'


export type Screen = {
    name: string,
    title: string,
    component: () => React.ComponentType<Partial<NativeStackScreenProps<any>>>
}

export type ScreenParamList = {
    info: InfoScreenProps
    scroll: ScrollScreenProps
    image: ImageScreenProps
    imageBackground: ImageBackgroundScreenProps
    list: ListScreenProps
    touchable: TouchableScreenProps
    animation: AnimationScreenProps
    networking: NetworkingScreenProps
    keyboardAvoiding: KeyboardAvoidingScreenProps
    androidNative: AndroidNativeScreenProps
}

export const screenList: Screen[] = [
    { name: 'info', title: 'Info', component: () => { return require('@/screens/InfoScreen').default } },
    { name: 'scroll', title: 'scroll', component: () => { return require('@/screens/ScrollScreen').default } },
    { name: 'image', title: 'Image', component: () => { return require('@/screens/ImageScreen').default } },
    { name: 'imageBackground', title: 'ImageBackground', component: () => { return require('@/screens/ImageBackgroundScreen').default } },
    { name: 'list', title: 'List', component: () => { return require('@/screens/ListScreen').default } },
    { name: 'sectionList', title: 'SectionList', component: () => { return require('@/screens/SectionListScreen').default } },
    { name: 'virtualizedList', title: 'VirtualizedList', component: () => { return require('@/screens/VirtualizedListScreen').default } },
    { name: 'touchable', title: 'Touchable', component: () => { return require('@/screens/TouchableScreen').default } },
    { name: 'animation', title: 'Animation', component: () => { return require('@/screens/AnimationScreen').default } },
    { name: 'modal', title: 'Modal', component: () => { return require('@/screens/ModalScreen').default } },
    { name: 'statusBar', title: 'StatusBar', component: () => { return require('@/screens/StatusBarScreen').default } },
    { name: 'networking', title: 'Networking', component: () => { return require('@/screens/NetworkingScreen').default } },
    { name: 'api', title: 'API', component: () => { return require('@/screens/APIScreen').default } },
    { name: 'i18n', title: 'I18n', component: () => { return require('@/screens/I18nScreen').default } },
]

if (android || iOS){//no web
    //Unable to resolve "react-native-web/dist/exports/DrawerLayoutAndroid"
    //https://github.com/expo/expo/issues/23322, can't work in build item with web
    // after switch to react-native-gesture-handler, it can pass the build, but gesture looks like has some bug in web, 
    // so disable it 
    screenList.push({ name: 'drawerLayout', title: 'Drawer Layout', component: () => { return require('@/screens/DrawerLayoutScreen').default } })

    screenList.push({ name: 'keyboardAvoiding', title: 'Keyboard Avoiding', component: () => { return require('@/screens/KeyboardAvoidingScreen').default } })
}
if (android) {//android only
    screenList.push({ name: 'androidNative', title: 'Android Native', component: () => { return require('@/screens/AndroidNativeScreen').default } })
    screenList.push({ name: 'androidPermission', title: 'Android Permission', component: () => { return require('@/screens/AndroidPermissionScreen').default } })
}else if (iOS){//ios only
    
}

export const screens: Map<string, Screen> = new Map(screenList.map((e) => [e.name, e]))

export default screens