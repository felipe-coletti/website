import { useState } from 'react'
import { Heading, PageWrapper } from '../../components'
import type { PostType } from '../../types/post'
import { PostGallery } from '../../components/Organisms/PostGallery'

export const Home = () => {
	const [latestPosts, setLatestPosts] = useState<PostType[]>([])

	return (
		<PageWrapper className='page-list'>
			<Heading>Welcome</Heading>
			{latestPosts.length > 0 && (
				<>
					<Heading size='small'>Latest blog posts</Heading>
					<PostGallery posts={latestPosts} />
				</>
			)}
		</PageWrapper>
	)
}
