import { SessionStorage } from './session-storage.interface'
import { SortOrder } from './sort-order.enum'
import { SortParams } from './sort-params.enum'

export const defaultQueryParamsMap: SessionStorage = {
	page: 1,
	page_size: 5,
	order_by: SortParams.CreatedAt,
	order: SortOrder.Desc,
	filters: {
		params: {},
		page: 0,
	},
}
