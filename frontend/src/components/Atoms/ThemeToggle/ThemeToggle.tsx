import { useTheme } from '../../../context/ThemeContext'

export function ThemeToggle() {
	const { theme, cycleTheme } = useTheme()

	const label = {
		light: 'Light',
		dim: 'Dim',
		dark: 'Dark'
	}

	return (
		<button onClick={cycleTheme} aria-label='Toggle Theme'>
			{label[theme]}
		</button>
	)
}
