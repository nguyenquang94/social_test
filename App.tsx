import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import RootApp from './src/Root';
import { NavigationContainer } from '@react-navigation/native';
import { Settings } from 'react-native-fbsdk-next';
import { Provider } from 'react-redux';

import { store } from './src/stores';
Settings.initializeSDK();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootApp />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
