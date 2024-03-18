import Link from 'next/link'
import { Menu } from 'antd'
import { Header } from 'antd/es/layout/layout'
import paths from '@/paths'

const Navbar = () => {
	return (
		<Header
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<div
				className="logo"
				style={{
					fontSize: 25,
				}}
			>
				<Link href={paths.home()}> UserHub</Link>
			</div>

			<Menu
				items={[
					{
						key: '1',
						label: <Link href={paths.about()}> About</Link>,
					},
					{
						key: '2',
						label: <Link href={paths.home()}> Home</Link>,
					},
				]}
				mode="horizontal"
				theme="dark"
				selectable={false}
				style={{
					flex: 1,
					flexDirection: 'row-reverse',
					minWidth: 0,
				}}
			/>
		</Header>
	)
}

export default Navbar
