export const triggerRevalidation = async (path: string): Promise<void> => {
	try {
		await fetch(`/api/revalidate/?path=${path}`)
	} catch (error: unknown) {
		console.error('Failed to trigger revalidation: ', error)
	}
}
