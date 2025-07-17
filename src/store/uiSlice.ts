import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Repository, SortField, SortDirection } from './githubApi';

interface UiState {
	selectedRepository: Repository | null;
	searchQuery: string;
	sortField: SortField;
	sortDirection: SortDirection;
	currentPage: number;
	pageSize: number;
}

const initialState: UiState = {
	selectedRepository: null,
	searchQuery: '',
	sortField: 'STARS',
	sortDirection: 'DESC',
	currentPage: 1,
	pageSize: 10,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setSelectedRepository: (state, action: PayloadAction<Repository | null>) => {
			state.selectedRepository = action.payload;
		},
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload;
			state.currentPage = 1;
		},
		setSortField: (state, action: PayloadAction<SortField>) => {
			state.sortField = action.payload;
			state.currentPage = 1;
		},
		setSortDirection: (state, action: PayloadAction<SortDirection>) => {
			state.sortDirection = action.payload;
			state.currentPage = 1;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setPageSize: (state, action: PayloadAction<number>) => {
			state.pageSize = action.payload;
			state.currentPage = 1;
		},
	},
});

export const {
	setSelectedRepository,
	setSearchQuery,
	setSortField,
	setSortDirection,
	setCurrentPage,
	setPageSize,
} = uiSlice.actions;

export default uiSlice.reducer;
