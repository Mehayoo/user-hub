import { SessionStorage } from './constants'

const paths = {
	home(params?: SessionStorage): string {
		const allParams = [
			...Object.entries(params?.queryParams || {}),
			...Object.entries(params?.filterParams || {}),
			...Object.entries(params?.sortParams || {}),
		]

		const queryString: string = allParams
			.map(
				([key, value]) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(value)}`
			)
			.join('&')

		if (queryString.length) {
			return `/?${queryString}`
		}
		return '/'
	},
	userShow(id: string): string {
		return `/users/${id}`
	},
	userEdit(id: string): string {
		return `/users/edit/${id}`
	},
	about(): string {
		return '/about'
	},
	apiCountries(): string {
		return '/api/countries'
	},
	apiRevalidate(): string {
		return '/api/revalidate'
	},
	apiUsers({ id, params }: { id?: string; params?: SessionStorage }): string {
		if (id) {
			return `/api/users/${id}`
		} else {
			let queryString: string = ''
			if (params) {
				const allParams = [
					...Object.entries(params.queryParams || {}),
					...Object.entries(params.sortParams || {}),
					...Object.entries(params.filterParams || {}),
				]

				queryString = allParams
					.map(
						([key, value]) =>
							`${encodeURIComponent(key)}=${encodeURIComponent(
								value
							)}`
					)
					.join('&')
			}

			queryString = queryString.length ? `?${queryString}` : ''

			return `/api/users${queryString}`
		}
	},
}

export default paths
