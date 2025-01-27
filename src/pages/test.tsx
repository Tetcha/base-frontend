import * as React from 'react';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {
	FormWrapper,
	InputCheckboxGroup,
	InputRadioGroup,
	InputSelectMulti,
	InputSlider,
	InputToggles,
	InputSelect,
} from 'src/components/Input';

import { Option, OptionExtended } from 'src/interface/form';

interface TestPageProps {}

const people = [
	{
		id: 1,
		name: 'Wade Cooper',
		avatar:
			'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 2,
		name: 'Arlene Mccoy',
		avatar:
			'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 3,
		name: 'Devon Webb',
		avatar:
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
	},
	{
		id: 4,
		name: 'Tom Cook',
		avatar:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 5,
		name: 'Tanya Fox',
		avatar:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 6,
		name: 'Hellen Schmidt',
		avatar:
			'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 7,
		name: 'Caroline Schultz',
		avatar:
			'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 8,
		name: 'Mason Heaney',
		avatar:
			'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 9,
		name: 'Claudie Smitham',
		avatar:
			'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 10,
		name: 'Emil Schaefer',
		avatar:
			'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
];

interface TestFormSubmit {
	price: number[];
	number: string;
	person: number;
	persons: number[];
	save: string[];
	gender: string;
	heat: number;
}

const defaultValues = {
	price: [15000, 95000000],
	number: '2',
	person: 1,
	persons: [1, 4, 2],
	save: ['no'],
	gender: '1',
	heat: 20,
};

const TestPage: React.FunctionComponent<TestPageProps> = () => {
	const methods = useForm<TestFormSubmit>({
		defaultValues,
	});

	const handleOnSubmit = async (data: TestFormSubmit) => {
		console.log(data);
	};

	return (
		<div className="flex flex-col w-full h-full min-h-screen p-10 bg-indigo-200">
			<div className="max-w-2xl px-10 py-20 bg-white rounded">
				<FormWrapper methods={methods}>
					<form onSubmit={methods.handleSubmit(handleOnSubmit)} className="space-y-5">
						<InputSlider
							commonField={{
								name: 'price',
								label: 'Price (from "$" to "$$$")',
							}}
							step={10000}
							max={100000000}
							defaultValue={defaultValues.price}
							min={10000}
							valueLabelDisplay={'auto'}
						/>
						<InputSlider
							commonField={{
								direction: 'row',
								name: 'heat',
								label: 'Heat',
							}}
							valueLabelDisplay={'auto'}
						/>

						<InputToggles
							commonField={{
								label: 'is it?',
								name: 'ad',
							}}
							defaultChecked={true}
						/>
						<InputToggles
							commonField={{
								label: 'aye?',
								direction: 'row',
								name: 'aye',
							}}
							defaultChecked={false}
						/>
						<InputToggles
							commonField={{
								label: 'Disable',
								name: 'disable',
								direction: 'row',
							}}
							defaultChecked={true}
							disabled={true}
						/>

						<p className="font-semibold">For single select, label will appear when selected</p>

						<InputSelect<string, string>
							commonField={{
								label: 'Select "number" (default value is "2")',
								name: 'number',
							}}
							options={[
								{ value: '1', label: '1' },
								{ value: '2', label: '2' },
								{ value: '3', label: '3' },
							]}
						/>

						<InputSelect<number, React.ReactNode>
							commonField={{
								label: 'label="Select Persons provide array of {value, label}"',
								name: 'person',
							}}
							options={
								people.map((person) => ({
									value: person.id,
									label: (
										<div className="flex items-center gap-2">
											<LazyLoadImage
												src={person.avatar}
												className="w-6 h-6 rounded-full"
												alt={person.name}
											/>
											<span>{person.name}</span>
										</div>
									),
								})) as Option[]
							}
						/>

						<p className="font-semibold">
							For multi select,we need provide name and the name will appear when selected, label
							only render in optional
						</p>

						<InputSelectMulti<string, string>
							commonField={{
								label: 'Select Persons provide array of {value, label, name}',
								name: 'numbers',
							}}
							options={[
								{ value: '1', label: '1', name: '1' },
								{ value: '2', label: '2', name: '2' },
								{ value: '3', label: '3', name: '3' },
							]}
						/>

						<InputSelectMulti<string, React.ReactNode>
							commonField={{
								label: 'Select Persons provide array of {value, label, name}',
								name: 'persons',
							}}
							options={
								people.map((person) => ({
									value: person.id,
									label: (
										<div className="flex items-center gap-2">
											<LazyLoadImage
												src={person.avatar}
												className="w-6 h-6 rounded-full"
												alt={person.name}
											/>
											<span>{person.name}</span>
										</div>
									),
									name: person.name,
								})) as OptionExtended[]
							}
						/>

						<InputRadioGroup<string>
							commonField={{
								name: 'gender',
								label: "Đức thua kèo có ghệ 2022 thì phải chung kèo không? (default value is '1')",
							}}
							options={[
								{
									label: 'Yes',
									value: '0',
								},
								{
									label: 'Right side but yes',
									value: '1',
								},
							]}
						/>
						<InputCheckboxGroup<string>
							commonField={{
								name: 'save',
								label: 'Save me in this site',
							}}
							options={[
								{ label: 'Yes', value: 'yes' },
								{ label: 'Unbloody save', value: 'no' },
							]}
						/>

						<button
							type="submit"
							className="flex justify-center px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-600 hover:to-blue-700"
						>
							Submit
						</button>
					</form>
				</FormWrapper>
			</div>
		</div>
	);
};

export default TestPage;
