import type { ButtonProps } from './Button.types'
import styles from './styles.module.css'

export const Button = ({
	variant = 'default',
	hierarchy = 'primary',
	icon,
	iconPosition = 'start',
	onClick,
	disabled = false,
	children
}: ButtonProps) => {
	const variantStyle =
		{
			default: styles.default,
			inverse: styles.inverse
		}[variant] || styles.default

	const hierarchyStyle =
		{
			primary: styles.filled,
			secondary: styles.outline,
			tertiary: styles.ghost
		}[hierarchy] || styles.primary

	const classNames = [
		styles.button,
		variantStyle,
		hierarchyStyle,
		icon && !children && styles.iconOnly,
		disabled && styles.disabled
	]
		.filter(Boolean)
		.join(' ')

	const renderIcon = () => icon && <span className={styles.icon}>{icon}</span>

	return (
		<button type='button' className={classNames} onClick={onClick} disabled={disabled}>
			{icon && iconPosition === 'start' && renderIcon()}
			{children}
			{icon && iconPosition === 'end' && renderIcon()}
		</button>
	)
}
