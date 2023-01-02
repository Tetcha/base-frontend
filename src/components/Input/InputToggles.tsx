import clsx from 'clsx';
import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { useFormContext } from 'react-hook-form';
import * as React from 'react';
import CommonFieldWrapper from './CommonFieldWrapper';

interface InputTogglesProps {
	defaultChecked?: boolean | undefined;
	onChange?(checked: boolean): void;
	name?: string | undefined;
	label?: string;
	isRequire?: boolean;
	direction?: 'row' | 'column';
	disabled?: boolean;
}

export const InputToggles: React.FunctionComponent<InputTogglesProps> = ({
	defaultChecked,
	onChange,
	name,
	label,
	isRequire,
	direction,
	disabled = false,
}) => {
	const { setValue, register } = useFormContext();

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
		<CommonFieldWrapper name={name || ''} label={label} isRequire={isRequire} direction={direction}>
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
