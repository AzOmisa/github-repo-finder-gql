'use client';

import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useSearchRepositoriesQuery } from '@/store/githubApi';
import { setCurrentPage } from '@/store/uiSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@/components/Pagination';
import styles from './MainContent.module.scss';
import SidePanel from '@/components/SidePanel';
import RepositoryTable from '@/components/RepositoryTable';
import Feedback from '@/components/Feedback/index.';

export default function MainContent() {
	const dispatch = useDispatch();
	const { searchQuery, sortField, sortDirection, pageSize } = useSelector(
		(state: RootState) => state.ui
	);

	const [cursor, setCursor] = useState<string | undefined>(undefined);
	const { data, error, isLoading, isFetching, isSuccess } = useSearchRepositoriesQuery(
		{
			query: searchQuery,
			first: pageSize,
			sortField,
			sortDirection,
			after: cursor,
		},
		{
			skip: !searchQuery,
		}
	);

	const paginationHandler = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
		setCursor(data?.data.search.pageInfo.endCursor || undefined);
		dispatch(setCurrentPage(page));
	};

	const repositories = useMemo(() => data?.data?.search?.nodes, [data?.data?.search?.nodes]);
	const repositoryCount = useMemo(
		() => data?.data?.search?.repositoryCount,
		[data?.data?.search?.repositoryCount]
	);
	const totalPages = useMemo(
		() => Math.ceil(repositoryCount || 0 / pageSize),
		[pageSize, repositoryCount]
	);

	if (!searchQuery && !data) return <Feedback type='welcome' />;
	if (isLoading || isFetching) return <Feedback type='loading' />;
	if (error) return <Feedback type='error' />;
	if (isSuccess && data.data.search.repositoryCount === 0) return <Feedback type='notFound' />;

	return (
		<Box className={styles.container}>
			<Box component='section' className={styles.section}>
				<Typography variant='h3' color='text.primary'>
					Результаты поиска
				</Typography>
				<RepositoryTable repositories={repositories} />
				<Pagination totalPages={totalPages} paginationHandler={paginationHandler} />
			</Box>
			{repositories && <SidePanel />}
		</Box>
	);
}
