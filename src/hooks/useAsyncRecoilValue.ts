import { useState, useEffect } from 'react'
import { Loadable, RecoilValueReadOnly, useRecoilValueLoadable } from 'recoil'

export const useAsyncRecoilValue = <T>(
	state: RecoilValueReadOnly<T>
): T | null => {
	const [data, setData] = useState<T | null>(null)

	const loadable: Loadable<T> = useRecoilValueLoadable(state)

	useEffect(() => {
		if (loadable.state === 'hasValue') {
			setData(loadable.contents)
		}
	}, [loadable])

	return data
}
