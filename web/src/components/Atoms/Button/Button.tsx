import type { ButtonProps } from './Button.types'
import styles from './styles.module.css'

export const Button = ({
	type = 'button',
	variant = 'filled',
	icon,
	iconPosition = 'start',
	onClick,
	disabled = false,
	children
}: ButtonProps) => {
	const variantStyle =
		{
			filled: styles.filled,
			outline: styles.outline,
			ghost: styles.ghost
		}[variant] || styles.filled

	const classNames = [styles.button, variantStyle, icon && !children && styles.iconOnly, disabled && styles.disabled]
		.filter(Boolean)
		.join(' ')

	const renderIcon = () => icon && <span className={styles.icon}>{icon}</span>

	return (
		<button type={type} className={classNames} onClick={onClick} disabled={disabled}>
			{icon && iconPosition === 'start' && renderIcon()}
			{children}
			{icon && iconPosition === 'end' && renderIcon()}
		</button>
	)
}
