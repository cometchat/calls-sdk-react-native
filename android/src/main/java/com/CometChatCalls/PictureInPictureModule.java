package com.CometChatCalls;

import android.app.Activity;
import android.app.KeyguardManager;
import android.app.PictureInPictureParams;
import android.content.Context;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.os.Build;
import android.os.PowerManager;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.Rational;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class PictureInPictureModule extends ReactContextBaseJavaModule {
    public static final String NAME = "PictureInPictureModule";
    public static final String TAG = NAME;
    public static boolean isPIPInitialized = false;
    private ReactApplicationContext mReactContext;
    public  PowerManager.WakeLock wakeLock;
    private AudioManager audioManager;
    private static boolean isEnabled;

    public PictureInPictureModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    public void enterPictureInPictureMode() {
        if (!isEnabled) {
            return;
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Activity currentActivity = getCurrentActivity();
            if (currentActivity != null) {
                DisplayMetrics metrics = currentActivity.getResources().getDisplayMetrics();

                Rational aspectRatio = new Rational(metrics.widthPixels, metrics.heightPixels);
                PictureInPictureParams params = new PictureInPictureParams.Builder()
                        .setAspectRatio(aspectRatio)
                        .build();
                currentActivity.enterPictureInPictureMode(params);
            }
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    public void exitPictureInPictureMode() {
        Activity currentActivity = getCurrentActivity();

        try {
            if (currentActivity != null) {
                if (currentActivity.isInPictureInPictureMode()) {
                    currentActivity.moveTaskToBack(true);
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "[exitPictureInPictureMode]", e);
        }
    }

    @ReactMethod
    public void setPictureInPictureEnabled(Boolean enabled) {
        isEnabled = enabled;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    public void initializePictureInPictureMode() {
        isPIPInitialized = true;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    public void getIsPIPInitialized(Promise promise) {
        promise.resolve(isPIPInitialized);
    }

    public void notifyPipModeChanged(boolean isInPipMode) {
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onPipModeChanged", isInPipMode);
    }

    @ReactMethod
    private void requestAudioFocus() {
        audioManager = (AudioManager) mReactContext.getSystemService(Context.AUDIO_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int result = audioManager.requestAudioFocus(new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
                    .setAudioAttributes(
                            new AudioAttributes.Builder()
                                    .setUsage(AudioAttributes.USAGE_VOICE_COMMUNICATION)
                                    .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                                    .build()
                    )
                    .build());
            if (result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
                Log.d(TAG, "Audio focus granted");
            } else {
                Log.d(TAG, "Audio focus request failed");
            }
        }
    }

    @ReactMethod
    public void isDeviceLocked(Promise promise) {
        try {
            KeyguardManager keyguardManager = (KeyguardManager) mReactContext.getSystemService(Context.KEYGUARD_SERVICE);
            boolean isLocked = keyguardManager.isDeviceLocked();
            promise.resolve(isLocked);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }
}
