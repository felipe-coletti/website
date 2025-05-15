import { createContext, useState, useEffect, useContext } from 'react'
import styles from '../styles/themes.module.css'

type Theme = 'light' | 'dim' | 'dark'

interface ThemeContextProps {
	theme: Theme
	setTheme: (theme: Theme) => void
	cycleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [theme, setThemeState] = useState<Theme>('dark')

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') as Theme | null
		if (savedTheme) setThemeState(savedTheme)
	}, [])

	useEffect(() => {
		document.body.className = ''
		document.body.classList.add(styles[theme])
		localStorage.setItem('theme', theme)
	}, [theme])

	const setTheme = (newTheme: Theme) => setThemeState(newTheme)

	const cycleTheme = () => {
		const next = theme === 'light' ? 'dim' : theme === 'dim' ? 'dark' : 'light'
		setTheme(next)
	}

	return <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) throw new Error('useTheme must be used within ThemeProvider')
	return context
}
