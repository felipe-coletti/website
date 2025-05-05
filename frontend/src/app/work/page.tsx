'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Card, Gallery, Heading, InfiniteScroll, Input, PageLayout, Text } from '@/components'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

type CardType = {
    id: string
    name: string
    src: string
}

const Work = () => {
    const [query, setQuery] = useState<string>('')
    const [projects, setProjects] = useState<CardType[]>([])
    const [page, setPage] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const sentinelRef = useRef<HTMLDivElement>(null)

    const mockedData = [
        { id: '0', name: 'Project 0', src: 'https://picsum.photos/200' },
        { id: '1', name: 'Project 1', src: 'https://picsum.photos/200' },
        { id: '2', name: 'Project 2', src: 'https://picsum.photos/200' },
        { id: '3', name: 'Project 3', src: 'https://picsum.photos/200' },
        { id: '4', name: 'Project 4', src: 'https://picsum.photos/200' },
        { id: '5', name: 'Project 5', src: 'https://picsum.photos/200' },
        { id: '6', name: 'Project 6', src: 'https://picsum.photos/200' },
        { id: '7', name: 'Project 7', src: 'https://picsum.photos/200' }
    ]

    const fetchProjects = async (page: number, query: string) => {
        const url = `/api/work?page=${page}&query=${encodeURIComponent(query)}`

        try {
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await res.json()
            if (data.projects.length === 0) {
                setHasMore(false)
            }
            return data.projects
        } catch (error) {
            console.error('Fetch error:', error)
            if (!isError) {
                setIsError(true)
            }
            return []
        }
    }

    const loadProjects = useCallback(async () => {
        if (isLoading || isError) return

        setIsLoading(true)
        const newProjects = await fetchProjects(page, query)
        setProjects((prev) => [...prev, ...newProjects])
        setIsLoading(false)
    }, [page, query, isError, isLoading])

    useEffect(() => {
        if (!isError) {
            loadProjects()
        }
    }, [page, query, isError, loadProjects])

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setPage(0)
        setHasMore(true)
        setProjects([])
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
            <Heading>Work</Heading>
            <Input value={query} onChange={(e) => handleSearch(e)} placeholder='Search' />
            {isError ? (
                <div className='end-message'>
                    <Text>Failed to load projects. Please try again later.</Text>
                </div>
            ) : (
                <InfiniteScroll hasMore={hasMore} ref={sentinelRef}>
                    <Gallery>
                        {projects.map((project) => (
                            <Card
                                key={project.id}
                                title={project.name}
                                src={project.src}
                                href={`/work/${project.id}`}
                            />
                        ))}
                    </Gallery>
                </InfiniteScroll>
            )}
        </PageLayout>
    )
}

export default Work
