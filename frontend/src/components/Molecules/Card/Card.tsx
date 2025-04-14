import { CardProps } from './Card.types'
import styles from './styles.module.css'
import { Heading } from '../../Atoms/Heading'
import { Text } from '../../Atoms/Text'

export const Card = ({ href, src, title, description }: CardProps) => {
    return (
        <a className={styles.card} href={href}>
            <img className={styles.cardImage} src={src} />
            <div className={styles.backdrop}>
                <div className={styles.cardContent}>
                    <Heading size='xsmall'>{title}</Heading>
                    <Text>{description}</Text>
                </div>
            </div>
        </a>
    )
}
