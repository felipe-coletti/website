'use client'
import { useState, useEffect } from 'react'
import { Post, Heading, InfiniteScroll, Input, Text, PageLayout } from '@/components'
import styles from './styles.module.css'
import { formatDate, formatReadingTime } from '@/utils/formaters'
import { render } from '@/utils/render'

type PostItem = {
    id: string
    date: string
    readingTime: number
    title: string
}

const Blog = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [items, setItems] = useState<PostItem[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [query, setQuery] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState(query)

    const limit = 10

    /*
    const data = {
        items: [
            {
                id: '0',
                date: '2025-09-20',
                readingTime: 4,
                title: 'Post 1',
            },
            {
                id: '1',
                date: '2025-09-19',
                readingTime: 4,
                title: 'Post 2',
            },
            {
                id: '2',
                date: '2025-09-18',
                readingTime: 4,
                title: 'Post 3',
            },
        ],
        hasMore: false,
    }
    */

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedQuery(query), 300)
        return () => clearTimeout(timeout)
    }, [query])

    useEffect(() => {
        setItems([])
        setPage(1)
        setHasMore(true)
    }, [debouncedQuery])

    useEffect(() => {
        if (page === 1) loadMore()
    }, [page, debouncedQuery])

    const loadMore = async (): Promise<void> => {
        if (!hasMore) return

        try {
            const res = await fetch(`/api/posts?query=${debouncedQuery}&page=${page}&limit=${limit}`)
            const data = await res.json()

            setItems((prev) => [...prev, ...data.items])
            setPage((prev) => prev + 1)

            if (!data.hasMore || data.items.length < limit) setHasMore(false)
        } catch (err) {
            console.error('Error loading items:', err)
            setHasMore(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <PageLayout>
            <Heading>Blog</Heading>
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search' />
            {render({
                isLoading,
                items,
                renderItems: () => (
                    <div className={styles.content}>
                        <InfiniteScroll
                            items={items}
                            loadMore={loadMore}
                            hasMore={hasMore}
                            renderItem={(item) => (
                                <Post
                                    key={item.id}
                                    description={`${formatDate(item.date)} • ${formatReadingTime(item.readingTime)}`}
                                    title={item.title}
                                    href={`/blog/${item.id}`}
                                />
                            )}
                        />
                    </div>
                ),
            })}
        </PageLayout>
    )
}

export default Blog
