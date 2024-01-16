import * as FileSystem from 'expo-file-system'
import { StorageAccessFramework } from "expo-file-system"


type ExternalDirectoryPermission = {
    granted: boolean
    directory: string
    reason?: string
}

type ExternalFileInfo = {
    exists: boolean,
    uri: string
    directory: string,
    file: string
}

const requestExternalDirectoryPermissionDirectory = async (directory: string): Promise<ExternalDirectoryPermission> => {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync(StorageAccessFramework.getUriForDirectoryInRoot(encodeURIComponent(directory)))
    if (permissions.granted) {
        const dirUri = decodeURIComponent(permissions.directoryUri)
        //`content://com.android.externalstorage.documents/tree/primary:${externalDir}/document/primary:${externalDir}`;
        //from the "primary:"
        const idx = dirUri.lastIndexOf('primary:')
        if (idx) {
            directory = dirUri.substring(idx + 8)
        }
    }
    return {
        granted: permissions.granted,
        directory
    }
}

export const requestExternalDirectoryPermission = async (directory: string = ''): Promise<ExternalDirectoryPermission> => {
    const externalDirUri = StorageAccessFramework.getUriForDirectoryInRoot(encodeURIComponent(directory))
    let permission: ExternalDirectoryPermission
    try {
        //check permission again by access it with FileSystem
        const info = await FileSystem.getInfoAsync(externalDirUri)
        //the isDirectory is always false by my test
        if (!info || !info.exists) {
            permission = await requestExternalDirectoryPermissionDirectory(directory)
        } else {
            permission = {
                granted: true,
                directory
            }
        }
    } catch (err: any) {
        permission = await requestExternalDirectoryPermissionDirectory(directory)
    }
    return permission
}


export const getInfo = async (directory: string, file: string): Promise<ExternalFileInfo> => {
    const externalDirUri = StorageAccessFramework.getUriForDirectoryInRoot(encodeURIComponent(directory))
    let externalFileUri = externalDirUri + encodeURIComponent(`/${file}`)
    let exists: boolean = false
    try {
        //will throw exception if file not found
        let info = await FileSystem.getInfoAsync(externalFileUri)
        //if file is not exit, it throws exception
        //the directory is not trustable when it is external
        // if (!info.exists || info.isDirectory) {

        // }
        exists = info.exists

    } catch (err) {
        
    }
    return {
        exists,
        uri: externalFileUri,
        directory,
        file
    }
}

export const writeAsStringAsync = async (directory: string, file: string, value: string, option?: FileSystem.WritingOptions): Promise<void> => {
    const externalDirUri = StorageAccessFramework.getUriForDirectoryInRoot(encodeURIComponent(directory))
    let externalFileUri: string
    try {
        externalFileUri = externalDirUri + encodeURIComponent(`/${file}`)
        //will throw exception if file not found
        let info = await FileSystem.getInfoAsync(externalFileUri)
        //if file is not exit, it throws exception
        //the directory is not trustable when it is external
        // if (!info.exists || info.isDirectory) {

        // }

    } catch (err) {
        //create file again of a existed file will cause StorageAccessFramework create a new file with filename (count).ext
        externalFileUri = await StorageAccessFramework.createFileAsync(externalDirUri, file, "text/plain")

    }

    return FileSystem.writeAsStringAsync(externalFileUri, value, option)
}


export const readAsStringAsync = async (directory: string, file: string, option?: FileSystem.WritingOptions): Promise<string> => {
    const externalDirUri = StorageAccessFramework.getUriForDirectoryInRoot(encodeURIComponent(directory))
    let externalFileUri: string
    try {
        externalFileUri = externalDirUri + encodeURIComponent(`/${file}`)
        //will throw exception if file not found
        let info = await FileSystem.getInfoAsync(externalFileUri)
        //if file is not exit, it throws exception
        //the directory is not trustable when it is external
        // if (!info.exists || info.isDirectory) {

        // }
        return FileSystem.readAsStringAsync(externalFileUri, option)

    } catch (err) {
        throw err
    }
}
