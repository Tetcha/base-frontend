import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import CommonFieldWrapper from './CommonFieldWrapper';
import { InputRadio } from './InputRadio';

interface InputRadioGroupProps {
	name: string;
	label?: string;
	isRequire?: boolean;
	direction?: 'row' | 'column';
	optionsDirection?: 'row' | 'column';
	className?: string;
	options?: Array<{ label: any; value: any }>;
	defaultChecked?: any;
}

export const InputRadioGroup: React.FunctionComponent<InputRadioGroupProps> = ({
	name,
	label,
	isRequire,
	direction,
	optionsDirection = 'row',
	className,
	defaultChecked,
	options,
}) => {
	const { register } = useFormContext();

	React.useEffect(() => {
		register(name);
	}, [name]);

	return (
		<CommonFieldWrapper name={name} label={label} isRequire={isRequire} direction={direction}>
			<div
				className={clsx(
					'flex flex-wrap gap-2',
					{
						'flex-col': optionsDirection === 'column',
					},
					className,
				)}
			>
				{options ? (
					options.map((option) => (
						<InputRadio
							id={`${name}-option-${option.value}`}
							key={`${name}-option-${option.value}`}
							label={option.label}
							value={option.value}
							defaultChecked={option.value === defaultChecked}
							{...register(name)}
						/>
					))
				) : (
					<></>
				)}
			</div>
		</CommonFieldWrapper>
	);
};
