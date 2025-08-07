import type { TextProps } from './Text.types'
import styles from './styles.module.css'

export const Text = ({ children }: TextProps) => {
	return <p className={styles.text}>{children}</p>
}
