# CometChat Calls SDK v5 — React Native Skills

Agent skills for building with the CometChat Calls SDK v5 on React Native. Install individually or browse all available skills.

## How It Works

Skills are bundled in this repository under `skills/`. When you clone the repo and open it in a supported AI coding assistant, skills auto-trigger based on what you're doing — mention "join session" and the join-session skill loads, ask about "audio mode" and the audio-mode skill loads. No manual activation needed.

To use these skills in your own project, copy the `skills/` folder into your project root:

```bash
cp -r skills/ /path/to/your/project/skills/
```

## Available Skills

### Core

| Skill | Triggers On |
|-------|-------------|
| `setup` | SDK install, init, login, permissions, Info.plist, AndroidManifest |
| `join-session` | CometChatCalls.Component, callToken, sessionSettings, voice vs video |
| `ringing-integration` | Dual SDK (Chat + Calls), initiateCall, accept/reject/cancel, incoming/outgoing |
| `session-settings` | All SessionSettings options: layouts, session type, hide buttons, idle timeout |
| `event-listeners` | addEventListener for session, participant, media, button, layout, mobile-specific events |

### Migration

| Skill | Triggers On |
|-------|-------------|
| `migration-v4-to-v5` | Upgrading from Calls SDK v4 to v5, replacing deprecated APIs, CallSettingsBuilder to sessionSettings, OngoingCallListener to addEventListener |

### Advanced

| Skill | Triggers On |
|-------|-------------|
| `recording` | Auto-start recording, recording events |
| `audio-controls` | Mute/unmute microphone |
| `video-controls` | Camera on/off, switch camera (front/back) |
| `audio-mode` | Speaker, earpiece, Bluetooth, headphones |
| `picture-in-picture` | PiP mode, floating call window |
| `custom-ui` | Hide default controls, render custom RN views, programmatic actions |

## How Auto-Detection Works

Each skill has a `description` field in its YAML frontmatter that lists trigger keywords. When you mention something related (like "join a call" or "switch to speaker"), the agent reads the description, decides the skill is relevant, and loads its full content. You never need to manually select a skill.

## Compatibility

- CometChat Calls SDK v5 (`@cometchat/calls-sdk-react-native@latest`)
- CometChat Chat SDK v4 (`@cometchat/chat-sdk-react-native@latest`) — required for ringing
- React Native 0.72+
- iOS 13+, Android 8.0+ (API 26+)
- Works with: Kiro, Claude Code, Cursor, Copilot, and other AI coding assistants that support the skills ecosystem
