import type { HeadingProps } from './Heading.types'
import styles from './styles.module.css'

export const Heading = ({ as: Tag, size = 'medium', children }: HeadingProps) => {
	const sizeStyle =
		{
			xsmall: styles.xsmall,
			small: styles.small,
			medium: styles.medium,
			large: styles.large,
			xlarge: styles.xlarge
		}[size] || styles.medium

	return <Tag className={`${styles.heading} ${sizeStyle}`}>{children}</Tag>
}
