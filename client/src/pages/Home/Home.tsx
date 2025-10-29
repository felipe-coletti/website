import { useState } from 'react'
import type { PostType } from '../../types/post'
import styles from './Home.module.css'
import { Heading, PageWrapper, PostGallery } from '../../components'

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
