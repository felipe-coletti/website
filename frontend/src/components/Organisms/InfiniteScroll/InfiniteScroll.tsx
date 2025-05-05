import { forwardRef } from 'react'
import styles from './styles.module.css'
import { Text } from '@/components'

type InfiniteScrollProps = {
    children: React.ReactNode
    hasMore: boolean
}

export const InfiniteScroll = forwardRef<HTMLDivElement, InfiniteScrollProps>(({ children, hasMore }, ref) => {
    return (
        <div className={styles.container}>
            {children}
            <div ref={ref} className='end-message'>
                <Text>{hasMore ? 'Loading...' : 'You have reached the end.'}</Text>
            </div>
        </div>
    )
})
