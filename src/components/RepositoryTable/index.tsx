'use client';

import { Repository } from '@/store/githubApi';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TableHead from '@/components/TableHead';
import RepositoryRow from '@/components/RepositoryRow';
import styles from './RepositoryTable.module.scss';

interface RepositoryTableProps {
	repositories?: Repository[];
}

export default function RepositoryTable({ repositories }: RepositoryTableProps) {
	return (
		<TableContainer component={Paper} className={styles.tableContainer}>
			<Table stickyHeader>
				<TableHead />
				<TableBody>
					{repositories?.map((repo) => (
						<RepositoryRow repo={repo} key={repo.id} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
