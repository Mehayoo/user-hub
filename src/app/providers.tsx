'use client'

import { Layout } from 'antd'
import { RecoilRoot } from 'recoil'

export default function Providers({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Layout
			style={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<RecoilRoot>{children}</RecoilRoot>
		</Layout>
	)
}
