import { Country } from '@prisma/client'

export interface BaseUser {
	user_name: string
	first_name: string
	last_name: string
	gender: string | null
	birthday: Date
	address: string | null
	city: string | null
	newsletter_register: boolean | null
	country_id: string | null
	country: Country | null
	phone: string | null
	details: string | null
	hobbies: string | null
}
