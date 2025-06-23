import { PageTemplate, PostGallery } from '../../components'
import type { PostType } from '../../types/post'

const fetchPosts = async (page: number, query: string): Promise<PostType[]> => {
	const res = await fetch(`/api/blog?page=${page}&query=${encodeURIComponent(query)}`)
	if (!res.ok) return []
	const data = await res.json()
	return data || []
}

export const Blog = () => {
	return (
		<PageTemplate title='Blog' placeholder='Search' fetchItems={fetchPosts}>
			{(items: PostType[]) => <PostGallery posts={items} />}
		</PageTemplate>
	)
}
