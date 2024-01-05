import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import { android } from '@/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'

const styles = StyleSheet.create({
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        borderRadius: 4
    },
    buttonText: {
        textAlign: 'center',
        padding: 20,
        color: 'white',
    },
})
export type TouchableScreenProps = {

}

export default function TouchableScreen(props: TouchableScreenProps & Partial<NativeStackScreenProps<any>>) {
    // console.log("Touchable>>", props)

    const onPressButton = () => {
        Alert.alert('You tapped the button!')
    }

    const onLongPressButton = () => {
        Alert.alert('You long-pressed the button!')
    }

    return (
        <View style={appStyles.screen}>
            <RerenderCounter/>
            <TouchableHighlight onPress={onPressButton} underlayColor="#fff0">
                <View style={styles.button}>
                    <Text style={styles.buttonText}>TouchableHighlight</Text>
                </View>
            </TouchableHighlight>
            <TouchableOpacity onPress={onPressButton}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>TouchableOpacity</Text>
                </View>
            </TouchableOpacity>
            {android && <TouchableNativeFeedback
                onPress={onPressButton}
                background={
                    TouchableNativeFeedback.SelectableBackground()
                }>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        TouchableNativeFeedback
                    </Text>
                </View>
            </TouchableNativeFeedback>}
            <TouchableWithoutFeedback onPress={onPressButton}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableHighlight
                onPress={onPressButton}
                onLongPress={onLongPressButton}
                underlayColor="#fff0">
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Touchable with Long Press</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}


console.log(">>>>Loaded TouchableScreen")