'use client'

import { useRouter } from 'next/navigation'
import { Alert, Button, Col, Row } from 'antd'
import paths from '@/paths'

const Error = ({ error }: { error: Error }) => {
	const router = useRouter()

	return (
		<Row justify="center" style={{ marginTop: '20px' }}>
			<Col>
				<Alert
					description={error.message}
					message="Error"
					showIcon
					style={{ marginBottom: '20px' }}
					type="error"
				/>
				<Button
					onClick={() => router.push(paths.home())}
					type="primary"
				>
					Back to home
				</Button>
			</Col>
		</Row>
	)
}

export default Error
