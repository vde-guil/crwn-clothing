import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpStart } from '../../store/user/user.actions';
import { selectIsLoading } from '../../store/user/user.selector';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import Spinner from '../spinner/spinner.component';

import { SignUpContainer } from './sign-up-form.style';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

function SignUpForm() {
	const [formField, setFormField] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formField;

	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const { name, value } = event.target;

		setFormField((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("password don't match");
			return;
		}

		dispatch(signUpStart(email, password, displayName));
		setFormField(defaultFormFields);
		
	};

	if (isLoading)
	return (
		<SignUpContainer>
			<Spinner/>
		</SignUpContainer>
		
	)

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

				<Button buttonType={BUTTON_TYPES_CLASSES.base} type='submit'>
					Sign Up
				</Button>
			</form>
		</SignUpContainer>
	);
}

export default SignUpForm;
