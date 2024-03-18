import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import Providers from './providers'
import Alert from '@/components/Alert/Alert'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'UserHub',
	description: 'User management app created with NestJs, Recoil and AntD',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AntdRegistry>
					<Providers>
						<Navbar />
						<Alert />
						<div style={{ flexGrow: 1 }}>{children}</div>
						<Footer />
					</Providers>
				</AntdRegistry>
			</body>
		</html>
	)
}
