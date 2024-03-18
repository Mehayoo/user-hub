import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(req: NextRequest) {
	const path = req.nextUrl.searchParams.get('path') as string

	if (path) {
		revalidatePath(path)
		return NextResponse.json({ now: Date.now(), revalidated: true })
	}

	return NextResponse.json({
		error: 'Missing path to revalidate',
		now: Date.now(),
		revalidated: false,
	})
}
