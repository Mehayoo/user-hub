import type { User, Country, Prisma } from '@prisma/client'
import { db } from '@/db'
import {
	ApiResponse,
	defaultQueryParamsMap,
	FilterParams,
	SessionStorage,
	SortParams,
} from '@/constants'

export type UserWithCountry = User & {
	country: Country | null
}

export const getAllUsersQuery = async (
	params: SessionStorage
): Promise<ApiResponse<UserWithCountry[]>> => {
	const { filterParams, queryParams, sortParams } = params
	const { page, page_size } = queryParams
	const { order, order_by } = sortParams

	let orderBy: Prisma.UserOrderByWithRelationInput = {}
	const skip: number =
		((page ?? defaultQueryParamsMap.queryParams.page) - 1) *
		(page_size ?? defaultQueryParamsMap.queryParams.page_size)

	if (order_by === SortParams.Country) {
		orderBy = {
			country: {
				name: order,
			},
		}
	} else {
		orderBy = {
			[order_by ?? defaultQueryParamsMap.sortParams.order_by]:
				order ?? defaultQueryParamsMap.sortParams.order,
		}
	}

	let filterObj: Record<string, any> = {}
	if (Object.keys(filterParams).length) {
		Object.entries(filterParams).forEach(([key, value]) => {
			if (key === FilterParams.Country) {
				filterObj.country = { is: { name: { contains: value } } }
			} else {
				filterObj[key] = { contains: value }
			}
		})
	}

	try {
		const count: number = await db.user.count({
			where: filterObj,
		})

		const users: UserWithCountry[] = await db.user.findMany({
			include: {
				country: true,
			},
			orderBy,
			skip: skip,
			take: page_size ?? defaultQueryParamsMap.queryParams.page_size,
			...(Object.keys(filterObj).length && { where: filterObj }),
		})

		return {
			data: users,
			count,
		}
	} catch (error: unknown) {
		console.error('Failed to get all users: ', error)

		throw error
	}
}

export const getUserByIdQuery = (
	userId: string
): Promise<UserWithCountry | null> => {
	try {
		return db.user.findFirst({
			include: {
				country: true,
			},
			where: { id: userId },
		})
	} catch (error: unknown) {
		console.error(`Failed to get user with id ${userId}: `, error)

		throw error
	}
}

export const addUserQuery = async (
	body: Omit<User, 'id' | 'created_at' | 'updated_at'>
): Promise<User> => {
	const existingUser: User | null = await db.user.findFirst({
		where: {
			AND: [{ user_name: body.user_name }],
		},
	})

	if (existingUser) {
		throw new Error('User name already exists')
	}

	try {
		return db.user.create({ data: body })
	} catch (error: unknown) {
		console.error('Failed to add user: ', error)

		throw error
	}
}

export const updateUserQuery = async (
	userId: string,
	body: Omit<User, 'id' | 'created_at' | 'updated_at'>
): Promise<User> => {
	const existingUser: User | null = await db.user.findFirst({
		where: {
			AND: [{ user_name: body.user_name }, { id: { not: userId } }],
		},
	})

	if (existingUser) {
		if (existingUser) {
			throw new Error('User name already exists')
		}
	}

	try {
		return db.user.update({
			where: {
				id: userId,
			},
			data: body,
		})
	} catch (error: unknown) {
		console.error(`Failed to update user with id ${userId}: `, error)

		throw error
	}
}

export const deleteUserQuery = (userId: string): Promise<User> => {
	try {
		return db.user.delete({
			where: {
				id: userId,
			},
		})
	} catch (error: unknown) {
		console.error(`Failed to delete user with id ${userId}: `, error)

		throw error
	}
}
