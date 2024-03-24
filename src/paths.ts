import { constructQueryString } from './utils/constructQueryString'
import { SessionStorage } from './constants'

const paths = {
	home(arg?: SessionStorage): string {
		const queryString: string = constructQueryString(arg)

		return queryString ? `/?${queryString}` : '/'
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
			const queryString: string = constructQueryString(params)

			return `/api/users${queryString && `?${queryString}`}`
		}
	},
}

export default paths
