'use client'
import { Card, Gallery, PageList } from '@/components'

type CardType = {
    id: string
    name: string
    src: string
}

const fetchProjects = async (page: number, query: string): Promise<CardType[]> => {
    const res = await fetch(`/api/work?page=${page}&query=${encodeURIComponent(query)}`)
    if (!res.ok) return []
    const data = await res.json()
    return data || []
}

const Work = () => {
    return (
        <PageList title='Work' placeholder='Search' fetchItems={fetchProjects}>
            {(items: CardType[]) => (
                <Gallery>
                    {items.map((project) => (
                        <Card key={project.id} title={project.name} src={project.src} href={`/work/${project.id}`} />
                    ))}
                </Gallery>
            )}
        </PageList>
    )
}

export default Work
