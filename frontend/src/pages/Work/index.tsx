import { ProjectGallery, PageTemplate } from '../../components'
import type { ProjectType } from '../../types/project'

const fetchProjects = async (page: number, query: string): Promise<ProjectType[]> => {
	const res = await fetch(`/api/work?page=${page}&query=${encodeURIComponent(query)}`)
	if (!res.ok) return []
	const data = await res.json()
	return data || []
}

export const Work = () => {
	return (
		<PageTemplate title='Work' placeholder='Search' fetchItems={fetchProjects}>
			{(items: ProjectType[]) => <ProjectGallery projects={items} />}
		</PageTemplate>
	)
}
