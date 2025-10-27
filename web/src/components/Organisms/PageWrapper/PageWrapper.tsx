import type { PageWrapperProps } from './PageWrapper.types'
import styles from './PageWrapper.module.css'

export const PageWrapper = ({ className, children }: PageWrapperProps) => {
	return (
		<main className={styles.pageWrapper}>
			<div className={`page-limit ${className}`}>{children}</div>
		</main>
	)
}
