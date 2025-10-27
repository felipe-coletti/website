import { forwardRef } from 'react'
import type { InfiniteScrollProps } from './InfiniteScroll.types'
import styles from './InfiniteScroll.module.css'
import { Text } from '../../../components'

export const InfiniteScroll = forwardRef<HTMLDivElement, InfiniteScrollProps>(({ children, hasMore }, ref) => {
	return (
		<div className={styles.container}>
			{children}
			<div ref={ref} className='message'>
				<Text>{hasMore ? 'Loading...' : 'You have reached the end.'}</Text>
			</div>
		</div>
	)
})
