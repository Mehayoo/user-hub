import { atom } from 'recoil'
import { Alert } from '@/constants'

const alertAtom = atom<Alert | null>({
	key: 'alert',
	default: null,
})

export { alertAtom }
