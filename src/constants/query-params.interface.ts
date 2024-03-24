import { Filters } from './filters.interface'
import { SortOrder } from './sort-order.enum'
import { SortParams } from './sort-params.enum'

export interface QueryParams {
	page?: number
	page_size?: number
	order?: SortOrder
	order_by?: SortParams
	filters?: Filters
}
