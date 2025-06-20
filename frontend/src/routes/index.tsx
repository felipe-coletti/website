import { Route, Routes } from 'react-router-dom'
import { About } from '../pages/About'
import { Blog } from '../pages/Blog'
import { Contact } from '../pages/Contact'
import { NotFound } from '../pages/NotFound'
import { Post } from '../pages/Blog/[slug]'
import { Project } from '../pages/Work/[id]'
import { Work } from '../pages/Work'
import { Home } from '../pages/Home'

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
