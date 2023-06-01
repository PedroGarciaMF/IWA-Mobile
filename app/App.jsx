/**
 * IWA-Mobile
 * ----------
 *
 * An insecure React Native mobile application for use in application security demonstrations.
 *
 * @author Kevin A. Lee (kadraman)
 *
 */

import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import './Global.js';
import Navigation from './components/Navigation';

export default function App() {

  return (
      <SafeAreaProvider>
        <Navigation></Navigation>
      </SafeAreaProvider>
  );
}
