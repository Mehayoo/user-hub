'use client'

import React, { Suspense, useState } from 'react'
import { Button, Spin } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// UserModal is only needed when a user decides to add or edit a user, so it is dynamically imported using React.lazy
const UserModal = React.lazy(() => import('@/components/UserModal/UserModal'))
// The code for UserModal is split into a separate chunk (bundle) from the main application bundle (otherwise it would be included
// in the main bundle of the application)
// This separate chunk is only downloaded the first time UserModal is supposed to render (when modalOpen becomes true)
// Until the download and rendering are complete, the Suspense fallback (<Spin size="large" />) is shown, providing a smoother user experience
// This approach reduces the initial load time and the size of the main JavaScript bundle, as the code for UserModal is only fetched when needed
// Important: even though the modal is not part of the UI and only gets inserted into the DOM when user opens it, the code the code for
// this component will be included in the main bundle and downloaded during the initial load of the page, regardless of whether
// the modal is visible or not, so this is why I am using React.lazy, since the modal is itself a pretty heavy component in terms of
// logic and dependencies

const AddUsers = () => {
	const [modalOpen, setModalOpen] = useState<boolean>(false)

	return (
		<>
			<Button
				onClick={() => setModalOpen(true)}
				style={{ marginBottom: 15 }}
				type="primary"
			>
				<PlusOutlined />
				Add new user
			</Button>

			<Suspense fallback={<Spin size="large" />}>
				<UserModal open={modalOpen} setOpen={setModalOpen} />
			</Suspense>
		</>
	)
}

export default AddUsers
