import { z } from 'zod'
import dayjs from 'dayjs'
import { REGEX_VALIDATION, inputsErrors } from '@/constants'

export const zodUserSchema = z.object({
	user_name: z
		.string()
		.regex(REGEX_VALIDATION.userName, inputsErrors.invalidUserName),
	first_name: z
		.string()
		.regex(REGEX_VALIDATION.name, inputsErrors.invalidName),
	last_name: z
		.string()
		.regex(REGEX_VALIDATION.name, inputsErrors.invalidName),
	gender: z.string().nullable(),
	birthday: z.coerce.date().refine(
		(value) => {
			const eighteenYearsAgo = dayjs().subtract(18, 'year')

			return dayjs(value).isBefore(eighteenYearsAgo)
		},
		{ message: inputsErrors.underEighteen }
	),
	address: z.string().nullable(),
	city: z.string().nullable(),
	newsletter_register: z.boolean().optional().default(false),
	country_id: z.string().nullable(),
	phone: z
		.string()
		.nullable()
		.refine(
			(value: string | null) => {
				if (value && value.trim().length > 0) {
					return REGEX_VALIDATION.phone.test(value)
				}

				return true
			},
			{
				message: inputsErrors.phone,
			}
		),
	details: z.string().nullable(),
	hobbies: z.string().nullable(),
})
