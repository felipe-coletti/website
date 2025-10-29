import type { TabsProps } from './Tabs.types'
import styles from './Tabs.module.css'
import { Link, useLocation } from 'react-router-dom'

export const Tabs = ({ tabs }: TabsProps) => {
	const location = useLocation()

	return (
		<ul className={styles.tabs}>
			{tabs.map((tab, i) => {
				const isActive = tab.paths.includes(location.pathname)

				return (
					<li key={i}>
						<Link className={`${styles.tab} ${isActive ? styles.active : ''}`} to={tab.paths[0]}>
							{tab.title}
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
