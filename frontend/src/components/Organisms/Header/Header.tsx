import styles from './styles.module.css'
import { Heading, Link } from '@/components/Atoms'

export const Header = () => {
    return (
        <div className={styles.header}>
            <Heading>Felipe Coletti</Heading>
            <ul style={{ alignItems: 'center', display: 'flex', gap: '0.75rem', listStyle: 'none' }}>
                <li>
                    <Link href='/work'>Work</Link>
                </li>
                <li>
                    <Link href='/blog'>Blog</Link>
                </li>
                <li>
                    <Link href='/about'>About</Link>
                </li>
                <li>
                    <Link href='/contact'>Contact</Link>
                </li>
            </ul>
        </div>
    )
}
