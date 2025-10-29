import type { InputProps } from './Input.types'
import styles from './Input.module.css'

export const Input = ({ value, onChange, placeholder, name }: InputProps) => {
	return <input className={styles.input} value={value} onChange={onChange} placeholder={placeholder} name={name} />
}
