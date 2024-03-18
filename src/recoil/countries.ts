import { selector } from 'recoil'
import type { Country } from '@prisma/client'

export const countriesSelector = selector<Country[]>({
	key: 'countriesSelector',
	get: async () => {
		try {
			const response: Response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/countries?secret=${process.env.NEXT_PUBLIC_SECRET_TOKEN}`
			)
			const json: Country[] = await response.json()

			return json
		} catch (error: unknown) {
			console.error('Failed to get countries: ', error)

			throw error
		}
	},
})
