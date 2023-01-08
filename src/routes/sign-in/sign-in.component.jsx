
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

function Signin() {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();

		const userDocRef = await createUserDocumentFromAuth(user);
		console.log(userDocRef);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Signin with google popup</button>
      <SignUpForm />
		</div>
	);
}

export default Signin;
