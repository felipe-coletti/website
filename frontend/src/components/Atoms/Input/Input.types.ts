export interface InputProps {
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
	name: string
}
