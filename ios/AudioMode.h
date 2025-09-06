
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>


@interface AudioMode : RCTEventEmitter<RTCAudioSessionDelegate,RCTBridgeModule>

@property(nonatomic, strong) dispatch_queue_t workerQueue;

@end

