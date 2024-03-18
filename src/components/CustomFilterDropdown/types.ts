import { Key } from 'react'
import { FilterParams } from '@/constants'

export interface CustomFilterDropdownProps {
	readonly clearFilters: () => void
	readonly close: () => void
	readonly dataIndex: FilterParams
	readonly selectedKeys: Key[]
	readonly setSelectedKeys: (selectedKeys: Key[]) => void
}
