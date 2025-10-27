import type { PostCardProps } from './PostCard.types'
import styles from './PostCard.module.css'
import { Link } from 'react-router-dom'
import { Heading, Text } from '../../Atoms'

export const PostCard = ({ to, date, title }: PostCardProps) => {
	return (
		<div className={styles.post}>
			<Text>{date}</Text>
			<Link className={styles.link} to={to}>
				<Heading as='h2' size='xsmall'>
					{title}
				</Heading>
			</Link>
		</div>
	)
}
