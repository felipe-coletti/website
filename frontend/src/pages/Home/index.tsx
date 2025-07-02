import { useState } from 'react'
import styles from './styles.module.css'
import { Heading, PageWrapper } from '../../components'
import type { PostType } from '../../types/post'
import { PostGallery } from '../../components/Organisms/PostGallery'

export const Home = () => {
	const [latestPosts, setLatestPosts] = useState<PostType[]>([])

	return (
		<PageWrapper className={styles.container}>
			<section className='section'>
				<Heading as='h1'>Welcome</Heading>
			</section>
			{latestPosts.length > 0 && (
				<section className='section'>
					<Heading as='h2' size='small'>
						Latest blog posts
					</Heading>
					<PostGallery posts={latestPosts} />
				</section>
			)}
		</PageWrapper>
	)
}
