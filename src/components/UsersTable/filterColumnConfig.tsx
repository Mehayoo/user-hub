import { TableColumnType } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import CustomFilterDropdown from '@/components/CustomFilterDropdown/CustomFilterDropdown'
import { UserWithCountry } from '@/db/queries/users'
import { FilterParams, SessionStorage } from '@/constants'

export const createFilterColumnConfig = ({
	dataIndex,
	queryParamsState,
}: {
	dataIndex: FilterParams
	queryParamsState: SessionStorage
}): TableColumnType<UserWithCountry> => ({
	filterDropdown: ({
		clearFilters,
		close,
		selectedKeys,
		setSelectedKeys,
	}) => (
		<CustomFilterDropdown
			clearFilters={clearFilters!}
			close={close}
			dataIndex={dataIndex}
			selectedKeys={selectedKeys}
			setSelectedKeys={setSelectedKeys}
		/>
	),
	filterIcon: (filtered: boolean) => (
		<SearchOutlined
			style={{
				color:
					// filtered ||
					queryParamsState.filterParams[dataIndex]
						? '#1677ff'
						: undefined,
			}}
		/>
	),
})
