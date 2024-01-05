import appStyles from '@/appStyles'
import utilStyles from '@/utilStyles'
import { iOS } from '@/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import {
    Button,
    Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Switch, Text, TextInput, TouchableWithoutFeedback, View
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


export type KeyboardAvoidingScreenProps = {
}

export default function KeyboardAvoidingScreen(props: KeyboardAvoidingScreenProps & Partial<NativeStackScreenProps<any>>) {
    const [rememberMe, setRememberMe] = useState(false)
    const toggleSwitch = () => setRememberMe(rememberMe => !rememberMe)
    return (
        <KeyboardAvoidingView
            behavior={iOS ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.header}>Login</Text>
                    <TextInput placeholder="Username" style={styles.textInput} />
                    <TextInput placeholder="Password" secureTextEntry={true} style={styles.textInput} />
                    <TextInput placeholder="Pin" style={styles.textInput} keyboardType='numeric' />
                    <View style={utilStyles.hlayout}>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={rememberMe ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={rememberMe}
                        />
                        <Text onPress={toggleSwitch}>Remember Me</Text>
                    </View>
                    <Text style={{ fontWeight: 'bold' }}>
                        I 
                        <Text style={{fontStyle: 'italic'}}> am </Text>
                        bold
                        <Text style={{ color: 'red' }}> and red</Text>
                    </Text>
                    <View style={styles.btnContainer}>
                        <Button title="Submit" onPress={() => null} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}


console.log(">>>>Loaded KeyboardAvoidingScreen")