import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#2196F3',
			light: '#00838F',
		},
		text: {
			primary: '#000000',
			secondary: '#4F4F4F',
			disabled: '#828282',
		},
		background: {
			default: '#FFFFFF',
			paper: '#F2F2F2',
		},
	},
	typography: {
		button: {
			fontWeight: 500,
			fontSize: '15px',
			lineHeight: '26px',
			letterSpacing: '0.46px',
		},
		h3: {
			fontSize: '48px',
			fontWeight: 400,
			letterSpacing: '0',
		},
		h4: {
			fontSize: '46px',
			fontWeight: 400,
			letterSpacing: '0.17px',
		},
		h5: {
			fontSize: '32px',
			lineHeight: '40px',
			fontWeight: 400,
			letterSpacing: '0',
		},
		body2: {
			fontSize: '14px',
			fontWeight: 400,
			letterSpacing: '0.17px',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '4px',
					padding: '8px 22px',
					height: '42px'
				}
			}
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiInputBase-root': {
						height: 42,
						borderRadius: '4px',
					},
					'& .MuiInputBase-input::placeholder': {
						color: '#828282',
						opacity: 1,
						fontStyle: 'italic',
					},
					'& .MuiInputBase-input': {
						padding: '9px 16px',
						fontFamily: 'Roboto',
						fontSize: '14px',
						lineHeigt: '24px',
					},
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					background: 'transparent',
					borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					'--mui-palette-TableCell-border': 'rgba(0, 0, 0, 0.12)',
					borderBottom: 'var(--mui-palette-TableCell-border) solid 1px',
					backgroundColor: 'var(--mui-palette-background-default)',
					padding: '16px 10px',

					'& .MuiTableSortLabel-root': {
						lineHeight: '24px',
					},
				},
			},
		},
	},
	cssVariables: true,
});

export default theme;
