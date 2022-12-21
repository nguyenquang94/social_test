import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { RootNavigator } from './navigation/root.navigator';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <RootNavigator />
    </View>
  );
};

export default App;
