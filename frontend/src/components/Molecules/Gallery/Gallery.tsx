import { GalleryProps } from './Gallery.types'
import styles from './styles.module.css'

export const Gallery = ({ children }: GalleryProps) => {
    return <div className={styles.gallery}>{children}</div>
}
