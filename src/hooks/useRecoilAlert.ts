import { useSetRecoilState, useResetRecoilState } from 'recoil'
import { alertAtom } from '@/recoil'
import { AlertType } from '@/constants'

export const useRecoilAlert = () => {
	const setAlert = useSetRecoilState(alertAtom)
	const resetAlert = useResetRecoilState(alertAtom)

	return {
		success: (message: string) =>
			setAlert({ message, type: AlertType.Success }),
		error: (message: string) =>
			setAlert({ message, type: AlertType.Error }),
		resetAlert,
	}
}
