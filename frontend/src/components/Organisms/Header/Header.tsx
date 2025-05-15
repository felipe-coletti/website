import { Tabs } from '../Tabs'
import styles from './styles.module.css'
import { Heading, ThemeToggle } from '../../../components/Atoms'

export const Header = () => {
	const tabs = [
		{
			title: 'Work',
			href: '/work'
		},
		{
			title: 'Blog',
			href: '/blog'
		},
		{
			title: 'About',
			href: '/about'
		},
		{
			title: 'Contact',
			href: '/contact'
		}
	]

	return (
		<div className={styles.header}>
			<Heading>Felipe Coletti</Heading>
			<Tabs tabs={tabs} />
			<ThemeToggle />
		</div>
	)
}
