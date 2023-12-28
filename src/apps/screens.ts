import Animation from '@/screens/Animation'
import Info, { InfoProps } from '@/screens/Info'
import List, { ListProps } from '@/screens/List'
import Networking from '@/screens/Networking'
import Scroll, { ScrollProps } from '@/screens/Scroll'
import Touchable, { TouchableProps } from '@/screens/Touchable'
import { NativeStackScreenProps } from '@react-navigation/native-stack'


export type Screen = {
    name: string,
    title: string,
    component: () => React.ComponentType<Partial<NativeStackScreenProps<any>>>
}

export type ScreenParamList = {
    info: InfoProps
    scroll: ScrollProps
    list: ListProps
    touchable: TouchableProps
}


export const screens: Map<string, Screen> = new Map([
    { name: 'info', title: 'Info', component: () => { return Info } },
    { name: 'scroll', title: 'scroll', component: () => { return Scroll } },
    { name: 'list', title: 'List', component: () => { return List } },
    { name: 'touchable', title: 'Touchable', component: () => { return Touchable } },
    { name: 'animation', title: 'Animation', component: () => { return Animation } },
    { name: 'networking', title: 'Networking', component: () => { return Networking } }
].map((e) => [e.name, e]))

export default screens