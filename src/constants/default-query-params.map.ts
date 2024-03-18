import { SessionStorage } from './session-storage.interface'
import { SortOrder } from './sort-order.enum'
import { SortParams } from './sort-params.enum'

export const defaultQueryParamsMap: SessionStorage = {
	filterParams: {},
	queryParams: {
		page: 1,
		page_size: 5,
	},
	sortParams: {
		order_by: SortParams.CreatedAt,
		order: SortOrder.Desc,
	},
}
