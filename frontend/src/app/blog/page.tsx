'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './styles.module.css'
import { formatDate, formatReadingTime } from '@/utils/formaters'
import { Heading, InfiniteScroll, Input, PageLayout, Post, Text } from '@/components'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

type PostType = {
    id: string
    date: string
    readingTime: number
    title: string
}

const Blog = () => {
    const [query, setQuery] = useState<string>('')
    const [posts, setPosts] = useState<PostType[]>([])
    const [page, setPage] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const sentinelRef = useRef<HTMLDivElement>(null)

    const mockedData = [
        { id: '0', date: '2025-09-20', readingTime: 4, title: 'Post 1' },
        { id: '1', date: '2025-09-19', readingTime: 4, title: 'Post 2' },
        { id: '2', date: '2025-09-18', readingTime: 4, title: 'Post 3' }
    ]

    const fetchPosts = async (page: number, query: string) => {
        const url = `/api/work?page=${page}&query=${encodeURIComponent(query)}`

        try {
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await res.json()
            if (data.posts.length === 0) {
                setHasMore(false)
            }
            return data.posts
        } catch (error) {
            console.error('Fetch error:', error)
            if (!isError) {
                setIsError(true)
            }
            return []
        }
    }

    const loadPosts = useCallback(async () => {
        if (isLoading || isError) return

        setIsLoading(true)
        const newPosts = await fetchPosts(page, query)
        setPosts((prev) => [...prev, ...newPosts])
        setIsLoading(false)
    }, [page, query, isError, isLoading])

    useEffect(() => {
        if (!isError) {
            loadPosts()
        }
    }, [page, query, isError, loadPosts])

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setPage(0)
        setHasMore(true)
        setPosts([])
        setIsError(false)
    }, [])

    const loadMore = () => {
        if (hasMore && !isError && !isLoading) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    useInfiniteScroll({
        sentinelRef,
        onLoadMore: loadMore,
        canLoadMore: hasMore && !isError && !isLoading
    })

    return (
        <PageLayout>
            <Heading>Blog</Heading>
            <Input value={query} onChange={(e) => handleSearch(e)} placeholder='Search' />
            {isError ? (
                <div className='end-message'>
                    <Text>Failed to load posts. Please try again later.</Text>
                </div>
            ) : (
                <InfiniteScroll hasMore={hasMore} ref={sentinelRef}>
                    <div className={styles.content}>
                        {posts.map((post) => (
                            <Post
                                key={post.id}
                                description={`${formatDate(post.date)} • ${formatReadingTime(post.readingTime)}`}
                                title={post.title}
                                href={`/blog/${post.id}`}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            )}
        </PageLayout>
    )
}

export default Blog
