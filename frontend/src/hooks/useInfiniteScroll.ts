import { useEffect } from 'react'

type UseInfiniteScrollProps = {
    sentinelRef: React.RefObject<HTMLDivElement | null>
    onLoadMore: () => void
    canLoadMore?: boolean
    rootMargin?: string
}

export const useInfiniteScroll = ({
    sentinelRef,
    onLoadMore,
    canLoadMore = true,
    rootMargin = '100px'
}: UseInfiniteScrollProps) => {
    useEffect(() => {
        const sentinel = sentinelRef.current
        if (!sentinel || !canLoadMore) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && canLoadMore) {
                    onLoadMore()
                }
            },
            { rootMargin }
        )

        observer.observe(sentinel)

        return () => {
            if (sentinel) observer.unobserve(sentinel)
        }
    }, [sentinelRef, onLoadMore, canLoadMore, rootMargin])
}
