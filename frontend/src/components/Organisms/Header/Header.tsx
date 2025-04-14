import styles from './styles.module.css'
import { Heading } from '@/components/Atoms'

export const Header = () => {
    return (
        <div className={styles.header}>
            <Heading>Felipe Coletti</Heading>
        </div>
    )
}
