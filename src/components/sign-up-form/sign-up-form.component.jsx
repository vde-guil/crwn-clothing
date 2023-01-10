import {  useState } from 'react';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import Button , {BUTTON_TYPES_CLASSES} from '../button/button.component';
import FormInput from '../form-input/form-input.component';

import {SignUpContainer} from './sign-up-form.style.jsx';

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
		<SignUpContainer>
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

				<Button buttonType={BUTTON_TYPES_CLASSES.base} type='submit'>Sign Up</Button>
			</form>
		</SignUpContainer>
	);
}

export default SignUpForm;
