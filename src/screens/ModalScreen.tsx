
import { appStyles } from '@/appStyles'
import RerenderCounter from '@/components/RerenderCounter'
import utilStyles from '@/utilStyles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0005'
    },
    modalView: {
        padding: 35,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 4,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

export type ModalScreenProps = {}

export default function ModalScreen(props: ModalScreenProps & Partial<NativeStackScreenProps<any>>) {
    // console.log("Scroll>>", props)
    const [modalVisible1, setModalVisible1] = useState(false)
    const [modalVisible2, setModalVisible2] = useState(false)
    return (
        <View style={appStyles.screen}>
            <RerenderCounter />
            <MyModal
                title="Model 1, Keep instance/state"
                visible={modalVisible1}
                onRequestClose={() => {
                    setModalVisible1(false)
                }}>
            </MyModal>
            {modalVisible2 && <MyModal
                title="Model 2, New instance/state"
                visible={modalVisible2}
                onRequestClose={() => {
                    setModalVisible2(false)
                }}>
            </MyModal>}
            <View style={[utilStyles.hlayout, { gap: 4 }]}>
                <Pressable
                    android_ripple={{color: '#f00'}}
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible1(true)}>
                    <Text style={styles.textStyle}>Show Modal 1</Text>
                </Pressable>
                <Pressable
                    android_ripple={{color: '#0f0'}}
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible2(true)}>
                    <Text style={styles.textStyle}>Show Modal 2</Text>
                </Pressable>
            </View>
        </View>
    )
}

function MyModal({ title, visible, onRequestClose }: { title: string, visible: boolean, onRequestClose: () => void }) {
    const [count, setCount] = useState(0)
    return <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={[styles.centeredView]}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>{title} : {count}</Text>
                <View style={[utilStyles.hlayout, { gap: 4 }]}>
                    <Pressable
                        android_ripple={{color: '#00f'}}
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setCount(count + 1)}>
                        <Text style={styles.textStyle}>Incress count</Text>
                    </Pressable>
                    <Pressable
                        android_ripple={{color: '#00f'}}
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => onRequestClose()}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </Modal>
}


console.log(">>>>Loaded ModalScreen")