import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { User } from '@/lib/models'
import bcrypt from 'bcryptjs'

export async function GET(request: Request) {
  await connectDB()
  
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (type === 'company') {
    // Create or update company user
    const companyEmail = 'company@test.com'
    const password = 'test123'
    const hashed = bcrypt.hashSync(password, 12)

    await User.findOneAndUpdate(
      { email: companyEmail },
      { 
        email: companyEmail,
        name: 'Test Company',
        password: hashed,
        role: 'company'
      },
      { upsert: true, new: true }
    )

    return NextResponse.json({ success: true, message: `Company user created/updated: ${companyEmail}/${password}` })
  }

  return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
}

