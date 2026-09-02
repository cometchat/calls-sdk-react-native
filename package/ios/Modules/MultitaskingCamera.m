#import <AVFoundation/AVFoundation.h>
#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>

// Where react-native-webrtc's headers land depends on how the host app links
// its pods, which an SDK does not get to choose: a directory named after the
// module under `use_frameworks!`, one named after the pod when CocoaPods
// namespaces its public headers, and the bare search path otherwise.
#if __has_include(<react_native_webrtc/WebRTCModuleOptions.h>)
#import <react_native_webrtc/WebRTCModuleOptions.h>
#elif __has_include(<react-native-webrtc/WebRTCModuleOptions.h>)
#import <react-native-webrtc/WebRTCModuleOptions.h>
#else
#import "WebRTCModuleOptions.h"
#endif

/**
 * Opts every camera capture session react-native-webrtc creates into
 * multitasking camera access, and reports to JS whether iOS actually grants it.
 *
 * Without it iOS interrupts capture
 * (AVCaptureSessionInterruptionReasonVideoDeviceNotAvailableWithMultipleForegroundApps)
 * as soon as the app stops being the sole full-screen foreground app — which
 * includes entering system Picture in Picture — and the local camera freezes on
 * its last frame for everyone else in the call.
 *
 * react-native-webrtc reads the flag when it builds each VideoCaptureController
 * and applies it in -startCapture, but only after checking
 * AVCaptureSession.isMultitaskingCameraAccessSupported, so leaving it on is a
 * no-op where the OS or device does not allow it. Support is limited to iPads
 * that run Stage Manager before iOS 18; from iOS 18 it also covers
 * video-conferencing apps that declare `voip` in UIBackgroundModes, which
 * Info.plist already does.
 */
/**
 * Set at image load, so the flag is in place before any getUserMedia call — the
 * capture session only reads it when the capture starts, so setting it later
 * would not affect tracks that are already running. A constructor rather than a
 * +load because RCT_EXPORT_MODULE already defines +load on this class.
 */
__attribute__((constructor)) static void CometChatEnableMultitaskingCameraAccess(void) {
    [WebRTCModuleOptions sharedInstance].enableMultitaskingCameraAccess = YES;
}

@interface MultitaskingCameraModule : NSObject <RCTBridgeModule>
@end

@implementation MultitaskingCameraModule

RCT_EXPORT_MODULE(MultitaskingCamera);

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

/**
 * Asked of a throwaway session on purpose: the answer turns on the device, the
 * OS version and this app's own linkage and background modes, not on how a
 * particular session is configured. Allocating a session neither touches the
 * camera nor triggers the permission prompt.
 */
+ (BOOL)isSupported {
    if (@available(iOS 16.0, *)) {
        return [[AVCaptureSession alloc] init].isMultitaskingCameraAccessSupported;
    }

    return NO;
}

- (NSDictionary *)constantsToExport {
    return @{@"isSupported" : @([MultitaskingCameraModule isSupported])};
}

@end
