import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAjRiwwXQQQDjwp2PKIZ-YMXmMAJH7t_2o',
	authDomain: 'crwn-clothing-db-44733.firebaseapp.com',
	projectId: 'crwn-clothing-db-44733',
	storageBucket: 'crwn-clothing-db-44733.appspot.com',
	messagingSenderId: '234010588531',
	appId: '1:234010588531:web:1dc5f0cbf025f005050106',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth(firebaseApp);

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const SignInWithGoogleRedirect = () =>
	signInWithRedirect(auth, provider);

// FIRESTORE

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionnalInfos = {}) => {
  if (!userAuth)
    return ;

	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
        ...additionnalInfos
			});
		} catch (error) {
			console.log('Error creating the user', error.message);
		}
	} else {
    console.log('user already exists')
  }

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) {
		return;
	}

  return await createUserWithEmailAndPassword(auth, email, password);
};
