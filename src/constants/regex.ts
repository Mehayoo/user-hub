export const REGEX_VALIDATION = {
	userName:
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#])[a-zA-Z0-9!@#]{4,80}$/,
	name: /^(?=.*[a-z])(?=.*[A-Z])(?=.*['])[a-zA-Z']{2,80}$/,
	phone: /^\d{7,9}$/,
}
