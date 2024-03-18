import { Spin } from 'antd'
import UserEditForm from '@/components/UserEditForm/UserEditForm'
import { getUserByIdQuery } from '@/db/queries/users'
import { getAllCountriesQuery } from '@/db/queries/countries'

interface UserEditPageProps {
	params: {
		id: string
	}
}

export default async function UserEditPage({ params }: UserEditPageProps) {
	const { id } = params

	try {
		const [countriesList, user] = await Promise.all([
			getAllCountriesQuery(),
			getUserByIdQuery(id),
		])

		return (
			<>
				{countriesList && user ? (
					<UserEditForm countriesList={countriesList} user={user} />
				) : (
					<Spin size="large" />
				)}
			</>
		)
	} catch (error: unknown) {
		console.error(
			`An error occurred while fetching countries or user with ${id}: `,
			error
		)

		throw new Error(
			`An error occurred while fetching countries or user with ${id}`
		)
	}
}
