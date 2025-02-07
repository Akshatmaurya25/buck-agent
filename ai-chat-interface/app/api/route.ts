// app/api/route.ts
import { NextResponse } from 'next/server'
import runagent from '../../../src'

// POST handler
export async function POST(request: Request) {
  try {
    const body = await request.json()
  const response = await runagent(body)
    console.log()
    return NextResponse.json(
      { message: 'Data added successfully', data: response },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add data' },
      { status: 500 }
    )
  }
}