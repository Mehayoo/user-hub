import { faker as _faker } from '@faker-js/faker'
import { GENDER } from '../src/constants/index'
import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient()

const NUM_USERS: number = 3

const countries = [
	{ name: 'Australia', country_prefix: '+61' },
	{ name: 'Brazil', country_prefix: '+55' },
	{ name: 'China', country_prefix: '+86' },
	{ name: 'Egypt', country_prefix: '+20' },
	{ name: 'France', country_prefix: '+33' },
	{ name: 'Germany', country_prefix: '+49' },
	{ name: 'India', country_prefix: '+91' },
	{ name: 'Indonesia', country_prefix: '+62' },
	{ name: 'Italy', country_prefix: '+39' },
	{ name: 'Japan', country_prefix: '+81' },
	{ name: 'Mexico', country_prefix: '+52' },
	{ name: 'Romania', country_prefix: '+40' },
	{ name: 'Russia', country_prefix: '+7' },
	{ name: 'Saudi Arabia', country_prefix: '+966' },
	{ name: 'South Africa', country_prefix: '+27' },
	{ name: 'South Korea', country_prefix: '+82' },
	{ name: 'Spain', country_prefix: '+34' },
	{ name: 'Turkey', country_prefix: '+90' },
	{ name: 'United Kingdom', country_prefix: '+44' },
	{ name: 'United States', country_prefix: '+1' },
]

const generateUsername = () => {
	const baseUsername = _faker.person.firstName()

	// Append or prepend characters to satisfy the validation constraints
	const specialChars = ['!', '@', '#']
	const randomNumber: number = Math.floor(Math.random() * 10) // Random number between 0 and 9
	const specialChar =
		specialChars[Math.floor(Math.random() * specialChars.length)]

	const userName = `${baseUsername}${randomNumber}${specialChar}`

	return userName
}

const createUserData = () => {
	const userName = generateUsername()
	const firstName = `${_faker.person.firstName()}'`
	const lastName = `${_faker.person.lastName()}'`
	const genderValues = Object.values(GENDER) // ['male', 'female']
	const gender = _faker.helpers.arrayElement(genderValues)
	const birthday = _faker.date.birthdate().toISOString().split('T')[0]
	const address = _faker.location.streetAddress({
		useFullAddress: true,
	})
	const city = _faker.location.city()
	const newsletterRegister = Math.random() > 0.5

	const countryIndex = Math.floor(Math.random() * countries.length)
	const country = countries[countryIndex].name
	const country_prefix = countries[countryIndex].country_prefix
	const phone = `${Math.floor(Math.random() * 999000000) + 1000000}` // 1.000.000 to 999.999.999 range

	const details = _faker.person.bio()
	const hobbies = _faker.lorem.words()

	return {
		userName,
		firstName,
		lastName,
		gender,
		birthday,
		address,
		city,
		newsletterRegister,
		country,
		country_prefix,
		phone,
		details,
		hobbies,
	}
}

const seed = async () => {
	const existingCountries = await db.country.count()
	if (existingCountries === 0) {
		for (const country of countries) {
			await db.country.create({
				data: {
					name: country.name,
					country_prefix: country.country_prefix,
				},
			})
		}
	} else {
		console.log('Countries already seeded')
	}

	const existingUsers = await db.user.count()
	if (existingUsers === 0) {
		for (let i = 0; i < NUM_USERS; i++) {
			const userData = createUserData()
			const country = await db.country.findUnique({
				where: { name: userData.country },
			})

			await db.user.create({
				data: {
					user_name: userData.userName,
					first_name: userData.firstName,
					last_name: userData.lastName,
					gender: userData.gender,
					birthday: new Date(userData.birthday),
					address: userData.address,
					city: userData.city,
					newsletter_register: userData.newsletterRegister,
					country_id: country?.id,
					phone: userData.phone,
					details: userData.details,
					hobbies: userData.hobbies,
				},
			})
		}
	} else {
		console.log('Users already seeded')
	}
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await db.$disconnect()
	})
