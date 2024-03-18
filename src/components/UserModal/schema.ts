import * as Yup from 'yup'
import dayjs from 'dayjs'
import { REGEX_VALIDATION, inputsErrors } from '@/constants'

export const yupUserSchema = Yup.object().shape({
	user_name: Yup.string()
		.required(inputsErrors.required)
		.matches(REGEX_VALIDATION.userName, inputsErrors.invalidUserName),
	first_name: Yup.string()
		.required(inputsErrors.required)
		.matches(REGEX_VALIDATION.name, inputsErrors.invalidName),
	last_name: Yup.string()
		.required(inputsErrors.required)
		.matches(REGEX_VALIDATION.name, inputsErrors.invalidName),
	gender: Yup.string().optional(),
	birthday: Yup.date()
		.required(inputsErrors.required)
		.test(
			'is-18-years-ago-or-more',
			inputsErrors.underEighteen,
			function (value: Date): boolean {
				const today = dayjs()
				const eighteenYearsAgo = today.subtract(18, 'year')

				return dayjs(value).isBefore(eighteenYearsAgo)
			}
		),
	address: Yup.string().optional(),
	city: Yup.string().optional(),
	newsletter_register: Yup.boolean().optional(),
	country: Yup.string().optional(),
	country_prefix: Yup.string().optional(),
	phone: Yup.string().when(
		(
			value: string[] | undefined,
			schema: Yup.StringSchema<
				string | undefined,
				Yup.AnyObject,
				undefined,
				''
			>
		) =>
			value && value[0]?.length
				? schema.matches(REGEX_VALIDATION.phone, inputsErrors.phone)
				: schema.notRequired()
	),
	details: Yup.string().optional(),
	hobbies: Yup.string().optional(),
})
