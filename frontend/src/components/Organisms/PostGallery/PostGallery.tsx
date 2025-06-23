import type { PostGalleryProps } from './PostGallery.types'
import styles from './styles.module.css'
import { PostCard } from '../../Molecules/PostCard'
import { formatDate, formatReadingTime } from '../../../utils/formaters'

export const PostGallery = ({ posts }: PostGalleryProps) => {
	return (
		<div className={styles.postGallery}>
			{posts.map(post => (
				<PostCard
					key={post.slug}
					date={`${formatDate(post.date)} • ${formatReadingTime(post.readingTime)}`}
					title={post.title}
					href={`/blog/${post.slug}`}
				/>
			))}
		</div>
	)
}
