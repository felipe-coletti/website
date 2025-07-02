import type { ProjectGalleryProps } from './ProjectGallery.types'
import styles from './styles.module.css'
import { ProjectCard } from '../../Molecules/ProjectCard'

export const ProjectGallery = ({ projects }: ProjectGalleryProps) => {
	return (
		<div className={styles.projectGallery}>
			{projects.map(project => (
				<ProjectCard key={project.id} title={project.name} src={project.src} to={`/work/${project.id}`} />
			))}
		</div>
	)
}
