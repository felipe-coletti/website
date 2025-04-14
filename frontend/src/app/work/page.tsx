'use client'
import { useState, useEffect } from 'react'
import { Card, Gallery, Heading, InfiniteScroll, Input, PageLayout, Text } from '@/components'
import { render } from '@/utils/render'

type CardItem = {
    id: string
    name: string
    src: string
    description: string
}

const Work = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [items, setItems] = useState<CardItem[]>([])
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
                name: 'Project 0',
                description: 'Description',
                src: 'https://picsum.photos/200/300',
            },
            {
                id: '1',
                name: 'Project 1',
                description: 'Description',
                src: 'https://picsum.photos/200/300',
            },
            {
                id: '2',
                name: 'Project 2',
                description: 'Description',
                src: 'https://picsum.photos/200',
            },
            {
                id: '3',
                name: 'Project 3',
                description: 'Description',
                src: 'https://picsum.photos/200/300',
            },
            {
                id: '4',
                name: 'Project 4',
                description: 'Description',
                src: 'https://picsum.photos/200',
            },
            {
                id: '5',
                name: 'Project 5',
                description: 'Description',
                src: 'https://picsum.photos/200',
            },
            {
                id: '6',
                name: 'Project 6',
                description: 'Description',
                src: 'https://picsum.photos/200/300',
            },
            {
                id: '7',
                name: 'Project 7',
                description: 'Description',
                src: 'https://picsum.photos/200',
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
            const res = await fetch(`/api/works?query=${debouncedQuery}&page=${page}&limit=${limit}`)
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
            <Heading>Work</Heading>
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search' />
            <Gallery>
                {render({
                    isLoading,
                    items,
                    renderItems: () => (
                        <InfiniteScroll
                            items={items}
                            loadMore={loadMore}
                            hasMore={hasMore}
                            renderItem={(item) => (
                                <Card
                                    key={item.id}
                                    src={item.src}
                                    title={item.name}
                                    description={item.description}
                                    href={`/work/${item.id}`}
                                />
                            )}
                        />
                    ),
                })}
            </Gallery>
        </PageLayout>
    )
}

export default Work
