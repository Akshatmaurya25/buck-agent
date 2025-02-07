// app/api/route.ts
import { NextResponse } from 'next/server'
import runagent from '../../game/src/index'

// POST handler
export async function POST(request: Request) {
  try {
    const body = await request.json()
  const response = await runagent(body)
    console.log("resbody",response)
    return NextResponse.json({
      message: 'Data added successfully',
      data: response,
      success:true
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add data' },
      { status: 500 }
    )
  }
}