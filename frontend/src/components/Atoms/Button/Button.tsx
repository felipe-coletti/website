import type { ButtonProps } from './Button.types'
import styles from './styles.module.css'

export const Button = ({ variant = 'filled', onClick, children }: ButtonProps) => {
	let variantStyle

	switch (variant) {
		case 'filled':
			variantStyle = styles.filled
			break
		case 'outline':
			variantStyle = styles.outline
			break
		case 'ghost':
			variantStyle = styles.ghost
	}

	return (
		<button type='button' className={`${styles.button} ${variantStyle}`} onClick={onClick}>
			{children}
		</button>
	)
}
