import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { faHome, faUser } from 'nvquang-font-icon/pro-light-svg-icons';
import React from 'react';
import HomeScreen from '../screens/home.screen';
import ProfileScreen from '../screens/profile.screen';
import { AppRoutes } from './app.routes';
export type AppStackParamList = {
  [AppRoutes.HOME_SCREEN]: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

export type HomeStackNavigatorProps = React.ComponentProps<
  typeof Stack.Navigator
>;

const Tab = createBottomTabNavigator();
export const AppNavigator = (
  props: Partial<HomeStackNavigatorProps>,
): React.ReactElement => {
  return (
    <Tab.Navigator {...props} screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen name={AppRoutes.HOME_SCREEN}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHome} color={color} size={size} />
          )
        }}
        component={HomeScreen} />
      {/* <Tab.Screen name={AppRoutes.CREATE_SCREEN}
        options={{
          headerShown: false,
          title: 'Create Post',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faPlusCircle} color={color} size={size} />
          )
        }} component={HomeScreen} /> */}
      <Tab.Screen name={AppRoutes.PROFILE_SCREEN} options={{
        headerShown: false,
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <FontAwesomeIcon icon={faUser} color={color} size={size} />
        )
      }} component={ProfileScreen} />
    </Tab.Navigator >
  )
};
