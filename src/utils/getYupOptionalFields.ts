import { ObjectSchema } from 'yup'

// Getting all optional fields from Yup schema
export const getOptionalFields = (schema: ObjectSchema<any>): string[] =>
	Object.keys(schema.fields).filter((key: string) => {
		const field = schema.fields[key]
		const tests = (field as any).tests as Array<{
			OPTIONS: { name: string }
		}> // Workaround to access and work with internal tests array of Yup schema field
		// which includes details about validation rules applied to the field

		return tests.every((test) => test.OPTIONS.name !== 'required')
	})
