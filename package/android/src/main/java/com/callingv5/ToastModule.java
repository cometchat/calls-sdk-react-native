package com.cometchat.calls;

import android.widget.Toast;
import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ToastModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "ToastModule";
    }

    @ReactMethod
    public void showToast(String message) {
        Toast.makeText(reactContext, message, Toast.LENGTH_SHORT).show();
    }
}
