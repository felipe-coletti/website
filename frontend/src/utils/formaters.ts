export function formatDate(dateInput: string | Date): string {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export function formatReadingTime(minutes?: number): string {
    if (minutes == null || isNaN(minutes)) return ''
    return minutes === 1 ? '1 min read' : `${minutes} min read`
}
