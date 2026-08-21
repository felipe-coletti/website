import { useCallback } from 'react'
import { ProjectGallery, PageTemplate } from '../../components'
import type { ProjectType } from '../../types/project'

export const Work = () => {
	const fetchProjects = useCallback(async (page: number, query: string): Promise<ProjectType[]> => {
		let url = `/api/works`
		
		if (query && query.startsWith('tag:')) {
			const tagSlug = query.replace('tag:', '')
			url = `/api/works?tag=${encodeURIComponent(tagSlug)}`
		}

		const res = await fetch(url)
		if (!res.ok) return []
		return res.json()
	}, [])

	return (
		<PageTemplate title='Work' placeholder='Search' fetchItems={fetchProjects}>
			{(items: ProjectType[]) => <ProjectGallery projects={items} />}
		</PageTemplate>
	)
}
