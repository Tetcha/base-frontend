import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import SliderUnstyled, { SliderUnstyledProps } from '@mui/base/SliderUnstyled';

import CommonFieldWrapper from './CommonFieldWrapper';
import { CommonFieldProps } from 'src/interface/form';

interface InputSliderProps extends SliderUnstyledProps {
	commonField: CommonFieldProps;
}

export function InputSlider({ commonField, ...props }: InputSliderProps) {
	const { setValue, register } = useFormContext();
	const { name } = commonField;

	const [input, setInput] = React.useState<number | number[]>(props.defaultValue || 0);

	React.useEffect(() => {
		register(name);
	}, []);

	React.useEffect(() => {
		setValue(name, input);
	}, [input]);

	return (
		<CommonFieldWrapper {...commonField}>
			<SliderUnstyled
				{...props}
				onChange={(_, newValue) => {
					setInput(newValue);
				}}
				slotProps={{
					valueLabel: { className: 'absolute text-sm -bottom-5 font-medium' },
					thumb: {
						className:
							'ring-cyan-500 dark:ring-cyan-400 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute',
					},
					root: { className: 'w-full relative inline-block h-2 cursor-pointer' },
					rail: {
						className: 'bg-slate-100 dark:bg-slate-700 h-2 w-full rounded-full block absolute',
					},
					track: { className: 'bg-cyan-500 dark:bg-cyan-400 h-2 absolute rounded-full' },
				}}
			/>
		</CommonFieldWrapper>
	);
}
