'use client';

import GatheringTabs from '@/app/(home)/GatheringTabs';
import SearchCalendar from '@/app/(home)/SearchCalendar';

import SelectBox from '@/components/commons/SelectBox';
import SortButton from '@/components/commons/SortButton';
import { GENRE_OPTIONS, SORT_OPTIONS } from '@/constants/options';

import CreateGatheringButton from '../CreateGatheringButton';

export interface FilterCriteria {
	/** 선택된 모임 유형 */
	type: string;
	/** 선택된 지역 */
	location: string | number;
	/** 선택된 날짜 (선택되지 않을 수도 있음) */
	date: Date | null;
	/** 선택된 정렬 기준 */
	sort: string;
}

interface GatheringFilterBarProps {
	/** 타입 변경 핸들러 */
	onTypeChange: (type: string) => void;
	/** 장소(장르) 변경 핸들러 */
	onLocatioChange: (location: string | number) => void;
	/** 날짜 */
	date: Date | null;
	/** 날짜 변경 핸들러 */
	onDateChange: (date: Date | null) => void;
	/** 정렬 변경 핸들러 */
	onSortChange: (sort: string | number) => void;
}

// TODO: 각 타입 지저분한거 정리하기 뭐는 undefined고 뭐는 ''이고 쿼리스트링은 또 null임
/**
 * 모임 목록 상단의 필터 바 컴포넌트
 * 유형, 지역, 날짜, 정렬 옵션을 선택해 모임 목록을 필터링합니다.
 * 또한 ‘모임 만들기’ 버튼을 통해 모임 생성 모달을 엽니다.
 *
 * @param {GatheringFilterBarProps} props - 필터 조건 갱신 함수를 포함한 props
 */
export default function GatheringFilterBar({
	onTypeChange,
	onLocatioChange,
	date,
	onDateChange,
	onSortChange
}: GatheringFilterBarProps) {
	return (
		<div className="flex w-full flex-col gap-4">
			<GatheringTabs onTypeChange={onTypeChange} button={<CreateGatheringButton />} />
			<hr className="bg-primary-500 h-[px] border-0" />

			<div className="flex w-full justify-between">
				<div className="flex gap-2">
					<SelectBox options={GENRE_OPTIONS} placeholder="장르 전체" onChange={onLocatioChange} />
					<SearchCalendar date={date} onDateChange={onDateChange} />{' '}
				</div>
				<SortButton options={SORT_OPTIONS} defaultValue="newest" onChange={onSortChange} />
			</div>
		</div>
	);
}
