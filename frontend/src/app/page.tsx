import styles from './page.module.css'
import { Button, Link } from '@/components'

export default function Home() {
    return (
        <div className={styles.page}>
            <Button>See more</Button>
            <Button variant='outline'>See more</Button>
            <Button variant='ghost'>See more</Button>
            <Link>Link</Link>
        </div>
    )
}
