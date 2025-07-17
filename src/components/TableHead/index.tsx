import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { SortField } from '@/store/githubApi';
import { setSortDirection, setSortField } from '@/store/uiSlice';
import TableRow from '@mui/material/TableRow';
import MTableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { TABLE_HEAD_CELLS } from '@/components/TableHead/constants';

export default function TableHead({}) {
	const { sortDirection, sortField } = useSelector((state: RootState) => state.ui);
	const dispatch = useDispatch();
	const handleSort = (field: SortField) => {
		if (sortField === field) {
			dispatch(setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC'));
		} else {
			dispatch(setSortField(field));
			dispatch(setSortDirection('DESC'));
		}
	};

	return (
		<MTableHead>
			<TableRow>
				{TABLE_HEAD_CELLS.map(({ title, isSort, upperCaseTitle }) => (
					<TableCell key={title}>
						{!isSort ? (
							title
						) : (
							<TableSortLabel
								active={sortField === upperCaseTitle}
								direction={
									sortField === upperCaseTitle
										? (sortDirection.toLowerCase() as 'asc' | 'desc')
										: 'desc'
								}
								onClick={() => handleSort(upperCaseTitle as SortField)}
							>
								{title}
							</TableSortLabel>
						)}
					</TableCell>
				))}
			</TableRow>
		</MTableHead>
	);
}
