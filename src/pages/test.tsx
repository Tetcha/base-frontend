import * as React from 'react';
import { useForm } from 'react-hook-form';

import { FormWrapper, InputSlider } from 'src/components/Input';
import { InputToggles } from 'src/components/Input/InputToggles';

interface TestPageProps {}

const TestPage: React.FunctionComponent<TestPageProps> = () => {
	const methods = useForm();

	const handleOnSubmit = async (data: any) => {
		console.log(data);
	};

	return (
		<div className="flex flex-col w-full h-full min-h-screen p-10 bg-indigo-200">
			<div className="max-w-2xl px-10 py-20 bg-white rounded">
				<FormWrapper methods={methods}>
					<form onSubmit={methods.handleSubmit(handleOnSubmit)} className="space-y-5">
						<InputSlider
							name="Price"
							label='Price (from "$" to "$$$")'
							defaultValue={[10000, 100000000]}
							step={10000}
							max={100000000}
							min={10000}
							valueLabelDisplay={'auto'}
						/>
						<InputSlider
							direction="row"
							name="Heat"
							label="Heat"
							defaultValue={1}
							valueLabelDisplay={'auto'}
						/>

						<InputToggles label="is it?" name="ad" defaultChecked={true} />
						<InputToggles label="aye?" direction="row" name="aye" defaultChecked={false} />
						<InputToggles
							label="Disable"
							name={'disable'}
							direction="row"
							defaultChecked={true}
							disabled={true}
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
