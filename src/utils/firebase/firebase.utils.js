import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	getDocs,
	query,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAjRiwwXQQQDjwp2PKIZ-YMXmMAJH7t_2o',
	authDomain: 'crwn-clothing-db-44733.firebaseapp.com',
	projectId: 'crwn-clothing-db-44733',
	storageBucket: 'crwn-clothing-db-44733.appspot.com',
	messagingSenderId: '234010588531',
	appId: '1:234010588531:web:1dc5f0cbf025f005050106',
};

// INITIALIZE FIREBASE
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth(firebaseApp);

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const SignInWithGoogleRedirect = () =>
	signInWithRedirect(auth, provider);

export const db = getFirestore();

// FIRESTORE DOCUMENTS MANIPULATION

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd,
	field,
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db); //batch is to make transactions (multiple creation, if one failes => rollback)

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object[field].toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('done');
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, 'categories');

	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);

	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});

	return categoryMap;
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionnalInfos = {},
) => {
	if (!userAuth) return;

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
				...additionnalInfos,
			});
		} catch (error) {
			console.log('Error creating the user', error.message);
		}
	} else {
		console.log('user already exists');
	}

	return userDocRef;
};

// FIREBASE AUTH

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) {
		return;
	}

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) {
		return;
	}

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
	return onAuthStateChanged(auth, callback);
};

// FIREBASE SHOP_DATA
