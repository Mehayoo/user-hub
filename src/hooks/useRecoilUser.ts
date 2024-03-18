import { useSetRecoilState, useResetRecoilState } from 'recoil'
import { usersAtom, userAtom, queryParamsAtom } from '@/recoil'
import { fetchWrapper } from '../../api/fetch-wrapper'
import { useRecoilAlert } from '.'
import { UserWithCountry } from '@/db/queries/users'
import { mergeWithDefaultParams } from '@/utils'
import paths from '@/paths'
import { FormAddUser, FormEditUser, SessionStorage } from '@/constants'

export const useRecoilUser = () => {
	const setUsers = useSetRecoilState(usersAtom)
	const setUser = useSetRecoilState(userAtom)

	const setQueryParamsState = useSetRecoilState(queryParamsAtom)

	const alertActions = useRecoilAlert()

	const getAllUsers = async (params: SessionStorage): Promise<void> => {
		const mergedParams: SessionStorage = mergeWithDefaultParams(params)

		try {
			await fetchWrapper()
				.get(paths.apiUsers({ params: mergedParams }))
				.then(setUsers)
				.then(() => {
					setQueryParamsState(mergedParams)
				})
		} catch (error: unknown) {
			console.error('Failed to get all users: ', error)

			alertActions.error(
				error instanceof Error ? error.message : String(error)
			)

			throw error
		}
	}

	const getUserById = async (id: string): Promise<void> => {
		try {
			const user: UserWithCountry | null = await fetchWrapper().get(
				paths.apiUsers({ id })
			)

			setUser(user)
		} catch (error: unknown) {
			console.error(`Failed to get user with ${id}: `, error)

			alertActions.error(
				error instanceof Error ? error.message : String(error)
			)

			throw error
		}
	}

	const addUser = async (body: FormAddUser): Promise<void> => {
		try {
			await fetchWrapper().post(paths.apiUsers({}), body)
		} catch (error: unknown) {
			console.error(`Failed to add user: `, error)

			alertActions.error(
				error instanceof Error ? error.message : String(error)
			)

			throw error
		}
	}

	const updateUser = async (
		id: string,
		body: FormEditUser
	): Promise<void> => {
		try {
			await fetchWrapper().patch(paths.apiUsers({ id }), body)
		} catch (error: unknown) {
			console.error(`Failed to update user with ${id}: `, error)

			alertActions.error(
				error instanceof Error ? error.message : String(error)
			)

			throw error
		}
	}

	const deleteUser = async (id: string): Promise<void> => {
		try {
			await fetchWrapper().delete(paths.apiUsers({ id }))
		} catch (error: unknown) {
			console.error(`Failed to delete user with ${id}: `, error)

			alertActions.error(
				error instanceof Error ? error.message : String(error)
			)

			throw error
		}
	}

	return {
		getAllUsers,
		getUserById,
		addUser,
		updateUser,
		deleteUser,
		resetUser: useResetRecoilState(userAtom),
	}
}
