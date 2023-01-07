import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckIcon } from '@heroicons/react/20/solid';
import { MultiSelectUnstyledProps, OptionUnstyled } from '@mui/base';
import MultiSelectUnstyled from '@mui/base/MultiSelectUnstyled';
import clsx from 'clsx';

import CommonFieldWrapper from './CommonFieldWrapper';
import { CommonFieldProps, OptionExtended } from 'src/interface/form';

interface InputSelectMultiProps<Label, Value> extends MultiSelectUnstyledProps<any> {
	commonField: CommonFieldProps;
	options?: OptionExtended<Label, Value>[];
}

export function InputSelectMulti<Label, Value>({
	options,
	commonField,
	...props
}: InputSelectMultiProps<Label, Value>) {
	const { setValue, control, getValues } = useFormContext();
	const [value, setSelected] = React.useState<Value[]>(props.defaultValue || []);
	const [appearance, setAppearance] = React.useState<string>('');

	const { name } = commonField;

	React.useEffect(() => {
		if (name) {
			const formValue = getValues(name);
			if (formValue && formValue.length) {
				setSelected(formValue);
			}
		}
	}, []);

	React.useEffect(() => {
		if (name) {
			setValue(name, value);
		}
	}, [value]);

	const handleOnchange = (selectValue: any[]) => {
		if (options) {
			setSelected(selectValue);
		}
	};

	React.useEffect(() => {
		if (!options) {
			return;
		}

		const selectNames = options.filter((option) => value.includes(option.value));
		setAppearance(selectNames.map((option) => option.name).join(', '));
	}, [value]);

	return (
		<CommonFieldWrapper {...commonField}>
			<Controller
				name={name}
				control={control}
				defaultValue={value}
				render={() => (
					<MultiSelectUnstyled
						onChange={(event, selectValue) => handleOnchange(selectValue)}
						slotProps={{
							root: {
								className:
									'relative w-full cursor-default text-black h-10 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm',
							},
							listbox: {
								className:
									'absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
							},
							popper: {
								className: ' w-full block relative z-10',
							},
						}}
						{...props}
						renderValue={() => appearance}
					>
						{options ? (
							options.map((option) => (
								<OptionUnstyled
									key={`${option.value}`}
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
										<>{option.label}</>
										{/* Check icon */}
										{value.includes(option.value) ? (
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
					</MultiSelectUnstyled>
				)}
			/>
		</CommonFieldWrapper>
	);
}
