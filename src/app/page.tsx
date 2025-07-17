'use client';

import Box from '@mui/material/Box';
import SearchForm from '@/components/SearchForm';
import MainContent from '@/components/MainContent';
import styles from './page.module.scss';

export default function Home() {
	return (
		<>
			<Box className={styles.header} component='header'>
				<SearchForm />
			</Box>
			<MainContent />
			<Box component='footer' className={styles.footer} />
		</>
	);
}
