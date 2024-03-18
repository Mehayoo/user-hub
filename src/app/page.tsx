import AddUsers from '@/components/AddUsers/AddUsers'
import UsersShow from '@/components/UsersShow/UsersShow'
import styles from './page.module.scss'

export default function Home() {
	return (
		<main className={styles.main}>
			<AddUsers />
			<UsersShow />
		</main>
	)
}
