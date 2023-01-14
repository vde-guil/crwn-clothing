import { AnyAction } from 'redux';
import {
	emailSignInStart,
	googleSignInStart,
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutStart,
	signOutSuccess,
	signUpFailed,
	signUpStart,
} from './user.actions';
import { UserState } from './user.types';

const INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (
	state = INITIAL_STATE,
	action: AnyAction,
): UserState => {
	if (
		googleSignInStart.match(action) ||
		emailSignInStart.match(action) ||
		signUpStart.match(action) ||
		signOutStart.match(action)
	) {
		return {
			...state,
			error: null,
			isLoading: true,
		};
	}

	if (signInSuccess.match(action)) {
		return {
			...state,
			currentUser: action.payload,
			isLoading: false,
		};
	}

	if (signOutSuccess.match(action)) {
		return {
			...state,
			currentUser: null,
			isLoading: false,
		};
	}

	if (
		signInFailed.match(action) ||
		signUpFailed.match(action) ||
		signOutFailed.match(action)
	) {
		return {
			...state,
			error: action.payload,
			isLoading: false,
		};
	}
	return state;
};
