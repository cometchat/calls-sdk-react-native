import type { Region } from './store/useAppStore';

/**
 * Optional defaults for the credentials screen. Leave them empty to enter the values on first
 * launch. Never commit real values: an Auth Key belongs in a development build only.
 */
export const AppConstants = {
  appId: '',
  authKey: '',
  region: 'US' as Region,
  /** Your FCM provider ID on Android, your APNs provider ID on iOS. */
  pushProviderId: '',
  /** The name CallKit shows above an incoming call. */
  callKitName: 'Calls Ringing',
  sampleUsersURL: 'https://assets.cometchat.io/sampleapp/sampledata.json',
};
