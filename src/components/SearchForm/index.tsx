'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/store/uiSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styles from './SearchForm.module.scss';

export default function SearchForm() {
	const [query, setQuery] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			dispatch(setSearchQuery(query.trim()));
		}
	};

	return (
		<Box component='form' onSubmit={handleSubmit} className={styles.form}>
			<TextField
				placeholder='Введите поисковый запрос'
				value={query}
				variant='standard'
				onChange={(e) => setQuery(e.target.value)}
				className={styles.searchInput}
			/>
			<Button type='submit' variant='contained'>
				ИСКАТЬ
			</Button>
		</Box>
	);
}
