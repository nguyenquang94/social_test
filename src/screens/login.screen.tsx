import React from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Header from '../components/HeaderBack';
import { colors } from '../styles/colors';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { BrandText } from '../components/HeaderBack/BrandText';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { loginFacebookAction, loginGoogleAction } from '../stores/auth/auth.actions';

const LoginScreen = React.memo(() => {
  const dispatch = useTypedDispatch()
  const loginWithGoogle = async () => {
    dispatch(loginGoogleAction())
  };
  const loginWithFacebook = async () => {
    dispatch(loginFacebookAction())
  };
  return (
    <View style={{ backgroundColor: colors.mainColor, flex: 1 }}>
      <SafeAreaView />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primaryColor }]} onPress={() => loginWithGoogle()}>
              <BrandText style={styles.txtBtn}>Login with Google</BrandText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, { backgroundColor: 'blue', marginTop: 10 }]} onPress={() => loginWithFacebook()}>
              <BrandText style={styles.txtBtn}>Login with Facebook</BrandText>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
});

const styles = StyleSheet.create({
  btn: {
    width: "90%",
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16
  },
  txtBtn: {
    color: colors.white,
    fontSize: 16
  }
});

export default LoginScreen;
