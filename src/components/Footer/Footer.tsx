import Link from 'next/link'
import { Footer as AntdFooter } from 'antd/es/layout/layout'

const Footer = () => {
	return (
		<AntdFooter style={{ textAlign: 'center' }}>
			©2024 Created by{' '}
			<Link href="https://github.com/Mehayoo">Mihaiu Sorin-Ionut</Link>
		</AntdFooter>
	)
}

export default Footer
