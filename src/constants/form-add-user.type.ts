import { User } from '@prisma/client'
import { OptionalNullable } from './optional-nullable.type'

export type EditableUser = Omit<User, 'id' | 'created_at' | 'updated_at'>

export type FormAddUser = OptionalNullable<EditableUser>
