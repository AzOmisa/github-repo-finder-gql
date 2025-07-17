'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setSelectedRepository } from '@/store/uiSlice';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import SidePanelContent from '@/components/SidePanelContent';

export default function SidePanel() {
	const dispatch = useDispatch();
	const selectedRepository = useSelector((state: RootState) => state.ui.selectedRepository);
	const isDesktop = useMediaQuery('(min-width: 1200px)');

	const handleClose = () => {
		dispatch(setSelectedRepository(null));
	};

	const panelContent = (
		<SidePanelContent selectedRepository={selectedRepository} handleClose={handleClose} />
	);

	if (isDesktop) {
		return panelContent;
	}

	return (
		<Drawer
			anchor='right'
			open={!!selectedRepository}
			onClose={handleClose}
		>
			{panelContent}
		</Drawer>
	);
}
