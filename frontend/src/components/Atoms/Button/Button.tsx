import type { ButtonProps } from './Button.types'
import styles from './styles.module.css'

export const Button = ({
	variant = 'primary',
	icon,
	iconPosition = 'start',
	onClick,
	disabled = false,
	children
}: ButtonProps) => {
	const variantStyle =
		variant === 'secondary' ? styles.secondary : variant === 'tertiary' ? styles.tertiary : styles.primary

	const classNames = [
		styles.button,
		variantStyle,
		icon && !children && styles.iconButton,
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
