import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
	addUserQuery,
	getAllUsersQuery,
	UserWithCountry,
} from '@/db/queries/users'
import { zodUserSchema } from '@/db/schema/user.schema'
import {
	ApiResponse,
	filterFieldsMap,
	Filters,
	SortOrder,
	SortParams,
} from '@/constants'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)

	const orderValue = searchParams.get('order') as string
	const order: SortOrder = Object.values(SortOrder).includes(
		orderValue as SortOrder
	)
		? (orderValue as SortOrder)
		: SortOrder.Desc

	const orderByValue = searchParams.get('order_by') as string
	const orderBy: SortParams = Object.values(SortParams).includes(
		orderByValue as SortParams
	)
		? (orderByValue as SortParams)
		: SortParams.CreatedAt

	const paramsObj = {
		order,
		order_by: orderBy,
		page: Number(searchParams.get('page')),
		page_size: Number(searchParams.get('page_size')),
	}

	const filterParams: Filters = filterFieldsMap.reduce((acc, field) => {
		const value = searchParams.get(field)

		if (value) acc[field] = value
		return acc
	}, {} as Filters)

	try {
		const users: ApiResponse<UserWithCountry[]> = await getAllUsersQuery({
			...paramsObj,
			filters: filterParams,
		})

		return Response.json(users)
	} catch (error: unknown) {
		console.error('Failed to fetch users: ', error)

		return NextResponse.json(
			{ error: 'Failed to fetch users' },
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()

		const parsedBody = zodUserSchema.parse(body)

		const response = await addUserQuery(parsedBody)

		return NextResponse.json(response, { status: 201 })
	} catch (error: unknown) {
		console.error('Failed to add user: ', error)

		const status = error instanceof z.ZodError ? 400 : 500

		const errorMessage =
			error instanceof z.ZodError
				? error.errors
				: error instanceof Error
				? error.message
				: 'Failed to add user'

		return NextResponse.json({ error: errorMessage }, { status })
	}
}
