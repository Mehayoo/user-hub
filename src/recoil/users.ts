import { atom } from 'recoil'
import { ApiResponse } from '@/constants'
import { UserWithCountry } from '@/db/queries/users'

const usersAtom = atom<ApiResponse<UserWithCountry[]> | null>({
	key: 'users',
	default: null,
})

const userAtom = atom<UserWithCountry | null>({
	key: 'user',
	default: null,
})

export { usersAtom, userAtom }
