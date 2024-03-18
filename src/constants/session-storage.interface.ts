import { FilterParams } from './filter-params.enum'
import { SortOrder } from './sort-order.enum'
import { SortParams } from './sort-params.enum'

export interface SessionStorage {
	queryParams: {
		page: number
		page_size: number
	}
	filterParams: Partial<Record<FilterParams, string>>
	sortParams: {
		order: SortOrder
		order_by: SortParams
	}
}
