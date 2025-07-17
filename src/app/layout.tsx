'use client';

import { Roboto } from 'next/font/google';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from '@/store/store';
import theme from './theme';
import './globals.scss';

const roboto = Roboto({ subsets: ['latin'] });


export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={roboto.className}>
				<Provider store={store}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						{children}
					</ThemeProvider>
				</Provider>
			</body>
		</html>
	);
}
