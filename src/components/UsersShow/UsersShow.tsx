import UsersTable from '@/components/UsersTable/UsersTable'
import { UserWithCountry, getAllUsersQuery } from '@/db/queries/users'
import { ApiResponse, defaultQueryParamsMap } from '@/constants'

export default async function UsersShow() {
	try {
		const initialData: ApiResponse<UserWithCountry[]> =
			await getAllUsersQuery({
				page: defaultQueryParamsMap.page,
				page_size: defaultQueryParamsMap.page_size,
				order_by: defaultQueryParamsMap.order_by,
				order: defaultQueryParamsMap.order,
			})

		return <UsersTable tableData={initialData} />
	} catch (error: unknown) {
		console.error('Something went wrong while trying to get users: ', error)

		throw new Error('Something went wrong while trying to get users')
	}
}
