'use client';

import { Repository } from '@/store/githubApi';
import { formatDateToLocalString } from '@/utills/formatDate';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Close from '@mui/icons-material/Close';
import Star from '@mui/icons-material/Star';
import ForkRight from '@mui/icons-material/ForkRight';
import OpenInNew from '@mui/icons-material/OpenInNew';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from './SidePanelContent.module.scss';

interface SidePanelContentProps {
	selectedRepository: Repository | null;
	handleClose: () => void;
}

export default function SidePanelContent({
	selectedRepository,
	handleClose,
}: SidePanelContentProps) {
	const isDesktop = useMediaQuery('(min-width: 1200px)');

	return (
		<Box component='div' className={styles.content} bgcolor='background.paper'>
			{selectedRepository ? (
				<Box className={styles.repo__container}>
					<Box className={styles.owner__container}>
						<Avatar
							src={selectedRepository.owner.avatarUrl}
							alt={selectedRepository.owner.login}
							className={styles.owner__avatar}
						/>
						<Typography variant='body2' color='text.secondary'>
							{selectedRepository.owner.login}
						</Typography>
						{!isDesktop && (
							<IconButton className={styles.close} onClick={handleClose}>
								<Close />
							</IconButton>
						)}
					</Box>

					<Typography variant='h5'>{selectedRepository.name}</Typography>

					{selectedRepository.description && (
						<Typography variant='body1' color='text.secondary'>
							{selectedRepository.description}
						</Typography>
					)}

					<Box className={styles.info__container}>
						<Box className={styles.info__stat}>
							<Star fontSize='small' />
							<Typography variant='body2'>{selectedRepository.stargazerCount}</Typography>
						</Box>
						<Box className={styles.info__stat}>
							<ForkRight fontSize='small' />
							<Typography variant='body2'>{selectedRepository.forkCount}</Typography>
						</Box>
					</Box>

					<Box className={styles.metadata__container}>
						{selectedRepository.primaryLanguage && (
							<Box className={styles.metadata__item}>
								<Typography variant='body2' color='text.secondary'>
									Язык:
								</Typography>
								<Chip
									label={selectedRepository.primaryLanguage.name}
									size='small'
									className={styles.languageChip}
									style={
										{ '--chip-bg': selectedRepository.primaryLanguage.color } as React.CSSProperties
									}
								/>
							</Box>
						)}

						{selectedRepository.licenseInfo && (
							<Box className={styles.metadata__item}>
								<Typography variant='body2' color='text.secondary'>
									Лицензия:
								</Typography>
								<Chip label={selectedRepository.licenseInfo.name} size='small' variant='outlined' />
							</Box>
						)}

						<Box className={styles.metadata__item}>
							<Typography variant='body2' color='text.secondary'>
								Последнее обновление:
							</Typography>
							<Typography variant='body2'>
								{formatDateToLocalString(selectedRepository.updatedAt)}
							</Typography>
						</Box>
					</Box>

					<Button
						variant='contained'
						startIcon={<OpenInNew />}
						component={Link}
						href={selectedRepository.url}
						target='_blank'
						rel='noopener noreferrer'
					>
						Перейти в GitHub
					</Button>
				</Box>
			) : (
				<Typography variant='body1' color='text.secondary'>
					Выберите репозиторий
				</Typography>
			)}
		</Box>
	);
}
