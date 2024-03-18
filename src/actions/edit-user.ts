'use server'

import { redirect } from 'next/navigation'
import { db } from '@/db'
import paths from '@/paths'
import { zodUserSchema } from '@/db/schema/user.schema'
import { EditableUser } from '@/constants'
import { updateUserQuery } from '@/db/queries/users'
import { User } from '@prisma/client'

interface EditUserFormState {
	errors: {
		user_name?: string[]
		first_name?: string[]
		last_name?: string[]
		birthday?: string[]
		_form?: string[]
	}
}

export async function editUserAction(
	id: string,
	formState: EditUserFormState,
	formData: EditableUser
): Promise<EditUserFormState> {
	const result = zodUserSchema.safeParse(formData)

	if (!result.success) {
		return {
			errors: result.error.flatten().fieldErrors,
		}
	}

	const existingUser: User | null = await db.user.findFirst({
		where: {
			AND: [{ user_name: formData.user_name }, { id: { not: id } }],
		},
	})

	if (existingUser) {
		return {
			errors: {
				_form: ['Username already exists'],
			},
		}
	}

	try {
		await updateUserQuery(id, formData)
	} catch (err: unknown) {
		if (err instanceof Error) {
			return {
				errors: {
					_form: [err.message],
				},
			}
		} else {
			return {
				errors: {
					_form: ['Failed to update user'],
				},
			}
		}
	}

	redirect(paths.userShow(id))
}
