import { defaultQueryParamsMap, SessionStorage } from '@/constants'

export const mergeWithDefaultParams = (
	arg: Partial<SessionStorage>
): SessionStorage => ({
	page: arg?.page ?? defaultQueryParamsMap.page,
	page_size: arg?.page_size ?? defaultQueryParamsMap.page_size,
	order: arg?.order ?? defaultQueryParamsMap.order,
	order_by: arg?.order_by ?? defaultQueryParamsMap.order_by,
	filters: {
		params:
			arg.filters?.params && Object.keys(arg.filters.params).length
				? arg.filters.params
				: {},
		page: arg.filters?.page ?? defaultQueryParamsMap.filters.page,
	},
})
