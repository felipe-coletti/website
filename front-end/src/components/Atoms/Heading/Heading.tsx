import type { HeadingProps } from './Heading.types'
import styles from './styles.module.css'

export const Heading = ({ as: Tag, size = 'medium', children }: HeadingProps) => {
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

	return <Tag className={`${styles.heading} ${sizeStyle}`}>{children}</Tag>
}
