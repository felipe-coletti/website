'use client'
import { TabsProps } from './Tabs.types'
import styles from './styles.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Tabs = ({ tabs }: TabsProps) => {
    const pathname = usePathname()

    return (
        <ul className={styles.tabs}>
            {tabs.map((tab, i) => {
                const isActive = pathname === tab.href

                return (
                    <li key={i}>
                        <Link className={`${styles.tab} ${isActive ? styles.active : ''}`} href={tab.href}>
                            {tab.title}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
