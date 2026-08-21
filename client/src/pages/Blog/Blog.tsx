import { useCallback } from 'react'
import { PageTemplate, PostGallery } from '../../components'
import type { PostType } from '../../types/post'

export const Blog = () => {
	const fetchPosts = useCallback(async (page: number, query: string): Promise<PostType[]> => {
		let url = `/api/posts`
		
		if (query && query.startsWith('tag:')) {
			const tagSlug = query.replace('tag:', '')
			url = `/api/posts?tag=${encodeURIComponent(tagSlug)}`
		}

		const res = await fetch(url)
		if (!res.ok) return []
		return res.json()
	}, [])

	return (
		<PageTemplate title='Blog' placeholder='Search' fetchItems={fetchPosts}>
			{(items: PostType[]) => <PostGallery posts={items} />}
		</PageTemplate>
	)
}
