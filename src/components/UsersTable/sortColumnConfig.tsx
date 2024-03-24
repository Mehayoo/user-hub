import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { SessionStorage, SortOrder, SortParams } from '@/constants'

enum AntdSortOrder {
	Ascend = 'ascend',
	Descend = 'descend',
}

export const createSortColumnConfig = ({
	dataIndex,
	title,
	sortParam,
	queryParamsState,
}: {
	dataIndex: string
	title: string
	sortParam: SortParams
	queryParamsState: SessionStorage
}) => ({
	key: dataIndex,

	showSorterTooltip: {
		title:
			queryParamsState.order === SortOrder.Asc &&
			queryParamsState.order_by === sortParam
				? 'Click to sort descending'
				: 'Click to sort ascending',
	},

	sortDirections:
		queryParamsState.order === SortOrder.Asc &&
		queryParamsState.order_by === sortParam
			? [
					AntdSortOrder.Descend,
					AntdSortOrder.Ascend,
					AntdSortOrder.Descend,
			  ]
			: [
					AntdSortOrder.Ascend,
					AntdSortOrder.Descend,
					AntdSortOrder.Ascend,
			  ],

	sortIcon: () => {
		return (
			<span
				style={{
					alignItems: 'center',
					display: 'inline-flex',
					flexDirection: 'column',
					marginRight: '5px',
					position: 'relative',
				}}
			>
				<CaretUpOutlined
					style={{
						color:
							queryParamsState.order === SortOrder.Asc &&
							queryParamsState.order_by === sortParam
								? '#1677ff'
								: 'rgba(0, 0, 0, 0.29)',
						fontSize: 12,
						height: 12,
						position: 'absolute',
						top: '-11px',
						width: 12,
					}}
				/>
				<CaretDownOutlined
					style={{
						color:
							queryParamsState.order === SortOrder.Desc &&
							queryParamsState.order_by === sortParam
								? '#1677ff'
								: 'rgba(0, 0, 0, 0.29)',
						fontSize: 12,
						height: 12,
						position: 'absolute',
						top: '-2px',
						width: 12,
					}}
				/>
			</span>
		)
	},
	sorter: true,
	title,
})
