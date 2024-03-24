import { SessionStorage } from '@/constants'

export const constructQueryString = (params?: SessionStorage): string => {
	if (!params) return ''

	const { filters, page, ...rest } = params

	const pageValue: number = Object.keys(filters.params).length
		? filters.page
		: page
	const pageParam: [string, number] = ['page', pageValue]

	const allParams = [
		...Object.entries(rest),
		...Object.entries(filters.params),
		pageParam,
	]

	return allParams
		.map(
			([key, value]) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(value)}`
		)
		.join('&')
}
