import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	emailSignInStart,
	googleSignInStart,
} from '../../store/user/user.actions';
import { selectIsLoading } from '../../store/user/user.selector';

import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import Spinner from '../spinner/spinner.component';

import { ButtonsContainer, SignInContainer } from './sign-in-form.style.jsx';

const defaultFormFields = {
	email: '',
	password: '',
};

function SignInForm() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);

	const signInWithGoogle = async () => {
		dispatch(googleSignInStart());
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		dispatch(emailSignInStart(email, password));
		setFormFields(defaultFormFields);
	};

	if (isLoading) {
		return (
			<SignInContainer>
				<Spinner />
			</SignInContainer>
		);
	}

	return (
		<SignInContainer>
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
				<ButtonsContainer>
					<Button buttonType={BUTTON_TYPES_CLASSES.base} type='submit'>
						SIGN IN
					</Button>
					<Button
						type='button'
						onClick={signInWithGoogle}
						buttonType={BUTTON_TYPES_CLASSES.google}
					>
						Google Signin
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
}

export default SignInForm;
