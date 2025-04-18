import { TabsProps } from './Tabs.types'
import styles from './styles.module.css'

export const Tabs = ({ tabs }: TabsProps) => {
    return (
        <ul className={styles.tabs}>
            {tabs.map((tab, i) => (
                <li>
                    <a className={styles.tab} href={tab.href} key={i}>
                        {tab.title}
                    </a>
                </li>
            ))}
        </ul>
    )
}
