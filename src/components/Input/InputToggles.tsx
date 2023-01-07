import { useState } from 'react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';

import CommonFieldWrapper from './CommonFieldWrapper';
import { CommonFieldProps } from 'src/interface/form';

interface InputTogglesProps {
	defaultChecked?: boolean | undefined;
	onChange?(checked: boolean): void;
	commonField: CommonFieldProps;
	disabled?: boolean;
}

export const InputToggles: React.FunctionComponent<InputTogglesProps> = ({
	defaultChecked,
	onChange,
	commonField,
	disabled = false,
}) => {
	const { setValue, register } = useFormContext();
	const { name } = commonField;

	const [enabled, setEnabled] = useState<boolean>(defaultChecked || false);

	const handleChange = (checked: boolean) => {
		setEnabled(checked);

		// if using onChange to get the value but inside FormWrapper
		if (onChange) {
			onChange(checked);
		}

		// if using react hook form

		if (name) {
			setValue(name, checked);
		}
	};

	React.useEffect(() => {
		// Register the field with react hook form if name is provided

		if (name) {
			register(name);
			setValue(name, enabled);
		}
	}, []);

	return (
		<CommonFieldWrapper {...commonField}>
			<Switch
				onChange={handleChange}
				disabled={disabled}
				defaultChecked={defaultChecked}
				className={clsx(
					enabled ? 'bg-indigo-600' : ' bg-gray-200',
					'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
				)}
			>
				<span className="sr-only">Use setting</span>
				<span
					aria-hidden="true"
					className={clsx(
						enabled ? 'translate-x-5' : 'translate-x-0',
						'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
					)}
				/>
			</Switch>
		</CommonFieldWrapper>
	);
};
