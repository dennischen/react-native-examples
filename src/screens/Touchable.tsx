import { appStyles } from '@/appStyles'
import { android } from '@/utils'
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

export default function Touchable() {

    const onPressButton = () => {
        Alert.alert('You tapped the button!')
    }

    const onLongPressButton = () => {
        Alert.alert('You long-pressed the button!')
    }

    return (
        <View style={appStyles.screen}>
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

