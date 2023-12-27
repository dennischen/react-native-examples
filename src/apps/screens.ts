import Info, { InfoProp } from '@/screens/Info'
import List, { ListProp } from '@/screens/List'
import Scroll, { ScrollProp } from '@/screens/Scroll'
import Touchable, { TouchableProp } from '@/screens/Touchable'
import { NativeStackScreenProps } from '@react-navigation/native-stack'


export type Screen = {
    name: string,
    title: string,
    component: () => React.ComponentType<Partial<NativeStackScreenProps<any>>>
}

export type ScreenParamList = {
    info: InfoProp
    scroll: ScrollProp
    list: ListProp
    touchable: TouchableProp
}


export const screens: Map<string, Screen> = new Map([
    { name: 'info', title: 'Info', component: () => { return Info } },
    { name: 'scroll', title: 'scroll', component: () => { return Scroll } },
    { name: 'list', title: 'List', component: () => { return List } },
    { name: 'touchable', title: 'Touchable', component: () => { return Touchable } }
].map((e) => [e.name, e]))

export default screens