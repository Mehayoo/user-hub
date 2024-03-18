import { Country } from '@prisma/client'
import { UserWithCountry } from '@/db/queries/users'

export interface UserEditFormProps {
	readonly countriesList: Country[]
	readonly user: UserWithCountry
}
