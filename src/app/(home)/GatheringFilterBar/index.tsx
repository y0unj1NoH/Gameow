'use client';

import GatheringTabs from '@/app/(home)/GatheringTabs';
import SearchCalendar from '@/app/(home)/SearchCalendar';

import SelectBox from '@/components/commons/SelectBox';
import SortButton from '@/components/commons/SortButton';
import { GENRE_OPTIONS, SORT_OPTIONS } from '@/constants/options';

import { useCallback } from 'react';
import CreateGatheringButton from '../CreateGatheringButton';

export interface FilterCriteria {
	/** 선택된 모임 유형 */
	type: string;
	/** 선택된 지역 */
	location: string | number;
	/** 선택된 날짜 (선택되지 않을 수도 있음) */
	date?: Date;
	/** 선택된 정렬 기준 */
	sort: string;
}

interface GatheringFilterBarProps {
	/** 현재 필터 조건 */
	filterCriteria: FilterCriteria;
	/** 필터 조건 변경 핸들러 */
	onFilterChange: (criteria: Partial<FilterCriteria>) => void;
}

/**
 * 모임 목록 상단의 필터 바 컴포넌트
 * 유형, 지역, 날짜, 정렬 옵션을 선택해 모임 목록을 필터링합니다.
 * 또한 ‘모임 만들기’ 버튼을 통해 모임 생성 모달을 엽니다.
 *
 * @param {GatheringFilterBarProps} props - 필터 조건 갱신 함수를 포함한 props
 */
export default function GatheringFilterBar({ filterCriteria, onFilterChange }: GatheringFilterBarProps) {
	const handleTypeChange = useCallback((type: string) => {
		onFilterChange({ type });
	}, []);

	const handleLocationChange = useCallback((location: string | number) => {
		onFilterChange({ location });
	}, []);

	const handleDateChange = useCallback((date?: Date) => {
		onFilterChange({ date });
	}, []);

	const handleSortChange = useCallback((sort: string | number) => {
		onFilterChange({ sort: String(sort) });
	}, []);

	return (
		<div className="flex w-full flex-col gap-4">
			<GatheringTabs onTypeChange={handleTypeChange} button={<CreateGatheringButton />} />
			<hr className="bg-primary-500 h-[px] border-0" />

			<div className="flex w-full justify-between">
				<div className="flex gap-2">
					<SelectBox
						options={GENRE_OPTIONS}
						placeholder="장르 전체"
						defaultValue={String(filterCriteria.location)}
						onChange={handleLocationChange}
					/>
					<SearchCalendar date={filterCriteria.date} onDateChange={handleDateChange} />{' '}
				</div>
				<SortButton options={SORT_OPTIONS} defaultValue={filterCriteria.sort} onChange={handleSortChange} />
			</div>
		</div>
	);
}
