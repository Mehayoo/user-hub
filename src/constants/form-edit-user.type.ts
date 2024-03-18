import { User } from '@prisma/client'
import { OptionalNullable } from './optional-nullable.type'

export type FormEditUser = OptionalNullable<
	Omit<User, 'created_at' | 'updated_at'>
> & {
	country?: string
	country_prefix?: string
}
