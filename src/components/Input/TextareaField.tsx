import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextareaAutosize, TextareaAutosizeProps } from '@mui/base';
import clsx from 'clsx';

import CommonFieldWrapper from './CommonFieldWrapper';

interface TextareaFieldProps extends TextareaAutosizeProps {
	name: string;
	label?: string;
	isRequire?: boolean;
	direction?: 'row' | 'column';
	className?: string;
}

export const TextareaField = React.forwardRef(function TextareaField(
	{ name, label, isRequire, direction, className, ...props }: TextareaFieldProps,
	ref: React.Ref<HTMLTextAreaElement>,
) {
	const { register } = useFormContext();

	return (
		<CommonFieldWrapper name={name} label={label} isRequire={isRequire} direction={direction}>
			<TextareaAutosize
				{...props}
				{...register(name)}
				ref={ref}
				minRows={6}
				className={clsx(
					'block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
					className,
				)}
			/>
		</CommonFieldWrapper>
	);
});
