type CommonButtonProps = {
	variant?: 'filled' | 'outline' | 'ghost'
	iconPosition?: 'start' | 'end'
	onClick?: () => void
	disabled?: boolean
}

type IconOnlyProps = CommonButtonProps & {
	icon: React.ReactNode
	children?: never
}
type TextOnlyProps = CommonButtonProps & {
	icon?: never
	children: React.ReactNode
}

type IconTextProps = CommonButtonProps & {
	icon: React.ReactNode
	children: React.ReactNode
}

export type ButtonProps = IconOnlyProps | TextOnlyProps | IconTextProps
