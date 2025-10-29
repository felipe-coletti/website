import type { ProjectCardProps } from './ProjectCard.types'
import styles from './ProjectCard.module.css'
import { Link } from 'react-router-dom'
import { Heading } from '../../Atoms'

export const ProjectCard = ({ to, src, title }: ProjectCardProps) => {
	return (
		<Link className={styles.card} to={to}>
			<img className={styles.cardImage} src={src} />
			<div className={styles.overlay}>
				<Heading as='h2' size='small'>
					{title}
				</Heading>
			</div>
		</Link>
	)
}
