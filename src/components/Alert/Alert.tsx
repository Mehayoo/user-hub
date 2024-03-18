'use client'

import { useEffect } from 'react'
import { notification } from 'antd'
import { useRecoilValue } from 'recoil'
import { alertAtom } from '@/recoil'

const Alert = () => {
	const alert = useRecoilValue(alertAtom)

	useEffect(() => {
		if (alert) {
			notification[alert.type]({
				description: alert.message,
				duration: 2.5,
				message: alert.type,
			})
		}
	}, [alert])

	return null
}

export default Alert
