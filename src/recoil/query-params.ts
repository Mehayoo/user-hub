import { atom } from 'recoil'
import { getSessionStorage, setSessionStorage } from '../utils/sessionStorage'
import { SessionStorage } from '@/constants'

export const queryParamsAtom = atom<SessionStorage>({
	key: 'queryParamsAtom',
	default: getSessionStorage(
		process.env.NEXT_PUBLIC_SESSION_STORAGE_KEY as string
	),
	effects: [
		({ onSet, setSelf }) => {
			onSet((newValue: SessionStorage) => {
				setSessionStorage(
					process.env.NEXT_PUBLIC_SESSION_STORAGE_KEY as string,
					newValue
				)
			})

			setSelf(
				getSessionStorage(
					process.env.NEXT_PUBLIC_SESSION_STORAGE_KEY as string
				)
			)
		},
	],
})
