import appStyles from '@/appStyles'
import { web } from '@/utils'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useRef, useState } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { GestureHandlerRootView, enableLegacyWebImplementation, enableExperimentalWebImplementation  } from 'react-native-gesture-handler'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#0f0',
    },
    navigationContainer: {
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
    },
})

if(web){
    console.log("In web")
    //react-native-gesture-handler in web, don't work in my chrome env
    
    //get Uncaught TypeError: _this$accessibilityIs.setNativeProps is not a function
    // enableLegacyWebImplementation(true)

    //get Uncaught TypeError: _this$accessibilityIs.setNativeProps is not a function
    // enableExperimentalWebImplementation(true)
    
}

export type DrawerLayoutScreenProps = {

}

export default function DrawerLayoutScreen(props: DrawerLayoutScreenProps & Partial<NativeStackScreenProps<any>>) {
    const drawer = useRef<any>(null)
    const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
        'left',
    )
    const changeDrawerPosition = () => {
        if (drawerPosition === 'left') {
            setDrawerPosition('right')
        } else {
            setDrawerPosition('left')
        }
    }

    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>
            <Text style={styles.paragraph}>I'm in the Drawer!</Text>
            <Button
                title="Close drawer"
                onPress={() => drawer.current?.closeDrawer()}
            />
        </View>
    )


    return (
        <View style={appStyles.screen}>
            <GestureHandlerRootView style={{ width: '100%', flex: 1 }} >
                <DrawerLayout
                    ref={drawer}
                    useNativeAnimations={!web}
                    drawerWidth={300}
                    drawerPosition={drawerPosition}
                    renderNavigationView={navigationView}
                    >
                    <View style={styles.container}>
                        <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
                        <Button
                            title="Change Drawer Position"
                            onPress={() => changeDrawerPosition()}
                        />
                        <Text style={styles.paragraph}>
                            Swipe from the side or press button below to see it!
                        </Text>
                        <Button
                            title="Open drawer"
                            onPress={() => drawer.current?.openDrawer()}
                        />
                    </View>
                </DrawerLayout>
            </GestureHandlerRootView>
        </View>
    )
}

console.log(">>>>Loaded DrawerLayoutScreen")