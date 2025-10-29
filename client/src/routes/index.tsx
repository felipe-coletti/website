import { Route, Routes } from 'react-router-dom'
import { About, Blog, Contact, NotFound, Post, Project, Work, Home } from '../pages'

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/work' element={<Work />} />
			<Route path='/work/:id' element={<Project />} />
			<Route path='/blog' element={<Blog />} />
			<Route path='/blog/:slug' element={<Post />} />
			<Route path='/about' element={<About />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
