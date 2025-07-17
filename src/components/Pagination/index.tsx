import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setPageSize } from '@/store/uiSlice';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import styles from './Pagination.module.scss';

interface PaginationProps {
	totalPages: number;
	paginationHandler: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
}
export default function Pagination({
	totalPages,
	paginationHandler,
}: PaginationProps) {
	const { currentPage, pageSize } = useSelector(
		(state: RootState) => state.ui
	);
	const dispatch = useDispatch();	
	const onRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setPageSize(Number(e.target.value)));
	};
	
	return (
		<Box className={styles.pagination}>
			<TablePagination
				count={totalPages}
				page={currentPage}
				onPageChange={paginationHandler}
				onRowsPerPageChange={onRowsPerPageChange}
				rowsPerPage={pageSize}
				component='div'
			/>
		</Box>
	);
}
