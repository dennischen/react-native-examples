import { iOS } from '@/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
    Button,
    Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View
} from 'react-native'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        width: '100%',
        
        borderWidth: 4,
        borderColor: '#550',
        
    },
    inner: {
        padding: 16,
        flex: 1,
        justifyContent: 'space-between',

        borderWidth: 4,
        borderColor: '#aa0',
        
    },
    header: {
        fontSize: 36,
        alignSelf: 'center'
    },
    textInput: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
    },
    btnContainer: {
        
        borderWidth: 4,
        borderColor: '#ff0',
    },
})


export type KeyboardAvoidingProps = {
}

export default function KeyboardAvoiding(props: KeyboardAvoidingProps & Partial<NativeStackScreenProps<any>>) {

    return (
        <KeyboardAvoidingView
            behavior={iOS ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.header}>Header</Text>
                    <TextInput placeholder="Username" style={styles.textInput} />
                    <TextInput placeholder="Password" secureTextEntry={true} style={styles.textInput} />
                    <View style={styles.btnContainer}>
                        <Button title="Submit" onPress={() => null} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}


