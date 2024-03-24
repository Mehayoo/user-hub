import { SortOrder } from '@/constants'

export const mapAntdToPrismaSort = (order: 'ascend' | 'descend'): SortOrder => {
	switch (order) {
		case 'ascend':
			return SortOrder.Asc
		case 'descend':
			return SortOrder.Desc
	}
}
