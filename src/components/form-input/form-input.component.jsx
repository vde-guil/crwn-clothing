import {FormInputLabel, Group, Input} from './form-input.style.jsx';

function FormInput({ label, ...otherProps }) {
	return (
		<Group>
			<Input type='text' {...otherProps} />
			{label && (
				<FormInputLabel
					shrink={otherProps.value.length}
					// className={`${
					// 	otherProps.value.length ? 'shrink' : ''
					// } form-input-label`}
				>
					{label}
				</FormInputLabel>
			)}
		</Group>
	);
}

export default FormInput;
