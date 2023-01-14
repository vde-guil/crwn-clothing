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
	User,
	NextOrObserver,
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
	QueryDocumentSnapshot
} from 'firebase/firestore';
import { Category } from '../../store/categories/categories.types';

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

export type ObjectToAdd = {
	title: string
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[],
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db); //batch is to make transactions (multiple creation, if one failes => rollback)

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log('done');
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, 'categories');

	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};


export type AdditionnalDetails = {
	displayName?: string
}

export type UserData = {
	createAt: Date;
	displayName: string;
	email: string;
}

export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionnalInfos = {} as AdditionnalDetails,
): Promise<undefined | QueryDocumentSnapshot<UserData>> => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	let userSnapshot = await getDoc(userDocRef);

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

			userSnapshot = await getDoc(userDocRef);

		} catch (error) {
			console.log('Error creating the user', error);
		}
	}
	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// FIREBASE AUTH

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) {
		return;
	}

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) {
		return;
	}

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
	return onAuthStateChanged(auth, callback);
};

// FIREBASE SHOP_DATA

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			(error) => {
				return reject(error);
			},
		);
	});
};
