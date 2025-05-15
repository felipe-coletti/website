import { Route, Routes } from 'react-router-dom'
import { About } from '../pages/About'
import { Blog } from '../pages/Blog'
import { Contact } from '../pages/Contact'
import { NotFound } from '../pages/NotFound'
import { Work } from '../pages/Work'

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Work />} />
			<Route path='/work' element={<Work />} />
			<Route path='/work/:id' element={<></>} />
			<Route path='/blog' element={<Blog />} />
			<Route path='/blog/:id' element={<></>} />
			<Route path='/about' element={<About />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
