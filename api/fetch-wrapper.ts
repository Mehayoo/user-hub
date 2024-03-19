enum METHOD {
	Get = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}

export const fetchWrapper = () => {
	const request =
		(method: METHOD) =>
		async (url: string, body?: any): Promise<any> => {
			const options: RequestInit = {
				method,
			}

			if (body) {
				options.headers = { 'Content-Type': 'application/json' }
				options.body = JSON.stringify(body)
			}

			try {
				const response: Response = await fetch(url, options)

				return await handleResponse(response)
			} catch (error: unknown) {
				console.error('Request error: ', error)

				throw error
			}
		}

	return {
		get: request(METHOD.Get),
		post: request(METHOD.POST),
		patch: request(METHOD.PATCH),
		delete: request(METHOD.DELETE),
	}
}

const handleResponse = async (response: Response): Promise<any> =>
	// Using response.text() to ensure that the response body can be captured and handled as plain text,
	// regardless of its content type (not all http responses return json content)
	response.text().then((text: string) => {
		let data

		try {
			data = text ? JSON.parse(text) : {}
		} catch (error: unknown) {
			console.error(error)

			return Promise.reject(error)
		}

		if (!response.ok) {
			const error = (data && data.error) || response.statusText
			console.error(error)

			return Promise.reject(new Error(error)) // Ensuring errors are always instances of Error to
			// maintain consistency in how errors are handled
		}

		return data
	})
