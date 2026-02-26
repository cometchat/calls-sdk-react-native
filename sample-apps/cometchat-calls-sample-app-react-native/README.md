
<p align="center">
  <img alt="CometChat" src="https://assets.cometchat.io/website/images/logos/banner.png">
</p>

# React Native Calls Sample App by CometChat

This is a reference application showcasing the integration of [CometChat's React Native Calls SDK](https://www.cometchat.com/docs/sdk/react-native/calling-overview) in a React Native project. It demonstrates how to implement real-time voice and video calling features with ease.

<p align="center">
  <img src="../../screenshots/showcase-1.png" alt="Mobile Screenshot 1" width="30%">&nbsp;&nbsp;
  <img src="../../screenshots/showcase-2.png" alt="Mobile Screenshot 2" width="30%">&nbsp;&nbsp;
  <img src="../../screenshots/showcase-3.png" alt="Mobile Screenshot 3" width="30%">
</p>


## Prerequisites

Sign up for a [CometChat](https://app.cometchat.com/) account to obtain your app credentials: _`App ID`_, _`Region`_, and _`Auth Key`_

- **Node.js** 18 or higher
- **React Native** Version 0.77 or later (up to the latest version)

**iOS**
- Xcode
- Pod (CocoaPods) for iOS
- An iOS device or emulator with iOS 12.0 or above.

**Android**
- Android Studio
- Android device or emulator with Android version 5.0 or above.


## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/cometchat/calls-sdk-react-native.git
   ```

1. Change into the sample app's directory:
   ```sh
   cd sample-apps/cometchat-calls-sample-app-react-native
   ```

1. Run `npm install` to install the dependencies.

1. `[Optional]` Configure CometChat credentials:
    - Open the `useAppStore.ts` file located at `src/store/useAppStore.ts` and enter your CometChat _`appId`_, _`region`_, and _`authKey`_:
      ```ts
      const initialState: AppState = {
        appId: 'YOUR_APP_ID',
        authKey: 'YOUR_AUTH_KEY',
        region: 'YOUR_REGION',
      };
      ```
    - Alternatively, you can enter your credentials on first launch via the in-app credentials screen.

1. For iOS, install dependencies after navigating to ios:
   ```sh
   cd ios
   pod install
   ```

1. Run the app on a device or emulator from the sample app root.
   ```sh
   npm start
   npm run android
   npm run ios
   ```


## Help and Support

For issues running the project or integrating with our UI Kits, consult our [documentation](https://www.cometchat.com/docs/sdk/react-native/calling-overview) or create a [support ticket](https://help.cometchat.com/hc/en-us). You can also access real-time support via the [CometChat Dashboard](http://app.cometchat.com/).
