import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
	deleteUserQuery,
	getUserByIdQuery,
	updateUserQuery,
	UserWithCountry,
} from '@/db/queries/users'
import { zodUserSchema } from '@/db/schema/user.schema'

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params

	try {
		if (id) {
			const users = (await getUserByIdQuery(id)) as UserWithCountry

			return Response.json(users)
		}
	} catch (error: unknown) {
		console.error(`Failed to fetch user with id ${id}: `, error)

		return NextResponse.json(
			{ error: `Failed to fetch user with id ${id}` },
			{ status: 500 }
		)
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params

	try {
		const body = await req.json()

		const parsedBody = zodUserSchema.parse(body)

		const response = await updateUserQuery(id, parsedBody)

		return NextResponse.json(response, { status: 200 })
	} catch (error: unknown) {
		console.error(`Failed to update user with id ${id}: `, error)

		const status = error instanceof z.ZodError ? 400 : 500

		const errorMessage =
			error instanceof z.ZodError
				? error.errors
				: error instanceof Error
				? error.message
				: `Failed to update user with id ${id}`

		return NextResponse.json({ error: errorMessage }, { status })
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params

	try {
		await deleteUserQuery(id)

		return NextResponse.json('Deleted', { status: 200 })
	} catch (error: unknown) {
		console.error(`Failed to delete user with id ${id}: `, error)

		return NextResponse.json(
			{ error: `Failed to delete user with id ${id}` },
			{ status: 500 }
		)
	}
}
