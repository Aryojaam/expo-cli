import { ConfigPlugin } from '../../Plugin.types';
import {
  withNotificationIconColor,
  withNotificationIcons,
  withNotificationManifest,
} from '../../android/Notifications';
import { withEntitlementsPlist } from '../ios-plugins';
import { createLegacyPlugin } from './createLegacyPlugin';

const withNotificationsEntitlement: ConfigPlugin<'production' | 'development'> = (config, mode) => {
  return withEntitlementsPlist(config, config => {
    config.modResults['aps-environment'] = mode;
    return config;
  });
};

export default createLegacyPlugin({
  packageName: 'expo-notifications',
  fallback: [
    // Android
    withNotificationManifest,
    withNotificationIconColor,
    withNotificationIcons,
    // iOS
    [withNotificationsEntitlement, 'development'],
  ],
});
