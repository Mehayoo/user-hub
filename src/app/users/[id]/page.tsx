import UserShow from '@/components/UserShow/UserShow'
import { Spin } from 'antd'
import { UserWithCountry, getUserByIdQuery } from '@/db/queries/users'

interface UserShowPageProps {
	params: {
		id: string
	}
}

export default async function UserShowPage({ params }: UserShowPageProps) {
	const { id } = params
	let user: UserWithCountry | null

	try {
		user = await getUserByIdQuery(id)
	} catch (error: unknown) {
		console.error(
			`Something went wrong while trying to get user with id ${id}: `,
			error
		)

		throw new Error(
			`Something went wrong while trying to get user with id ${id}}`
		)
	}

	return <>{user ? <UserShow user={user} /> : <Spin size="large" />}</>
}
