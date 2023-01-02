import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { CheckIcon } from '@heroicons/react/20/solid';
import { OptionUnstyled } from '@mui/base';
import SelectUnstyled, { SelectUnstyledProps } from '@mui/base/SelectUnstyled';
import clsx from 'clsx';

import CommonFieldWrapper from './CommonFieldWrapper';

interface InputSelectProps extends SelectUnstyledProps<any> {
	name: string;
	label?: string;
	isRequire?: boolean;
	direction?: 'row' | 'column';
	options?: Array<{
		value: any;
		label: React.ReactNode;
	}>;
	isMulti?: boolean;
}

export const InputSelect = React.forwardRef(function Slider(
	{ options, name, label, isRequire, direction, isMulti, ...props }: InputSelectProps,
	ref: React.ForwardedRef<HTMLButtonElement>,
) {
	const { setValue, register } = useFormContext();
	const [value, setSelected] = React.useState<any>(null);

	React.useEffect(() => {
		if (name) {
			register(name);
		}
	}, []);

	React.useEffect(() => {
		if (name) {
			setValue(name, value);
		}
	}, [value]);

	return (
		<CommonFieldWrapper name={name} label={label} isRequire={isRequire} direction={direction}>
			<SelectUnstyled
				onChange={(_, selectValue) => setSelected(selectValue)}
				ref={ref}
				slotProps={{
					root: {
						className:
							'relative w-full cursor-default text-black h-10 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm',
					},
					listbox: {
						className:
							'absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
					},
					popper: {
						className: ' w-full block relative z-10',
					},
				}}
				renderValue={() => {
					const selected = options?.find((option) => option.value === value);
					return selected ? selected.label : '';
				}}
				{...props}
			>
				{options ? (
					options.map((option) => (
						<OptionUnstyled
							key={option.value}
							value={option.value}
							slotProps={{
								root: {
									className: clsx(
										'text-gray-900 relative cursor-default select-none py-2 h-10 pl-3 pr-9 hover:bg-indigo-600 hover:text-white',
										{
											'font-semibold': value === option.value,
											'font-normal': value !== option.value,
										},
									),
								},
							}}
						>
							<div className="flex justify-between">
								{option.label}
								{value === option.value ? (
									<span
										className={clsx(
											'text-indigo-600',
											'absolute inset-y-0 right-0 flex items-center pr-4',
										)}
									>
										<CheckIcon className="w-5 h-5" aria-hidden="true" />
									</span>
								) : (
									<></>
								)}
							</div>
						</OptionUnstyled>
					))
				) : (
					<></>
				)}
			</SelectUnstyled>
		</CommonFieldWrapper>
	);
});
