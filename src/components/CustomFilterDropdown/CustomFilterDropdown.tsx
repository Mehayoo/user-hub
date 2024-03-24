import { ChangeEvent, useState } from 'react'
import { Button, Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { queryParamsAtom } from '@/recoil'
import { useRecoilUser } from '@/hooks'
import { omit } from 'lodash'
import { Filters, SessionStorage } from '@/constants'
import { CustomFilterDropdownProps } from './types'

const CustomFilterDropdown = ({
	clearFilters,
	close,
	dataIndex,
	selectedKeys,
	setSelectedKeys,
}: CustomFilterDropdownProps) => {
	const userActions = useRecoilUser()

	const queryParamsState: SessionStorage = useRecoilValue(queryParamsAtom)

	const [inputValue, setInputValue] = useState<string>(
		queryParamsState.filters.params[dataIndex] || ''
	)

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setInputValue(e.target.value)
		setSelectedKeys(e.target.value ? [e.target.value] : [])
	}

	const handleReset = (): void => {
		setSelectedKeys([])
		setInputValue('')
		clearFilters()

		const newFilterParams: Pick<Filters, keyof Filters> = omit(
			queryParamsState.filters.params,
			dataIndex
		)

		const newQueryParamsState: SessionStorage = {
			...queryParamsState,
			filters: {
				params: newFilterParams,
				page: Object.keys(newFilterParams).length ? 1 : 0,
			},
		}

		userActions.getAllUsers(newQueryParamsState)

		close()
	}

	const handleSearch = () => {
		const paramsObj: SessionStorage = {
			...queryParamsState,
			filters: {
				params: {
					...queryParamsState.filters.params,
					[dataIndex]: selectedKeys.toString().toLowerCase(),
				},
				page: 1,
			},
		}
		userActions.getAllUsers(paramsObj)

		close()
	}

	return (
		<div
			style={{ padding: 8 }}
			onKeyDown={(e) => e.stopPropagation()}
			onClick={(e) => e.stopPropagation()}
		>
			<Input
				onChange={handleChange}
				placeholder={`Search ${dataIndex}`}
				style={{ display: 'block', marginBottom: 8 }}
				value={inputValue}
			/>
			<Space>
				<Button
					icon={<SearchOutlined />}
					onClick={handleSearch}
					size="small"
					style={{ width: 90 }}
					type="primary"
				>
					Search
				</Button>
				<Button onClick={handleReset} style={{ width: 90 }}>
					Reset
				</Button>

				<Button onClick={close} size="small" type="link">
					close
				</Button>
			</Space>
		</div>
	)
}

export default CustomFilterDropdown
