import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import useI18n from '@/contexts/useI18n'
import utilStyles from '@/utilStyles'
import { deviceLanguage } from '@/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import moment from 'moment/moment'
import { useEffect, useMemo, useState } from 'react'
import { Appearance, Button, Platform, Text, View } from 'react-native'


export type InfoScreenProps = {
}

export default function Info(props: InfoScreenProps & Partial<NativeStackScreenProps<any>>) {


    const { language, setLanguage, label: l } = useI18n()

    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <Text>{language}</Text>
            <Text>{l('i18n')}</Text>
            <Text>{l('i18n.hello', {"who": 'World'})}</Text>
            <View style={[utilStyles.hlayout, { gap: 4 }]}>
                <Text>Chnage</Text>
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
                }} title="Fallback" />
            </View>
        </View>
    )
}


console.log(">>>>Loaded InfoScreen")