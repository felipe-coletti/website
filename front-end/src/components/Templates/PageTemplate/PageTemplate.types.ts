export type PageTemplateProps<T> = {
	title: string
	placeholder: string
	fetchItems: (page: number, query: string) => Promise<T[]>
	children: (items: T[]) => React.ReactNode
}
