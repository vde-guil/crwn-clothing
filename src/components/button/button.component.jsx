import {
	BaseButton,
	ButtonSpinner,
	GoogleSignInButton,
	InvertedButton,
} from './button.style.jsx';

export const BUTTON_TYPES_CLASSES = {
	base: 'base',
	google: 'google-sign-in',
	inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPES_CLASSES) => {
	return {
		[BUTTON_TYPES_CLASSES.base]: BaseButton,
		[BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
		[BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
	}[buttonType];
};

function Button({ children, buttonType, isLoading, ...otherProps }) {
	const CustomButton = getButton(buttonType);

	return (
		<CustomButton disabled={isLoading} {...otherProps}>
			{isLoading ? <ButtonSpinner /> : children}
		</CustomButton>
	);
}

export default Button;
