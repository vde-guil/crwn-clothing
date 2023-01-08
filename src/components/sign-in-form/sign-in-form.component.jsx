import { useState } from 'react';
import {
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import './sign-in-form.style.scss';

const defaultFormFields = {
	email: '',
	password: '',
};

function SignInForm() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;


	const signInWithGoogle = async () => {
	 await signInWithGooglePopup();
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password,
			);

			setFormFields(defaultFormFields);
		} catch (error) {
			if (
				error.code === 'auth/user-not-found' ||
				error.code === 'auth/wrong-password'
			) {
				alert('Sign In Error');
			}
		}
	};

	return (
		<div className='sign-in-container'>
			<h2>I Do have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>
				<FormInput
					label='password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>
				<div className='buttons-container'>
					<Button type='submit'>SIGN IN</Button>
					<Button
						type='button'
						onClick={signInWithGoogle}
						buttonType='google'
					>
						Google Signin
					</Button>
				</div>
			</form>
		</div>
	);
}

export default SignInForm;
