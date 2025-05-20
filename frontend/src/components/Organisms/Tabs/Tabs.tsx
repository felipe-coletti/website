import type { TabsProps } from './Tabs.types'
import styles from './styles.module.css'
import { Link, useLocation } from 'react-router-dom'

export const Tabs = ({ tabs }: TabsProps) => {
	const location = useLocation()

	return (
		<ul className={styles.tabs}>
			{tabs.map((tab, i) => {
				const isActive = location.pathname === tab.href

				return (
					<li key={i}>
						<Link className={`${styles.tab} ${isActive ? styles.active : ''}`} to={tab.href}>
							{tab.title}
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
