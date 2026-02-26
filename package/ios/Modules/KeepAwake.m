#import "KeepAwake.h"
#import <UIKit/UIKit.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@implementation KeepAwakeModule

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(activateKeepAwake) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIApplication sharedApplication] setIdleTimerDisabled:YES];
        RCTLogInfo(@"Keep awake activated");
    });
}

RCT_EXPORT_METHOD(deactivateKeepAwake) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIApplication sharedApplication] setIdleTimerDisabled:NO];
        RCTLogInfo(@"Keep awake deactivated");
    });
}

@end
