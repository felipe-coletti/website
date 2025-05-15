import type { PostProps } from './Posts.types'
import styles from './styles.module.css'
import { Heading, Text } from '../../../components/Atoms'

export const Post = ({ href, date, title }: PostProps) => {
	return (
		<div className={styles.post}>
			<Text>{date}</Text>
			<a className={styles.link} href={href}>
				<Heading size='xsmall'>{title}</Heading>
			</a>
		</div>
	)
}
