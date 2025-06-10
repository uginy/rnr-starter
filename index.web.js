import '@expo/metro-runtime';
import { registerRootComponent } from 'expo';
import { App } from 'expo-router/build/qualified-entry';

registerRootComponent(App);

if (module?.hot) {
  module.hot.accept();
}
