import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { AppNavigator } from './app.navigator';
import { AppRoutes } from './app.routes';
import { AuthNavigator } from './auth.navigator';
export type RootStackParamList = {
  [AppRoutes.AUTH]: undefined;
  [AppRoutes.APP]: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackNavigatorProps = React.ComponentProps<
  typeof Stack.Navigator
>;

export const RootNavigator = (
  props: Partial<RootStackNavigatorProps>,
): React.ReactElement => {
  const user = useCurrentUser()
  return (
    <Stack.Navigator {...props} headerMode="none">
      {!user ? <Stack.Screen name={AppRoutes.AUTH} component={AuthNavigator} /> : null}
      {user ? <Stack.Screen name={AppRoutes.APP} component={AppNavigator} /> : null}
    </Stack.Navigator>
  );
};
