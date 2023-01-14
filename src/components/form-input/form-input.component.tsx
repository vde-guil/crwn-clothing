import { InputHTMLAttributes } from 'react';
import { FormInputLabel, Group, Input } from './form-input.style';

type FormInputProps = {
	label: string;
} & InputHTMLAttributes<HTMLInputElement>;

function FormInput({ label, ...otherProps }: FormInputProps) {
	return (
		<Group>
			<Input type='text' {...otherProps} />
			{label && (
				<FormInputLabel
					shrink={Boolean(
						otherProps.value &&
							typeof otherProps.value === 'string' &&
							otherProps.value.length,
					)}
				>
					{label}
				</FormInputLabel>
			)}
		</Group>
	);
}

export default FormInput;
