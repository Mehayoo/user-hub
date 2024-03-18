'use client'

import { useRouter } from 'next/navigation'
import { Result, Button } from 'antd'
import paths from '@/paths'

const LoadingComponent = () => {
	const router = useRouter()

	return (
		<Result
			extra={
				<Button
					onClick={() => router.push(paths.home())}
					type="primary"
				>
					Back Home
				</Button>
			}
			subTitle="Sorry, the page you visited does not exist."
			status="404"
			title="404"
		/>
	)
}

export default LoadingComponent
