import type { ProjectGalleryProps } from './ProjectGallery.types'
import styles from './styles.module.css'

export const Gallery = ({ children }: ProjectGalleryProps) => {
	return <div className={styles.gallery}>{children}</div>
}
