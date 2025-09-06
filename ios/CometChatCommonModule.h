#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface CometChatCommonModule : NSObject <RCTBridgeModule>
+ (UIInterfaceOrientationMask)getOrientation;
@end
