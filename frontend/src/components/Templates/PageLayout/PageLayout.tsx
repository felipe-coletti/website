import { PageLayoutProps } from './PageLayout.types'
import styles from './styles.module.css'

export const PageLayout = ({ children }: PageLayoutProps) => {
    return <div className={styles.pageLayout}>{children}</div>
}
