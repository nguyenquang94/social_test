import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { BrandText } from '../components/HeaderBack/BrandText';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { colors } from '../styles/colors';
import { logoutAction } from '../stores/auth/auth.actions';

const ProfileScreen = React.memo(() => {
  const dispatch = useTypedDispatch()

  const logout = async () => {
    dispatch(logoutAction())
  };
  return (
    <View style={{ backgroundColor: colors.white, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => logout()}>
        <BrandText>Logout</BrandText>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({});

export default ProfileScreen;
