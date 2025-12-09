import ModalContainer from '@/components/commons/ModalContainer';
import { ModalStoreProvider } from '@/providers/ModalProvider';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import GatheringFilterBar from '.';

const meta: Meta<typeof GatheringFilterBar> = {
	title: 'Home/GatheringFilterBar',
	component: GatheringFilterBar,
	tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [type, setType] = useState<string>('WORKATION');
		const [location, setLocation] = useState<string | number | null>(null);
		const [date, setDate] = useState<Date | null>(null);
		const [sort, setSort] = useState<string | number>('newest');

		return (
			<ModalStoreProvider>
				<div className="w-full space-y-4 p-6">
					<GatheringFilterBar
						defaultType={type}
						onTypeChange={setType}
						defaultLocation={location}
						onLocatioChange={setLocation}
						date={date}
						onDateChange={setDate}
						defaultSort={sort as string}
						onSortChange={setSort}
					/>

					<hr />

					<div className="space-y-1 text-sm text-gray-600">
						<p>선택된 타입: {type}</p>
						<p>선택된 장소: {String(location)}</p>
						<p>선택된 날짜: {date ? date.toDateString() : '선택 없음'}</p>
						<p>정렬 기준: {sort}</p>
					</div>
				</div>

				<ModalContainer />
			</ModalStoreProvider>
		);
	}
};
