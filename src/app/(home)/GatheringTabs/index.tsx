'use client';

import Chip from '@/components/commons/Chip';
import Tab from '@/components/commons/Tab';
import { SUB_TYPE_OPTIONS, TYPE_OPTIONS } from '@/constants/options';
import { useLayoutEffect, useMemo, useState } from 'react';

const getDefaultType = (defaultValue: string): string => {
	if (defaultValue === 'OFFICE_STRETCHING' || defaultValue === 'MINDFULNESS') return 'DALLAEMFIT';
	return defaultValue;
};

interface GatheringTabsProps {
	/** 디폴트 타입 (url 기준) */
	defaultValue: string;
	/** 타입 변경 핸들러 */
	onTypeChange: (type: string) => void;
	/** 탭 오른쪽에 표시할 버튼 요소 (예: '모임 만들기' 버튼) */
	button: React.ReactNode;
}

// TODO: 하드 코딩 수정
/**
 * 모임 유형 및 세부 유형(서브 타입)을 선택할 수 있는 탭 컴포넌트
 * 상위 컴포넌트로 선택된 타입을 전달하며, 특정 타입 선택 시 하위 옵션(Chip)을 표시합니다.
 *
 * @param {GatheringTabsProps} props - 선택된 타입을 업데이트하는 함수와 버튼 요소를 포함한 props
 */
export default function GatheringTabs({ defaultValue, onTypeChange, button }: GatheringTabsProps) {
	const [type, setType] = useState<string>(getDefaultType(defaultValue));
	const [subType, setSubType] = useState<string>(defaultValue);

	const selectedType = useMemo(() => {
		if (type === 'DALLAEMFIT') {
			return subType || 'DALLAEMFIT';
		}
		return type;
	}, [type, subType]);

	useLayoutEffect(() => {
		onTypeChange(selectedType);
	}, [selectedType]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<Tab
					options={TYPE_OPTIONS}
					selectedTab={type}
					onTabChange={value => {
						setType(value);
						if (value === 'WORKATION') setSubType('DALLAEMFIT');
					}}
				/>
				{button}
			</div>
			{/* TODO: Activity로 변경 */}
			<div className="flex gap-2">
				{type === 'DALLAEMFIT' ? (
					SUB_TYPE_OPTIONS.map(({ value, text, icon }) => (
						<Chip
							key={value}
							text={text}
							isActive={subType === value}
							imgUrl={icon}
							onClick={() => {
								setSubType(value as string);
							}}
						/>
					))
				) : (
					<Chip text={'전체'} isActive={true} />
				)}
			</div>
		</div>
	);
}
