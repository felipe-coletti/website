import { Text } from '@/components'

type RenderOptions<T> = {
    isLoading: boolean
    items: T[]
    renderItems: () => React.ReactNode
    loadingFallback?: React.ReactNode
    emptyFallback?: React.ReactNode
}

export function render<T>({
    isLoading,
    items,
    renderItems,
    loadingFallback = <Text>Loading...</Text>,
    emptyFallback = <Text>No items found.</Text>,
}: RenderOptions<T>) {
    if (isLoading) return loadingFallback
    if (items.length === 0) return emptyFallback
    return renderItems()
}
