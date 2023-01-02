import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextareaAutosize, TextareaAutosizeProps } from '@mui/base';

import CommonFieldWrapper from './CommonFieldWrapper';

interface TextareaFieldProps extends TextareaAutosizeProps {
	name: string;
	label?: string;
	isRequire?: boolean;
	direction?: 'row' | 'column';
}

export const TextareaField = React.forwardRef(function TextareaField(
	props: TextareaFieldProps,
	ref: React.Ref<HTMLTextAreaElement>,
) {
	const { register } = useFormContext();

	return (
		<CommonFieldWrapper
			name={props.name}
			label={props.label}
			isRequire={props.isRequire}
			direction={props.direction}
		>
			<TextareaAutosize
				{...register(props.name)}
				ref={ref}
				minRows={6}
				className={
					'block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
				}
			/>
		</CommonFieldWrapper>
	);
});
