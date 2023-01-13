import { USER_ACTION_TYPES } from './user.types';

// SET_CURRENT_USER: 'user/SET_CURRENT_USER',
// CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
// GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
// EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
// SIGN_IN_SUCESS: ' user/SIGN_IN_SUCESS',
// SIGN_IN_FAILURE: ' user/SIGN_IN_FAILURE',

// export const setCurrentUser = (user) => {
// 	return { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user };
// };

export const checkUserSession = () => ({
	type: USER_ACTION_TYPES.CHECK_USER_SESSION,
});

export const googleSignInStart = () => ({
	type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = (email, password) => ({
	type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  payload: {email, password}
});

export const signInSuccess = (user) => ({
	type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailed = (error) => ({
	type: USER_ACTION_TYPES.SIGN_IN_FAILED,
  payload: error
});

export const signUpStart = (email, password, displayName) => ({
	type: USER_ACTION_TYPES.SIGN_UP_START,
  payload: {email, password, displayName}
});

export const signUpSuccess = (user, additionnalDetails) => ({
	type: USER_ACTION_TYPES.SIGN_UP_SUCCESS,
  payload: {user, additionnalDetails}
});

export const signUpFailed = (error) => ({
	type: USER_ACTION_TYPES.SIGN_UP_FAILED,
  payload: error
});

export const signOutStart = () => ({
	type: USER_ACTION_TYPES.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
	type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS,
});

export const signOutFailed = (error) => ({
	type: USER_ACTION_TYPES.SIGN_OUT_FAILED,
  payload: error
});