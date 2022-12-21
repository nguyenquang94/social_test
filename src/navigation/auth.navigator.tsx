import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AppRoutes} from './app.routes';
import LoginScreen from '../screens/login.screen';

export type AuthStackParamList = {
  [AppRoutes.LOGIN_SCREEN]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export type AuthStackNavigatorProps = React.ComponentProps<
  typeof Stack.Navigator
>;

export const AuthNavigator = (
  props: Partial<AuthStackNavigatorProps>,
): React.ReactElement => {
  return (
    <Stack.Navigator {...props} headerMode="none">
      <Stack.Screen name={AppRoutes.LOGIN_SCREEN} component={LoginScreen} />
    </Stack.Navigator>
  );
};
