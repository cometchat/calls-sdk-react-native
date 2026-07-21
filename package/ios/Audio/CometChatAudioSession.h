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

#import <Foundation/Foundation.h>

@class AVAudioSession;

@interface CometChatAudioSession : NSObject

/**
 * Enables or disables manual audio session management, for use with CallKit.
 *
 * When enabled, WebRTC no longer activates the audio session on its own:
 * audio stays disabled (`isAudioEnabled == NO`) until the system activates
 * the audio session and `activateWithAudioSession:` is called from
 * `CXProviderDelegate`'s `provider:didActivateAudioSession:`.
 *
 * Enable this before reporting the call to CallKit (before requesting the
 * `CXStartCallAction`/`CXAnswerCallAction`), and disable it when the call
 * ends so that non-CallKit calls keep working.
 */
+ (void)setUseManualAudio:(BOOL)useManualAudio;

/**
 * Whether manual audio session management is currently enabled.
 */
+ (BOOL)useManualAudio;

/**
 * Call from `CXProviderDelegate`'s `provider:didActivateAudioSession:`.
 * Hands the CallKit-activated session over to WebRTC and enables audio.
 */
+ (void)activateWithAudioSession:(AVAudioSession *)session;

/**
 * Call from `CXProviderDelegate`'s `provider:didDeactivateAudioSession:`.
 * Disables audio and notifies WebRTC that the session was deactivated.
 */
+ (void)deactivateWithAudioSession:(AVAudioSession *)session;

@end
