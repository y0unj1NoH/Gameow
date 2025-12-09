import { cn } from '@/utils/cn';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext, UseFormRegisterReturn } from 'react-hook-form';
import { OptionType } from './basic/BasicDropbox';
import { DropdownMenu } from './GNB/DropdownMenu';

/**
 * SortButton 컴포넌트의 Props 인터페이스
 */
interface SortButtonProps {
	/** 선택 항목들의 배열 */
	options: OptionType[];
	/** 추가할 커스텀 CSS 클래스명(너비, 높이 등 변경 가능) */
	className?: string;
	/** React Hook Form의 register 객체, 폼 관리시 사용 */
	register?: UseFormRegisterReturn;
	/** 기본 선택값 */
	defaultValue?: string;
	/** 외부로 선택 변경을 알리는 핸들러 */
	onChange?: (value: string | number) => void;
}

/**
 * 정렬 옵션을 선택할 수 있는 드롭다운 버튼 컴포넌트
 */
export default function SortButton({ options, register, defaultValue = '', className, onChange }: SortButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState<string | number>(defaultValue);
	const containerRef = useRef<HTMLDivElement>(null);
	const formContext = useFormContext();
	const currentValue = register?.name ? formContext?.watch(register.name) : defaultValue;

	const selectedOption = useMemo(
		() => options.find(option => (selectedValue ? option.value === selectedValue : option.value === defaultValue)),
		[options, selectedValue, defaultValue]
	);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [isOpen]);

	useEffect(() => {
		if (currentValue !== undefined && currentValue !== null) {
			setSelectedValue(currentValue);
		}
	}, [currentValue]);

	const handleSelect = useCallback(
		(optionValue: string | number) => {
			setSelectedValue(optionValue);
			setIsOpen(false);

			if (register?.onChange) {
				register.onChange({
					target: { name: register.name, value: optionValue }
				});
			}

			if (onChange) {
				onChange(optionValue);
			}
		},
		[register, onChange]
	);

	return (
		<div className="relative" ref={containerRef}>
			<DropdownMenu>
				<DropdownMenu.Trigger>
					<button
						onClick={() => setIsOpen(prev => !prev)}
						className={cn(
							'mb:w-auto mb:px-3 mb:py-2 relative box-border flex w-[36px]',
							'[text-shadow:0_0_4px_#e6fffa,0_0_0px_#e6fffa,0_0_0px_#e6fffa,0_0_40px_#e6fffa]',
							'cursor-pointer items-center justify-between gap-[4px] rounded-[12px] border-2',
							'border-gray-100 p-1.5 text-white',
							`${className}`
						)}>
						<img src="/icons/sort_invert.svg" alt="sort button" className="h-[24px] w-[24px]" />
						<span className="mb:inline font-gray-800 hidden text-[14px]">{selectedOption && selectedOption.text}</span>
					</button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Content options={options} onClick={handleSelect} />
			</DropdownMenu>
		</div>
	);
}
