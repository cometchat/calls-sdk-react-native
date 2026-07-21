/*
 * Copyright @ 2017-present 8x8, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#import "CometChatAudioSession.h"
#import "CometChatAudioSession+Private.h"


@implementation CometChatAudioSession

+ (RTCAudioSession *)rtcAudioSession {
    return [RTCAudioSession sharedInstance];
}

+ (void)setUseManualAudio:(BOOL)useManualAudio {
    RTCAudioSession *rtcAudioSession = self.rtcAudioSession;
    rtcAudioSession.useManualAudio = useManualAudio;
    // Audio stays disabled until the session is activated by the system
    // and handed over via activateWithAudioSession:.
    rtcAudioSession.isAudioEnabled = NO;
}

+ (BOOL)useManualAudio {
    return self.rtcAudioSession.useManualAudio;
}

+ (void)activateWithAudioSession:(AVAudioSession *)session {
    RTCAudioSession *rtcAudioSession = self.rtcAudioSession;
    // In manual audio mode WebRTC no longer configures the session itself,
    // so apply its configuration to the CallKit-activated session here.
    // It must be WebRTC's own configuration object: configuring the session
    // any other way (or anywhere earlier, e.g. before requesting the
    // CXStartCallAction) desyncs the CallKit UI's audio route button.
    RTCAudioSessionConfiguration *config = [RTCAudioSessionConfiguration webRTCConfiguration];
    [rtcAudioSession lockForConfiguration];
    [rtcAudioSession setConfiguration:config error:nil];
    [rtcAudioSession unlockForConfiguration];
    [rtcAudioSession audioSessionDidActivate:session];
    rtcAudioSession.isAudioEnabled = YES;
}

+ (void)deactivateWithAudioSession:(AVAudioSession *)session {
    RTCAudioSession *rtcAudioSession = self.rtcAudioSession;
    rtcAudioSession.isAudioEnabled = NO;
    [rtcAudioSession audioSessionDidDeactivate:session];
}

@end
