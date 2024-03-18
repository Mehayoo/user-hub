import { ApiResponse } from '@/constants'
import { UserWithCountry } from '@/db/queries/users'

export interface UsersTableProps {
	readonly tableData: ApiResponse<UserWithCountry[]>
}
