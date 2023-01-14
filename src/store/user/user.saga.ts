import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { USER_ACTION_TYPES } from './user.types';
import {
	signInSuccess,
	signInFailed,
	signUpFailed,
	signUpSuccess,
	signOutFailed,
	signOutSuccess,
	EmailSignInStart,
	SignUpSuccess,
	SignUpStart,
} from './user.actions';
import {
	AdditionnalDetails,
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	getCurrentUser,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
	signOutUser,
} from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';

export function* getSnapshotFromUserAuth(
	userAuth: User,
	additionnalData?: AdditionnalDetails,
) {
	try {
		const userSnapshot = yield* call(
			createUserDocumentFromAuth,
			userAuth,
			additionnalData,
		);

		if (userSnapshot) {
			yield* put(
				signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }),
			);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield* call(getCurrentUser);
		if (!userAuth) return;

		yield* call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* asyncSignIn({ type, payload }: EmailSignInStart) {
	const { email, password } = payload;

	try {
		const userCredentials = yield* call(
			signInAuthUserWithEmailAndPassword,
			email,
			password,
		);
		if (userCredentials) {
			const { user } = userCredentials;
			yield* call(getSnapshotFromUserAuth, user);
		}
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* asyncGoogleSignIn() {
	try {
		const { user } = yield* call(signInWithGooglePopup);
		yield* call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield* put(signInFailed(error as Error));
	}
}

export function* signInAfterSignUp({ payload }: SignUpSuccess) {
	const { user, additionnalDetails } = payload;

	yield* call(getSnapshotFromUserAuth, user, additionnalDetails);
}

export function* asyncSignUp({ payload }: SignUpStart) {
	const { email, password, displayName } = payload;
	try {
		const userCredentials = yield* call(
			createAuthUserWithEmailAndPassword,
			email,
			password,
		);
		if (userCredentials) {
			const { user } = userCredentials;
			yield* put(signUpSuccess(user, { displayName }));
		}
	} catch (error) {
		yield* put(signUpFailed(error as Error));
	}
}

export function* asyncSignOut() {
	try {
		yield* call(signOutUser);
		yield* put(signOutSuccess());
	} catch (error) {
		yield* put(signOutFailed(error as Error));
	}
}

export function* onCheckUserSession() {
	yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, asyncSignIn);
}

export function* onGoogleSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, asyncGoogleSignIn);
}

export function* onSignUpStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, asyncSignUp);
}

export function* onSignUpSuccess() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, asyncSignOut);
}

export function* userSaga() {
	yield* all([
		call(onCheckUserSession),
		call(onEmailSignInStart),
		call(onGoogleSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
