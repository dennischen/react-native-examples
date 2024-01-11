import { appStyles } from '@/appStyles'
import Button from '@/components/Button'
import RerenderCounter from '@/components/RerenderCounter'
import utilStyles from '@/utilStyles'
import { web } from '@/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
    header: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    scroll: {
        backgroundColor: '#0f0',
        borderWidth: 2,
        borderColor: '#ff0',
        width: '100%'
    }
})


export type ComponentsScreenProps = {}

export default function ComponentsScreen(props: ComponentsScreenProps & Partial<NativeStackScreenProps<any>>) {
    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <ScrollView style={styles.scroll} contentContainerStyle={{ alignItems: 'center', gap: 8 }}>
                <Buttons />
            </ScrollView>
        </View>
    )
}


function alert(msg: string, title: string = '') {
    if (web && typeof window === 'object') {
        (window as any).alert(msg)
    } else {
        Alert.alert(title, msg)
    }
}

function Buttons() {

    const onPress = () => {
        alert("onPress")
    }
    const onLongPress = () => {
        alert("onLongPress")
    }

    return <View style={[utilStyles.vlayout, { gap: 4, padding: 8 }]}>
        <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap', }]}>
            <Button label='Save' onPress={onPress} onLongPress={onLongPress} vibration={true}></Button>
            <Button icon='save' onPress={onPress} onLongPress={onLongPress} vibration={true}></Button>
        </View>
        <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap', }]}>
            <Button label='Picture' icon='picture-o' ></Button>
            <Button label='Picture' icon='picture-o' iconPosition='right'></Button>
            <Button label='Picture' icon='picture-o' iconPosition='top'></Button>
            <Button label='Picture' icon='picture-o' iconPosition='bottom'></Button>
        </View>
        <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap', }]}>
            <Button label='Pick' icon='camera' ></Button>
            <Button label='Pick' icon='camera' theme='gery'></Button>
            <Button label='Pick' icon='camera' theme='red'></Button>
            <Button label='Pick' icon='camera' theme='green'></Button>
            <Button label='Pick' icon='camera' theme='blue'></Button>
        </View>
        <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap', }]}>
            <Button label='Record' icon='microphone-slash' disabled></Button>
            <Button label='Record' icon='microphone-slash' theme='gery' disabled></Button>
            <Button label='Record' icon='microphone-slash' theme='red' disabled></Button>
            <Button label='Record' icon='microphone-slash' theme='green' disabled></Button>
            <Button label='Record' icon='microphone-slash' theme='blue' disabled></Button>
        </View>
        <View style={[utilStyles.hlayout, { gap: 4, flexWrap: 'wrap', }]}>
            <Button label="Save" icon='save' style={{ padding: 16 }} textStyle={{color: '#ff0', fontSize: 24}}></Button>
            <Button icon='save' style={{ padding: 16 }} textStyle={{color: '#ff0', fontSize: 24}}></Button>
            <Button label="Save" icon='save' style={{ padding: 16 }} textStyle={{color: '#ff0', fontSize: 24}} disabled></Button>
            <Button icon='save' style={{ padding: 16 }} textStyle={{color: '#ff0', fontSize: 24}} disabled></Button>
        </View>

    </View>
}


console.log(">>>>Loaded APIScreen")