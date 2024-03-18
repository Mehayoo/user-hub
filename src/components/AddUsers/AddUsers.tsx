'use client'

import React, { Suspense, useState } from 'react'
import { Button, Spin } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
// UserModal is only needed when a user decides to add or edit a user, so it is dynamically imported using React.lazy
const UserModal = React.lazy(() => import('@/components/UserModal/UserModal'))

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
