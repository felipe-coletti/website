import type { ProjectCardProps } from './ProjectCard.types'
import styles from './styles.module.css'
import { Heading } from '../../Atoms'

export const Card = ({ href, src, title }: ProjectCardProps) => {
	return (
		<a className={styles.card} href={href}>
			<img className={styles.cardImage} src={src} />
			<div className={styles.overlay}>
				<Heading size='small'>{title}</Heading>
			</div>
		</a>
	)
}
