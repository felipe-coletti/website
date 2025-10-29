import styles from './Header.module.css'
import { Logo } from '../../Atoms/Logo'
import { Tabs } from '../../Molecules/Tabs'
import { ThemeToggle } from '../../Molecules/ThemeToggle'

export const Header = () => {
	const tabs = [
		{
			title: 'Home',
			paths: ['/']
		},
		{
			title: 'Work',
			paths: ['/work']
		},
		{
			title: 'Blog',
			paths: ['/blog']
		},
		{
			title: 'About',
			paths: ['/about']
		},
		{
			title: 'Contact',
			paths: ['/contact']
		}
	]

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Logo />
				<Tabs tabs={tabs} />
				<ThemeToggle />
			</div>
		</header>
	)
}
