import type { PostCardProps } from './PostCard.types'
import styles from './styles.module.css'
import { Heading, Text } from '../../Atoms'

export const PostCard = ({ href, date, title }: PostCardProps) => {
	return (
		<div className={styles.post}>
			<Text>{date}</Text>
			<a className={styles.link} href={href}>
				<Heading size='xsmall'>{title}</Heading>
			</a>
		</div>
	)
}
