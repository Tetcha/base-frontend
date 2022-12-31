import * as React from 'react';
import { InputSlider } from 'src/components/Input';

interface TestPageProps {}

const TestPage: React.FunctionComponent<TestPageProps> = () => {
	return (
		<div className="flex flex-col w-full h-full min-h-screen p-4 bg-red-400">
			<InputSlider label="Heat" />
		</div>
	);
};

export default TestPage;
