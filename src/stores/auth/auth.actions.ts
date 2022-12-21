import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AppThunk } from "..";
import { firebase } from '@react-native-firebase/database';
import { Alert } from "react-native";
import { logoutActionSlice, setAuthUser, setDataComment, setDataPost, setLoadingPost } from "./auth.slice";
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { FirebaseModel } from '../../constant';
import { keyBy } from 'lodash';
GoogleSignin.configure({
    scopes: ['email', 'profile'],
    webClientId:
        '130078611734-kmjd43drt9it4kmv62j7ic9habr39i0h.apps.googleusercontent.com',
    offlineAccess: true,
});
export const realtimeDatabaseReference = firebase.app().database('https://socialdemo-4dc96-default-rtdb.asia-southeast1.firebasedatabase.app')
export const loginGoogleAction = (): AppThunk => async dispatch => {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const response = await auth().signInWithCredential(googleCredential);
        if (response.user) {
            dispatch(setAuthUser(response.user._user))
        } else {
            Alert.alert('Failed', 'Login Failed');
        }

    } catch (error) {
        Alert.alert('Failed', 'Login Failed');
    }
};

export const loginFacebookAction = (): AppThunk => async dispatch => {
    try {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        const response = await auth().signInWithCredential(facebookCredential);
        if (response.user) {
            dispatch(setAuthUser(response.user._user))
        } else {
            Alert.alert('Failed', 'Login Failed');
        }
    } catch (error) {
        Alert.alert('Failed', 'Login Failed');
    }
};

export const logoutAction = (): AppThunk => async dispatch => {
    try {
        dispatch(logoutActionSlice())
        LoginManager.logOut()
        GoogleSignin.signOut()
    } catch (error) {
        Alert.alert('Failed', 'Login Failed');
    }
};

export const getListPost = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoadingPost(true))
        const users = await realtimeDatabaseReference.ref(FirebaseModel.POST).limitToFirst(100).orderByChild('time').once('value').then((snapshot) => {
            const listPost: any = []
            snapshot.forEach(snapshotItem => {
                listPost.push({ id: snapshotItem.key, ...snapshotItem.val() })
            });
            dispatch(setDataPost(listPost.reverse()))
            dispatch(setLoadingPost(false))
        })
    } catch (error) {
        dispatch(setLoadingPost(false))
    }
};


export const getListComment = (): AppThunk => async dispatch => {
    try {
        dispatch(setLoadingPost(true))
        const users = await realtimeDatabaseReference.ref(FirebaseModel.COMMENT).limitToFirst(1000).orderByChild('time').once('value').then((snapshot) => {
            const listPost: any = []
            snapshot.forEach(snapshotItem => {
                listPost.push({ id: snapshotItem.key, ...snapshotItem.val() })
            });
            dispatch(setDataComment(listPost.reverse()))
        })
    } catch (error) {
        dispatch(setLoadingPost(false))
    }
};
