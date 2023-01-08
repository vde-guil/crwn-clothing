import { useState } from 'react';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import './sign-up-form.style.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

function SignUpForm() {
	const [formField, setFormField] = useState(defaultFormFields);

	const { displayName, email, password, confirmPassword } = formField;

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormField((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(formField);

		if (password !== confirmPassword) {
			alert("password don't match");
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password,
			);

			const userDocRef = await createUserDocumentFromAuth(user, {
				displayName,
			});
			console.log(userDocRef);
			setFormField(defaultFormFields);
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			}

			console.log('User Creation Error', error.message);
		}
	};

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='DisplayName'
					type='text'
					required
					onChange={handleChange}
					name='displayName'
					value={displayName}
				/>

				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>

				<FormInput
					label='Confirm Password'
					type='password'
					required
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
				/>

				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
}

export default SignUpForm;
