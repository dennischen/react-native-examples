package com.reactnativeexamples.module;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class CalendarModule extends ReactContextBaseJavaModule {
    public CalendarModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "CalendarModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("DEFAULT_EVENT_NAME", "New Event");
        return constants;
    }

//    @ReactMethod
//    public void createCalendarEvent(String name, String location, Callback callBack) {
//        Log.d(getName(), "Create event called with name: " + name
//                + " and location: " + location);
//
//        callBack.invoke("Return value in Java");
//    }

    @ReactMethod
    public void createCalendarEvent(String name, String location, Promise promise) {
        Log.d(getName(), "Create event called with name: " + name
                + " and location: " + location);

        try {
            if (name == null || name.isBlank() || name.isEmpty()) {
                throw new IllegalArgumentException("name is blank");
            }

            WritableMap result = Arguments.createMap();
            result.putString("id", UUID.randomUUID().toString());
            result.putString("name", name);
            result.putString("location", location);

            promise.resolve(result);
        } catch (Exception e) {
            Log.e(getName(), e.getMessage(), e);
            promise.reject("Error", e.getMessage(), e);
        }
    }
}
