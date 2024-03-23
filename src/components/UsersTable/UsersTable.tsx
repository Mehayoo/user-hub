'use client'

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Modal, Spin, Table, Tag, Tooltip } from 'antd'
import type { TableProps } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useRecoilState, useRecoilValue } from 'recoil'
import { queryParamsAtom, usersAtom } from '@/recoil'
import { useRecoilAlert, useRecoilUser } from '@/hooks'
// UserModal is only needed when a user decides to add or edit a user, so it is dynamically imported using React.lazy
const UserModal = React.lazy(() => import('@/components/UserModal/UserModal'))
import paths from '@/paths'
import {
	mapAntdToPrismaSort,
	mergeWithDefaultParams,
	triggerRevalidation,
} from '@/utils'
import { createSortColumnConfig } from './sortColumnConfig'
import { createFilterColumnConfig } from './filterColumnConfig'
import { UserWithCountry } from '@/db/queries/users'
import {
	FilterParams,
	SortOrder,
	SortParams,
	defaultQueryParamsMap,
} from '@/constants'
import { UsersTableProps } from './types'
import './style.scss'

const UsersTable = ({ tableData }: UsersTableProps) => {
	const router = useRouter()

	const userActions = useRecoilUser()
	const [usersState, setUsersState] = useRecoilState(usersAtom)
	const { data: userData, count: userCount } = usersState || {}

	const queryParamsState = useRecoilValue(queryParamsAtom)
	const { queryParams, sortParams, filterParams } = queryParamsState
	const { page, page_size } = queryParams
	const { order, order_by } = sortParams

	const alertActions = useRecoilAlert()

	const [userId, setUserId] = useState<string>('')
	const [modalOpen, setModalOpen] = useState<boolean>(false)
	const [tableKey, setTableKey] = useState<number>(0)

	useEffect(() => {
		router.replace(`${paths.home(queryParamsState)}`, { scroll: false })
	}, [queryParamsState, router])

	useEffect(() => {
		if (
			order !== defaultQueryParamsMap.sortParams.order ||
			order_by !== defaultQueryParamsMap.sortParams.order_by ||
			page !== defaultQueryParamsMap.queryParams.page ||
			page_size !== defaultQueryParamsMap.queryParams.page_size ||
			Object.keys(filterParams).length
		) {
			userActions.getAllUsers(queryParamsState)
		} else {
			setUsersState({ ...tableData })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleView = (userId: string): void => {
		router.push(paths.userShow(userId))
	}

	const handleEdit = (userId: string): void => {
		setUserId(userId)
		setModalOpen(true)
	}

	const handleDelete = (userId: string): void => {
		Modal.confirm({
			cancelText: 'No, cancel',
			onOk: async () => {
				try {
					await userActions.deleteUser(userId)
					await triggerRevalidation('/')
					await userActions.getAllUsers(queryParamsState)
					alertActions.success('User deleted successfully')
				} catch (error: unknown) {
					alertActions.error('Failed to delete user')
				}
			},
			okType: 'danger',
			okText: 'Yes, delete it',
			title: 'Are you sure you want to delete this user?',
		})
	}

	const handleTableChange: TableProps<UserWithCountry>['onChange'] = async (
		pagination,
		_,
		sorter: any // For some reason, there is no Typescript support for this
	) => {
		const { current } = pagination
		const { columnKey, order } = sorter

		const mappedOrder: SortOrder = mapAntdToPrismaSort(order)
		const paramsObj = mergeWithDefaultParams({
			...queryParamsState,
			queryParams: {
				...defaultQueryParamsMap.queryParams,
				page: current ?? page,
			},
			sortParams: {
				order: mappedOrder,
				order_by: columnKey ?? order_by,
			},
		})

		await userActions.getAllUsers(paramsObj)
	}

	const onResetFilteringAndSorting = async (): Promise<void> => {
		const paramsObj = {
			...defaultQueryParamsMap,
			queryParams: {
				...defaultQueryParamsMap.queryParams,
				page: page,
			},
		}

		setTableKey((tableKey) => tableKey + 1)

		await userActions.getAllUsers(paramsObj)
	}

	const columns: TableProps<UserWithCountry>['columns'] = useMemo(
		() => [
			{
				key: 'index',
				render: (_, __, index) =>
					index +
					1 +
					((page ?? defaultQueryParamsMap.queryParams.page) - 1) *
						(page_size ??
							defaultQueryParamsMap.queryParams.page_size),

				title: 'Index',
			},
			{
				dataIndex: 'user_name',
				...createFilterColumnConfig({
					dataIndex: FilterParams.Username,
					queryParamsState,
				}),
				...createSortColumnConfig({
					dataIndex: 'user_name',
					title: 'Username',
					sortParam: SortParams.Username,
					queryParamsState,
				}),
			},
			{
				dataIndex: 'gender',
				...createFilterColumnConfig({
					dataIndex: FilterParams.Gender,
					queryParamsState,
				}),
				...createSortColumnConfig({
					dataIndex: 'gender',
					title: 'Gender',
					sortParam: SortParams.Gender,
					queryParamsState,
				}),
			},
			{
				dataIndex: 'birthday',
				render: (_, { birthday }) =>
					dayjs(birthday).format('YYYY-MM-DD'),
				...createSortColumnConfig({
					dataIndex: 'birthday',
					title: 'Birthday',
					sortParam: SortParams.Birthday,
					queryParamsState,
				}),
			},
			{
				dataIndex: 'city',
				...createFilterColumnConfig({
					dataIndex: FilterParams.City,
					queryParamsState,
				}),
				...createSortColumnConfig({
					dataIndex: 'city',
					title: 'City',
					sortParam: SortParams.City,
					queryParamsState,
				}),
			},
			{
				dataIndex: 'newsletter_register',
				key: 'newsletter_register',
				render: (_, { newsletter_register }) => {
					const color = newsletter_register ? 'green' : 'volcano'
					const value = new Boolean(newsletter_register)

					return <Tag color={color}>{value.toString()}</Tag>
				},
				title: 'Newsletter',
			},
			{
				dataIndex: 'country',
				render: (_, { country }) => country?.name,
				...createFilterColumnConfig({
					dataIndex: FilterParams.Country,
					queryParamsState,
				}),
				...createSortColumnConfig({
					dataIndex: 'country',
					title: 'Country',
					sortParam: SortParams.Country,
					queryParamsState,
				}),
			},
			{
				dataIndex: 'phone',
				key: 'phone',
				render: (_, { country, phone }) => {
					if (country && !phone) {
						return ''
					}
					return `${country?.country_prefix || ''}${phone || ''}`
				},
				title: 'Phone',
				...createFilterColumnConfig({
					dataIndex: FilterParams.Phone,
					queryParamsState,
				}),
			},
			{
				dataIndex: 'hobbies',
				key: 'hobbies',
				title: 'Hobbies',
				width: '20%',
				...createFilterColumnConfig({
					dataIndex: FilterParams.Hobbies,
					queryParamsState,
				}),
			},
			{
				key: 'actions',
				render: (_: unknown, record: UserWithCountry) => (
					<>
						<Tooltip title="view">
							<Button
								icon={<EyeOutlined />}
								onClick={() => handleView(record.id)}
								type="primary"
								shape="circle"
								style={{ marginRight: 5 }}
							/>
						</Tooltip>

						<Tooltip title="edit">
							<Button
								icon={<EditOutlined />}
								onClick={() => handleEdit(record.id)}
								type="primary"
								shape="circle"
								style={{ marginRight: 5 }}
							/>
						</Tooltip>

						<Tooltip title="delete">
							<Button
								danger
								icon={<DeleteOutlined />}
								onClick={() => handleDelete(record.id)}
								type="primary"
								shape="circle"
							/>
						</Tooltip>
					</>
				),
				title: 'Actions',
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[page, page_size, queryParamsState]
	)

	return (
		<>
			<Suspense fallback={<Spin size="large" />}>
				<UserModal
					open={modalOpen}
					setOpen={setModalOpen}
					userId={userId}
				/>
			</Suspense>

			{userData ? (
				<>
					<Button
						style={{ float: 'right' }}
						onClick={onResetFilteringAndSorting}
					>
						Clear filters and sorters
					</Button>
					<Table
						bordered
						columns={columns}
						dataSource={userData}
						key={tableKey}
						onChange={handleTableChange}
						pagination={{
							current: page,
							pageSize: page_size,
							total: userCount,
						}}
						rowKey={(record) => record.id}
					/>
				</>
			) : (
				<div
					style={{
						alignItems: 'center',
						display: 'flex',
						height: '100%',
						justifyContent: 'center',
						left: 0,
						position: 'fixed',
						top: 0,
						width: '100%',
					}}
				>
					<Spin size="large" />
				</div>
			)}
		</>
	)
}

export default UsersTable
