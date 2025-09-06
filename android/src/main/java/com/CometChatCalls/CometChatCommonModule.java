package com.CometChatCalls;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.pm.ActivityInfo;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CometChatCommonModule extends ReactContextBaseJavaModule {
    public static final String NAME = "CometChatCommonModule";
    public static final String TAG = NAME;
    private final ReactApplicationContext mReactContext;
    
    public int appOrientation = ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED;

    public CometChatCommonModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @SuppressLint("SourceLockedOrientationActivity")
    @ReactMethod
    public void lockToPortrait() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) return;
        this.appOrientation = currentActivity.getRequestedOrientation();
        currentActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    }

    @ReactMethod
    public void unlockAllOrientations() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) return;
        currentActivity.setRequestedOrientation(this.appOrientation);
    }
}
