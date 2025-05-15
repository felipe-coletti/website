import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import { Header } from './components'
import { AppRoutes } from './routes'

function App() {
	return (
		<ThemeProvider>
			<div className='container'>
				<Header />
				<AppRoutes />
			</div>
		</ThemeProvider>
	)
}

export default App
