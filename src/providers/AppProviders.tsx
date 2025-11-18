import ModalContainer from '@/components/commons/ModalContainer';
import { ModalStoreProvider } from '@/providers/ModalProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default function AppProviders({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<NuqsAdapter>
			<ReactQueryProvider>
				<ModalStoreProvider>
					<ModalContainer />
					{children}
				</ModalStoreProvider>
			</ReactQueryProvider>
		</NuqsAdapter>
	);
}
