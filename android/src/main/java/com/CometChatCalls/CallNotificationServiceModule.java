package com.CometChatCalls;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class CallNotificationServiceModule extends ReactContextBaseJavaModule {

    public static ReactApplicationContext reactContext;

    public CallNotificationServiceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        CallNotificationServiceModule.reactContext = reactContext;
    }

    public static void sendEvent(String eventName, String message) {
        if (reactContext != null) {
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, message);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "CallNotificationService";
    }

    @ReactMethod
    public void startService() {
        Intent serviceIntent = new Intent(reactContext, CallNotificationService.class);
        reactContext.startService(serviceIntent);
    }

    @ReactMethod
    public void stopService() {
        Intent serviceIntent = new Intent(reactContext, CallNotificationService.class);
        reactContext.stopService(serviceIntent);
        CallNotificationService.resetStartingTime();
    }
}

