import { ThemeProvider } from './context/ThemeContext'
import { Header } from './components'
import { AppRoutes } from './routes'

function App() {
	return (
		<ThemeProvider>
			<Header />
			<AppRoutes />
		</ThemeProvider>
	)
}

export default App
