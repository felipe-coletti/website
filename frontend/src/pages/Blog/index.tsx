import styles from './styles.module.css'
import { PageTemplate, PostCard } from '../../components'
import { formatDate, formatReadingTime } from '../../utils/formaters'

type PostType = {
	slug: string
	date: string
	readingTime: number
	title: string
}

const fetchPosts = async (page: number, query: string): Promise<PostType[]> => {
	const res = await fetch(`/api/blog?page=${page}&query=${encodeURIComponent(query)}`)
	if (!res.ok) return []
	const data = await res.json()
	return data || []
}

export const Blog = () => {
	return (
		<PageTemplate title='Blog' placeholder='Search' fetchItems={fetchPosts}>
			{(items: PostType[]) => (
				<div className={styles.content}>
					{items.map(post => (
						<PostCard
							key={post.slug}
							date={`${formatDate(post.date)} • ${formatReadingTime(post.readingTime)}`}
							title={post.title}
							href={`/blog/${post.slug}`}
						/>
					))}
				</div>
			)}
		</PageTemplate>
	)
}
