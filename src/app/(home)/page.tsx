import { cn } from '@/utils/cn';
// TODO: motion import 최적화
import { getGatherings } from '@/apis/gatherings';
import { getGatheringQuery } from '@/utils/query';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { isValid, parseISO } from 'date-fns';
import Image from 'next/image';
import GatheringSection from './GatheringSection';

export const dynamic = 'force-dynamic';

const LIMIT = 10;

/**
 * 홈 페이지 컴포넌트
 * - 모임 목록을 필터 조건에 따라 조회하고 무한 스크롤로 표시합니다.
 * - React Query의 `useInfiniteQuery`를 사용하여 데이터를 요청하며,
 * - `useDeferredValue`를 통해 필터 변경 시 렌더링 부하를 완화합니다.
 */
export default async function HomePage({
	searchParams
}: {
	searchParams: Promise<{
		type?: string;
		location?: string;
		date?: string;
		sort?: string;
	}>;
}) {
	const { type, location, date, sort } = await searchParams;
	const initialQuery = getGatheringQuery({
		type: type ?? 'DALLAEMFIT',
		location: location ?? null,
		date: date && isValid(parseISO(date)) ? parseISO(date) : null,
		sort: sort ?? 'newest'
	});

	const queryClient = new QueryClient();
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['gatherings', initialQuery],
		queryFn: ({ pageParam = 0 }) => getGatherings(`${initialQuery}&limit=${LIMIT}&offset=${pageParam}`),
		initialPageParam: 0
	});
	console.log('SSR initialQuery:', initialQuery);

	return (
		<div className="mb:px-6 mb:pt-10 pc:max-w-300 pc:px-25 mb:gap-8 bg-root m-auto flex w-full flex-1 flex-col gap-6 px-4 pt-6">
			{/* TODO: 이 부분도 공통 부분으로 컴포넌트 빼도 될듯 */}
			<h1 className="sr-only">Gameow 크루 찾기 페이지</h1>
			<div className="flex gap-4">
				<Image priority src={'/icons/home_cat.svg'} alt={'크루 찾기 이미지'} width={72} height={72} />
				<div className="flex flex-col gap-2">
					<p
						className={cn(
							'text-primary-500 text-sm font-medium',
							'[text-shadow:0_0_1px_#5ff7e6,0_0_0px_#5ff7e6,0_0_0px_#5ff7e6,0_0_2px_#5ff7e6]'
						)}>
						혼자라구요?
					</p>
					<h2
						className={cn(
							'mb:text-2xl text-primary-50 text-lg font-semibold',
							'[text-shadow:0_0_1px_#e6fffa,0_0_0px_#e6fffa,0_0_0px_#e6fffa,0_0_2px_#e6fffa]'
						)}>
						지금 바로 크루에 합류해요⚡
					</h2>
				</div>
			</div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<GatheringSection />
			</HydrationBoundary>
		</div>
	);
}
