import styles from './styles.module.css'
import logo from '/src/assets/images/logo.png'

export const Logo = () => {
	return (
		<a className={styles.logoContainer} href='/'>
			<img className={styles.logo} src={logo} alt='Logo' />
		</a>
	)
}
