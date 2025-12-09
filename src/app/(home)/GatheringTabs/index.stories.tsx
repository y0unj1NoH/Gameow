import BasicButton from '@/components/commons/basic/BasicButton';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import GatheringTabs from '.';

const meta: Meta<typeof GatheringTabs> = {
	title: 'Home/GatheringTabs',
	component: GatheringTabs
};

export default meta;
type Story = StoryObj<typeof GatheringTabs>;

export const Default: Story = {
	render: () => {
		const [selectedType, setSelectedType] = useState<string>('WORKATION'); // 기본 선택값

		return (
			<div className="w-full space-y-4 p-6">
				<GatheringTabs
					defaultValue={selectedType}
					onTypeChange={type => setSelectedType(type)}
					button={<BasicButton>모집 등록</BasicButton>}
				/>

				<div className="text-sm text-gray-500">
					<p>
						선택된 타입: <span className="text-primary-500 font-medium">{selectedType}</span>
					</p>
				</div>
			</div>
		);
	}
};
