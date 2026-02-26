package com.cometchat.calls;

import android.app.Activity;
import android.view.WindowManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;

public class KeepAwakeModule extends ReactContextBaseJavaModule {
    private static final String TAG = KeepAwakeModule.class.getSimpleName();

    public KeepAwakeModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "KeepAwakeModule";
    }

    @ReactMethod
    public void activateKeepAwake() {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Activity currentActivity = getCurrentActivity();
                if (currentActivity != null) {
                    currentActivity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                    android.util.Log.d(TAG, "Keep awake activated");
                }
            }
        });
    }

    @ReactMethod
    public void deactivateKeepAwake() {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Activity currentActivity = getCurrentActivity();
                if (currentActivity != null) {
                    currentActivity.getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                    android.util.Log.d(TAG, "Keep awake deactivated");
                }
            }
        });
    }
}
