import UsersTable from '@/components/UsersTable/UsersTable'
import { UserWithCountry, getAllUsersQuery } from '@/db/queries/users'
import { ApiResponse, defaultQueryParamsMap } from '@/constants'

export default async function UsersShow() {
	let initialData: ApiResponse<UserWithCountry[]>

	try {
		initialData = await getAllUsersQuery(defaultQueryParamsMap)
	} catch (error: unknown) {
		console.error('Something went wrong while trying to get users: ', error)

		throw new Error('Something went wrong while trying to get users')
	}

	return <UsersTable tableData={initialData} />
}
