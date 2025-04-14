import { PostProps } from './Posts.types'
import styles from './styles.module.css'
import { Heading, Text } from '@/components/Atoms'

export const Post = ({ href, description, title }: PostProps) => {
    return (
        <a className={styles.post} href={href}>
            <Text>{description}</Text>
            <Heading size='xsmall'>{title}</Heading>
        </a>
    )
}
