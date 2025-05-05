'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import styles from './styles.module.css'
import { PageListProps } from './PageList.types'
import { Heading, Input, InfiniteScroll, Text } from '@/components'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export const PageList = <T,>({ title, placeholder, fetchItems, children }: PageListProps<T>) => {
    const [query, setQuery] = useState('')
    const [items, setItems] = useState<T[]>([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const sentinelRef = useRef<HTMLDivElement>(null)

    const loadItems = useCallback(async () => {
        if (isLoading || isError) return
        setIsLoading(true)
        try {
            const newItems = await fetchItems(page, query)
            if (newItems.length === 0) {
                setHasMore(false)
                return
            }
            setItems((prev) => [...prev, ...newItems])
        } catch {
            setIsError(true)
            setHasMore(false)
        } finally {
            setIsLoading(false)
        }
    }, [fetchItems, page, query, isLoading, isError])

    useEffect(() => {
        setItems([])
        setPage(0)
        setHasMore(true)
        setIsError(false)
    }, [query])

    useEffect(() => {
        if (hasMore && !isError) {
            loadItems()
        }
    }, [page, hasMore, isError, loadItems])

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }, [])

    const loadMore = () => {
        if (hasMore && !isError && !isLoading) {
            setPage((prev) => prev + 1)
        }
    }

    useInfiniteScroll({
        sentinelRef,
        onLoadMore: loadMore,
        canLoadMore: hasMore && !isError && !isLoading
    })

    let message = ''

    if (isLoading) {
        message = 'Loading...'
    } else if (isError) {
        message = 'Failed to load content'
    } else if (items.length === 0) {
        message = 'Empty list'
    }

    return (
        <div className={styles.pageLayout}>
            <Heading>{title}</Heading>
            <Input value={query} onChange={handleSearch} placeholder={placeholder} />
            {message ? (
                <div className='end-message'>
                    <Text>{message}</Text>
                </div>
            ) : (
                <InfiniteScroll hasMore={hasMore} ref={sentinelRef}>
                    {children(items)}
                </InfiniteScroll>
            )}
        </div>
    )
}
