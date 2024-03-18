import { NextRequest, NextResponse } from 'next/server'
import { getAllCountriesQuery } from '@/db/queries/countries'
import type { Country } from '@prisma/client'

export async function GET(req: NextRequest) {
	const secretToken = process.env.NEXT_PUBLIC_SECRET_TOKEN as string

	const { searchParams } = new URL(req.url)
	const secret = searchParams.get('secret') as string

	try {
		if (secret === secretToken) {
			const countries: Country[] = await getAllCountriesQuery()

			return Response.json(countries)
		} else {
			return NextResponse.json(
				{ error: 'Invalid token' },
				{ status: 401 }
			)
		}
	} catch (error: unknown) {
		console.error('Failed to fetch countries: ', error)

		return NextResponse.json(
			{ error: 'Failed to fetch countries' },
			{ status: 500 }
		)
	}
}
