import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import SearchCalendar from '.';

const meta: Meta<typeof SearchCalendar> = {
	title: 'Home/SearchCalendar',
	component: SearchCalendar,
	parameters: {
		layout: 'centered'
	}
};
export default meta;

type Story = StoryObj<typeof SearchCalendar>;

export const Default: Story = {
	render: () => {
		const [selectedDate, setSelectedDate] = useState<Date | null>(null);

		return <SearchCalendar date={selectedDate} onDateChange={date => setSelectedDate(date)} />;
	}
};

export const WithOnChange: Story = {
	render: () => {
		const [selectedDate, setSelectedDate] = useState<Date | null>(null);

		return (
			<div className="p-4">
				<SearchCalendar
					date={selectedDate}
					onDateChange={date => {
						console.log('선택된 날짜:', date);
						setSelectedDate(date);
					}}
				/>
			</div>
		);
	}
};
