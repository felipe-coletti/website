import { HeadingProps } from './Heading.types'
import styles from './styles.module.css'

export const Heading = ({ size = 'medium', children }: HeadingProps) => {
    let sizeStyle

    switch (size) {
        case 'xsmall':
            sizeStyle = styles.xsmall
            break
        case 'small':
            sizeStyle = styles.small
            break
        case 'medium':
            sizeStyle = styles.medium
            break
        case 'large':
            sizeStyle = styles.large
            break
        case 'xlarge':
            sizeStyle = styles.xlarge
    }

    return <span className={`${styles.heading} ${sizeStyle}`}>{children}</span>
}
