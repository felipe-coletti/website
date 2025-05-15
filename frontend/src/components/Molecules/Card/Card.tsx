import type { CardProps } from './Card.types'
import styles from './styles.module.css'
import { Heading } from '../../Atoms'

export const Card = ({ href, src, title }: CardProps) => {
	return (
		<a className={styles.card} href={href}>
			<img className={styles.cardImage} src={src} />
			<div className={styles.overlay}>
				<Heading size='small'>{title}</Heading>
			</div>
		</a>
	)
}
