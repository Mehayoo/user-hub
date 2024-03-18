import { defaultQueryParamsMap, SessionStorage } from '@/constants'

export const mergeWithDefaultParams = (
	params: Partial<SessionStorage>
): SessionStorage => ({
	queryParams: {
		page:
			params?.queryParams?.page ?? defaultQueryParamsMap.queryParams.page,
		page_size:
			params?.queryParams?.page_size ??
			defaultQueryParamsMap.queryParams.page_size,
	},
	filterParams:
		params?.filterParams && Object.keys(params.filterParams).length
			? params.filterParams
			: {},
	sortParams: {
		order:
			params?.sortParams?.order ?? defaultQueryParamsMap.sortParams.order,
		order_by:
			params?.sortParams?.order_by ??
			defaultQueryParamsMap.sortParams.order_by,
	},
})
