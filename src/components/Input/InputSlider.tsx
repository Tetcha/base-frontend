import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import SliderUnstyled, { SliderUnstyledProps } from '@mui/base/SliderUnstyled';

import CommonFieldWrapper from './CommonFieldWrapper';

interface InputSliderProps extends SliderUnstyledProps {
	name: string;
	label?: string;
	isRequire?: boolean;
	direction?: 'row' | 'column';
}

export const InputSlider = React.forwardRef(function Slider(
	props: InputSliderProps,
	ref: React.ForwardedRef<HTMLSpanElement>,
) {
	const { setValue, register } = useFormContext();

	const [input, setInput] = React.useState<number | number[]>(0);

	React.useEffect(() => {
		register(props.name);
	}, []);

	React.useEffect(() => {
		setValue(props.name, input);
	}, [input]);

	return (
		<CommonFieldWrapper
			name={props.name}
			label={props.label}
			isRequire={props.isRequire}
			direction={props.direction}
		>
			<SliderUnstyled
				{...props}
				onChange={(_, newValue) => {
					setInput(newValue);
				}}
				ref={ref}
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
});
