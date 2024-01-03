package com.reactnativeexamples;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.reactnativeexamples.module.CalendarModule;
import com.reactnativeexamples.module.ImagePickerModule;
import com.reactnativeexamples.view.MyViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class MyAppPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
                new CalendarModule(reactContext),
                new ImagePickerModule(reactContext)
        );
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
//        return Arrays.<ViewManager>asList(
//                new MyViewManager(reactContext)
//        );
        return Collections.emptyList();
    }
}
