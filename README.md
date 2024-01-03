
This project provides some examples for learning react-nativate


# Build / Release apk or aab

## Provide the key store
Before packaing a apk or aab, you have to set keystore first, using following command to create a keystore and keep the password in mind
```
cd ./android/app/
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Edit the `~/.gradle/gradle.properties` with the password
```
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

Read `~/android/app/build.gradle` and `~/android/gradle.properties`, search MYAPP_ for detail

## Assemble the release apk
Use following command to release apk in `.\android\app\build\outputs\apk\release\app-release.apk`

```
cd android
./gradlew assembleRelease
```

Install the the apk 
```
adb connect ip[:port] # connect to wifi debug-on device
adb devices
adb install .\android\app\build\outputs\apk\release\app-release.apk
```

## Buindle the release aab
Use following command to release aab in `.\android\app\build\outputs\bundle\release\app-release.aab`

```
cd android
./gradlew bundleRelease
```