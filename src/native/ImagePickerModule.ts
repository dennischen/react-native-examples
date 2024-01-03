import { NativeModules } from 'react-native'


interface IImagePickerModule {
    pickImage: () => Promise<string>
    // NativeModule for listener
    addListener(eventType: string): void
    removeListeners(count: number): void
}

const { ImagePickerModule } = NativeModules

export default ImagePickerModule as IImagePickerModule