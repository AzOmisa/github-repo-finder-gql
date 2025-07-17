import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedRepository } from '@/store/uiSlice';
import { Repository } from '@/store/githubApi';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ForkRight from '@mui/icons-material/ForkRight';
import Star from '@mui/icons-material/Star';
import { formatDate } from '@/utills/formatDate';
import styles from './RepositoryRow.module.scss';

interface RepositoryRowProps {
	repo: Repository;
}

function RepositoryRow({ repo }: RepositoryRowProps) {
  const dispatch = useDispatch();
	const handleRowClick = (repository: Repository) => {
		dispatch(setSelectedRepository(repository));
	};

	return (
		<TableRow key={repo.id} hover onClick={() => handleRowClick(repo)} className={styles.tableRow}>
			<TableCell>
				<Box>
					<Typography variant='subtitle2' className={styles.repoName}>
						{repo.name}
					</Typography>
				</Box>
			</TableCell>
			<TableCell>
				{repo.primaryLanguage && (
					<Chip
						label={repo.primaryLanguage.name}
						size='small'
						className={styles.languageChip}
						style={{ '--chip-bg': repo.primaryLanguage.color } as React.CSSProperties }
					/>
				)}
			</TableCell>
			<TableCell>
				<Box className={styles.countCell}>
					<ForkRight fontSize='small' />
					{repo.forkCount}
				</Box>
			</TableCell>
			<TableCell>
				<Box className={styles.countCell}>
					<Star fontSize='small' />
					{repo.stargazerCount}
				</Box>
			</TableCell>
			<TableCell>{formatDate(repo.updatedAt)}</TableCell>
		</TableRow>
	);
}

const MemoizedRepositoryRow = memo(RepositoryRow);
export default MemoizedRepositoryRow;
