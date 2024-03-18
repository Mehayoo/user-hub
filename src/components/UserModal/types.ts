import { FormEditUser, FormAddUser } from '@/constants'

export interface UserModalProps {
	readonly open: boolean
	readonly setOpen: (open: boolean) => void
	readonly userId?: string
}

export type OnFormSubmit = (FormEditUser | FormAddUser) & {
	country_prefix?: string
}
