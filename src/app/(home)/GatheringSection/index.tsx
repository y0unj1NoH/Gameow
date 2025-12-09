'use client';

import GatheringFilterBar from '@/app/(home)/GatheringFilterBar';
import { getGatheringQuery } from '@/utils/query';
import { parseAsIsoDate, parseAsStringLiteral, useQueryState } from 'nuqs';
// TODO: motion import 최적화
import { useInfiniteGatheringsQuery } from '@/hooks/useInfiniteGatheringsQuery';
import { Gathering } from '@/types/response/gatherings';
import * as motion from 'motion/react-client';
import { useCallback, useMemo } from 'react';
import CardList from '../CardList';
import CardSkeleton from '../CardSkeleton';

const SKELETON_ITEMS = Array.from({ length: 10 }, (_, i) => i);
const SORT_VALUE = ['newest', 'deadlineSoon', 'manyParticipants'] as const;
type SortValue = (typeof SORT_VALUE)[number];

export default function GatheringSection() {
	const [type, setType] = useQueryState('type', {
		defaultValue: 'DALLAEMFIT',
		history: 'push',
		clearOnDefault: false
	});
	const [location, setLocation] = useQueryState('location', {
		history: 'push',
		clearOnDefault: false
	});
	const [date, setDate] = useQueryState('date', parseAsIsoDate.withOptions({ history: 'push', clearOnDefault: false }));
	const [sort, setSort] = useQueryState(
		'sort',
		parseAsStringLiteral(SORT_VALUE).withDefault('newest').withOptions({ history: 'push', clearOnDefault: false })
	);

	const handleTypeChange = useCallback(
		(_type: string) => {
			if (type !== _type) {
				setType(_type);
			}
		},
		[type]
	);

	const handleLocationChange = useCallback(
		(_location: string | number) => {
			setLocation((_location as string) ?? null);
		},
		[location]
	);

	const handleDateChange = useCallback((_date: Date | null) => {
		setDate(_date);
	}, []);

	const handleSortChange = useCallback((_sort: string | number) => {
		setSort(String(_sort) as SortValue);
	}, []);

	const queryString = useMemo(
		() =>
			getGatheringQuery({
				type: type,
				location: location,
				date: date,
				sort: sort
			}),
		[type, location, date, sort]
	);

	const { data, isLoading, ref, hasData, isEmpty } = useInfiniteGatheringsQuery(queryString);

	return (
		<div className="mb:gap-6 flex flex-1 flex-col gap-4">
			<GatheringFilterBar
				defaultType={type}
				onTypeChange={handleTypeChange}
				defaultLocation={location}
				onLocatioChange={handleLocationChange}
				date={date}
				onDateChange={handleDateChange}
				defaultSort={sort}
				onSortChange={handleSortChange}
			/>
			{hasData && (
				<>
					<CardList gatherings={data as Gathering[]} />
					<div ref={ref} />
				</>
			)}
			{isLoading && (
				<div className="flex flex-col gap-6">
					{SKELETON_ITEMS.map(i => (
						<CardSkeleton key={i} />
					))}
				</div>
			)}
			{isEmpty && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{
						duration: 0.4
					}}
					className="flex flex-1 flex-col items-center justify-center text-sm font-medium text-gray-500">
					<p>아직 크루가 없어요,</p>
					<p>지금 바로 크루를 만들어보세요</p>
				</motion.div>
			)}
		</div>
	);
}
