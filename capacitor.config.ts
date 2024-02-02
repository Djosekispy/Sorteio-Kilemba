import { CapacitorConfig } from '@capacitor/cli';
/// <reference types="@capacitor/push-notifications" />

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'kilemba',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  }
};

export default config;
