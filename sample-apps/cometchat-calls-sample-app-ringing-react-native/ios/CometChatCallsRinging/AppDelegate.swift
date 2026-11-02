import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import react_native_cometchat_push_notifications
import react_native_cometchat_push_notifications_voip

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?
  var rootView: UIView?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    // Before React Native starts: when a call wakes a killed app, iOS terminates the app unless
    // the call reaches CallKit within a few seconds. The package owns the PushKit registry.
    CometChatPushNotificationsAppDelegate.registerForVoIPPushes()

    // Start React Native here, not when a scene connects: a VoIP push that wakes a killed app
    // may launch it with no scene, and the ring's JavaScript still has to run.
    rootView = factory.rootViewFactory.view(
      withModuleName: "CometChatCallsRinging",
      initialProperties: nil,
      launchOptions: launchOptions
    )

    return true
  }

  func application(
    _ application: UIApplication,
    configurationForConnecting connectingSceneSession: UISceneSession,
    options: UIScene.ConnectionOptions
  ) -> UISceneConfiguration {
    let configuration = UISceneConfiguration(
      name: "Default Configuration",
      sessionRole: connectingSceneSession.role
    )
    configuration.delegateClass = SceneDelegate.self
    return configuration
  }

  func application(
    _ application: UIApplication,
    didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
  ) {
    CometChatPushNotificationsAppDelegate.didRegisterAPNsToken(deviceToken)
  }
}

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?

  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard
      let windowScene = scene as? UIWindowScene,
      let appDelegate = UIApplication.shared.delegate as? AppDelegate,
      let rootView = appDelegate.rootView
    else {
      return
    }

    let viewController = UIViewController()
    viewController.view = rootView

    let window = UIWindow(windowScene: windowScene)
    window.rootViewController = viewController
    window.makeKeyAndVisible()
    self.window = window
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
