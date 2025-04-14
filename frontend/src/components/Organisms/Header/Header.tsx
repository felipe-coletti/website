import styles from './styles.module.css'
import { Heading } from '@/components/Atoms'

export const Header = () => {
    return (
        <div className={styles.header}>
            <Heading>Felipe Coletti</Heading>
            <ul>
                <li>
                    <a href='/work'>Work</a>
                    <a href='/blog'>Blog</a>
                    <a href='/about'>About</a>
                    <a href='/contact'>Contact</a>
                </li>
            </ul>
        </div>
    )
}
