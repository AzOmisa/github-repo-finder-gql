import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { FEEDBACK_TITLES } from '@/components/Feedback/constants';
import styles from './Feedback.module.scss';

interface FeedbackProps {
	type: 'notFound' | 'error' | 'loading' | 'welcome';
}

export default function Feedback({ type }: FeedbackProps) {
	if (type == 'error') {
		return (
			<Alert severity='error' className={styles.container}>
				{FEEDBACK_TITLES.error}
			</Alert>
		);
	}

	return (
		<Container className={styles.container}>
			<Typography variant='h4' color='text.secondary'>
				{type == 'loading' ? <CircularProgress /> : FEEDBACK_TITLES[type]}
			</Typography>
		</Container>
	);
}
