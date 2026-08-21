import type { ProjectGalleryProps } from './ProjectGallery.types'
import styles from './ProjectGallery.module.css'
import { ProjectCard } from '../../Molecules/ProjectCard'

export const ProjectGallery = ({ projects }: ProjectGalleryProps) => {
	return (
		<div className={styles.projectGallery}>
			{projects.map(project => (
				<ProjectCard key={project.id} title={project.title} src={project.src} to={`/work/${project.id}`} />
			))}
		</div>
	)
}
