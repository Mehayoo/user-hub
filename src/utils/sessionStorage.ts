import { SessionStorage, defaultQueryParamsMap } from '@/constants'

export const getSessionStorage = (key: string): SessionStorage => {
	if (typeof window !== 'undefined') {
		const storedValue = sessionStorage.getItem(key)

		if (storedValue) {
			return JSON.parse(storedValue)
		}
	}

	return defaultQueryParamsMap
}

export const setSessionStorage = (key: string, value: SessionStorage): void => {
	if (typeof window !== 'undefined') {
		const stringValue = JSON.stringify(value)

		sessionStorage.setItem(key, stringValue)
	}
}
