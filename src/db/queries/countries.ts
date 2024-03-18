import type { Country } from '@prisma/client'
import { db } from '@/db'

export const getAllCountriesQuery = async (): Promise<Country[]> => {
	try {
		return db.country.findMany({})
	} catch (error: unknown) {
		console.error('Failed to get countries: ', error)

		throw error
	}
}
