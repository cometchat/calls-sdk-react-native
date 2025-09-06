#import "CometChatCommonModule.h"
#import <UIKit/UIKit.h>

@implementation CometChatCommonModule {
}

RCT_EXPORT_MODULE();


static UIInterfaceOrientationMask _orientationMask = UIInterfaceOrientationMaskAll;

+ (void)setOrientation: (UIInterfaceOrientationMask)orientationMask {
    _orientationMask = orientationMask;
}

+ (UIInterfaceOrientationMask)getOrientation {
    return _orientationMask;
}

RCT_EXPORT_METHOD(lockToPortrait) {
    [CometChatCommonModule setOrientation:UIInterfaceOrientationMaskPortrait];
    [UIViewController attemptRotationToDeviceOrientation];
}

RCT_EXPORT_METHOD(unlockAllOrientations) {
    [CometChatCommonModule setOrientation:UIInterfaceOrientationMaskAll];
}

@end
