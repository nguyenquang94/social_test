/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    post: {
        loading: false,
        data: []
    },
    comments: []
};
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;
        },
        logoutActionSlice: state => {
            state.user = null;
        },
        setLoadingPost: (state, action) => {
            state.post.loading = action.payload;
        },
        setDataPost: (state, action) => {
            state.post.data = action.payload;
        },
        setDataComment: (state, action) => {
            state.comments = action.payload;
        },
    },
});

export const {
    setAuthUser,
    logoutActionSlice,
    setLoadingPost,
    setDataPost,
    setDataComment,
} = authSlice.actions;
