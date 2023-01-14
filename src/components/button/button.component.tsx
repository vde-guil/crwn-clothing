import { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import {
	BaseButton,
	ButtonSpinner,
	GoogleSignInButton,
	InvertedButton
} from './button.style';


export enum BUTTON_TYPES_CLASSES  {
	base = 'base',
	google = 'google-sign-in',
	inverted = 'inverted',
};

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) : typeof BaseButton => {
	return {
		[BUTTON_TYPES_CLASSES.base]: BaseButton,
		[BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
		[BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
	}[buttonType];
};

type ButtonProps = {
	buttonType?: BUTTON_TYPES_CLASSES;
	isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>

function Button({ children, buttonType, isLoading, ...otherProps }: PropsWithChildren<ButtonProps>) {
	const CustomButton = getButton(buttonType);

	return (
		<CustomButton disabled={isLoading} {...otherProps}>
			{isLoading ? <ButtonSpinner /> : children}
		</CustomButton>
	);
}

export default Button;
