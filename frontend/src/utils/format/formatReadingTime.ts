export function formatReadingTime(minutes?: number): string {
	if (minutes == null || isNaN(minutes)) return ''
	return minutes === 1 ? '1 minute read' : `${minutes} minutes read`
}
