import { OnFormSubmit } from '@/components/UserModal/types'

// Due to Yup's validation only including fields that have value,
// iterate through optional fields and add null if value is undefined
export const transformData = (
	data: Record<string, string | null | boolean | Date>,
	optionalFields: string[]
) => {
	const transformedData = { ...data }

	optionalFields.forEach((field: string) => {
		if (transformedData[field] === undefined) {
			transformedData[field] = null
		}
	})

	return transformedData as Record<
		keyof OnFormSubmit,
		OnFormSubmit[keyof OnFormSubmit] | null
	> & { country?: string }
}
