import type { LinkProps } from './Link.types'
import styles from './styles.module.css'
import { Link as RouterLink } from 'react-router-dom'

export const Link = ({ href, children }: LinkProps) => {
	let isExternal = false

	try {
		const url = new URL(href, window.location.origin)

		isExternal = url.origin !== window.location.origin
	} catch {
		isExternal = false
	}

	if (isExternal) {
		return (
			<a className={styles.link} href={href}>
				{children} <span className={styles.linkArrow}>→</span>
			</a>
		)
	}

	return (
		<RouterLink className={styles.link} to={href}>
			{children} <span className={styles.linkArrow}>→</span>
		</RouterLink>
	)
}
