import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import useI18n from '@/contexts/useI18n'
import utilStyles from '@/utilStyles'
import { getDeviceLanguage } from '@/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Text, View } from 'react-native'


export type InfoScreenProps = {
}

export default function Info(props: InfoScreenProps & Partial<NativeStackScreenProps<any>>) {


    const { language, setLanguage, fallbackLanguage, label: l, i18nextInstance: i18next } = useI18n()

    return (
        <View style={[appStyles.screen, { gap: 4 }]}>
            <RerenderCounter />
            <Text>Current Language: {language}</Text>
            <Text>Fallback Language: {fallbackLanguage}</Text>
            <Text>I18Next Language: {i18next.language}</Text>
            <Text>Device Language: {getDeviceLanguage()}</Text>
            <Text>{l('i18n')} / {l('i18n.hello', { "who": 'World' })}</Text>
            <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap' }]}>
                <Button onPress={() => {
                    setLanguage('en')
                }} title="en" />
                <Button onPress={() => {
                    setLanguage('zh')
                }} title="zh" />
                <Button onPress={() => {
                    setLanguage('zh_#Hant')
                }} title="zh_#Hant" />
                <Button onPress={() => {
                    setLanguage('zh_CN')
                }} title="zh_CN" />
                <Button onPress={() => {
                    setLanguage('unknow')
                }} title="Unknow fallback" />
            </View>
        </View>
    )
}


console.log(">>>>Loaded InfoScreen")