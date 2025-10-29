import { useTheme } from '../../../context/ThemeContext'
import { Button } from '../../Atoms'

export function ThemeToggle() {
	const { theme, cycleTheme } = useTheme()

	const label = {
		light: 'Light',
		dim: 'Dim',
		dark: 'Dark'
	}

	return (
		<Button variant='ghost' onClick={cycleTheme} aria-label='Toggle Theme'>
			{label[theme]}
		</Button>
	)
}
