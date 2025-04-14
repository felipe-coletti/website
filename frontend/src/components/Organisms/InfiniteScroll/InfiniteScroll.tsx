'use client'
import { useEffect, useRef, useCallback, useState } from 'react'
import { Text } from '../../Atoms/Text'

type InfiniteScrollProps<T> = {
    items: T[]
    hasMore: boolean
    loadMore: () => Promise<void>
    renderItem: (item: T) => React.ReactNode
}

export function InfiniteScroll<T>({ items, hasMore, loadMore, renderItem }: InfiniteScrollProps<T>) {
    const loaderRef = useRef<HTMLDivElement | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleObserver = useCallback(
        async (entries: IntersectionObserverEntry[]) => {
            const target = entries[0]
            if (target.isIntersecting && hasMore && !isLoading) {
                setIsLoading(true)
                await loadMore()
                setIsLoading(false)
            }
        },
        [hasMore, isLoading, loadMore]
    )

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        }

        const observer = new IntersectionObserver(handleObserver, option)

        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [handleObserver])

    return (
        <>
            {items.map(renderItem)}
            {hasMore ? (
                <div ref={loaderRef}>
                    <Text>Loading...</Text>
                </div>
            ) : (
                items.length > 0 && <Text>You have reached the end.</Text>
            )}
        </>
    )
}
