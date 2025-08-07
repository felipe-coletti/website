import type { ButtonProps } from './Button.types'
import styles from './styles.module.css'

export const Button = ({
	variant = 'filled',
	icon,
	iconPosition = 'start',
	onClick,
	disabled = false,
	children
}: ButtonProps) => {
	const variantStyle = variant === 'outline' ? styles.outline : variant === 'ghost' ? styles.ghost : styles.filled

	const classNames = [styles.button, variantStyle, icon && !children && styles.iconOnly, disabled && styles.disabled]
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
