import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'

// Simple stub - in production use Resend, Nodemailer, etc.
export async function POST(req: Request) {
  const body = await req.json()
  const { email, testId, companyId } = body
  
  // Simulate email send
  console.log(`Invite sent to ${email} for test ${testId} from company ${companyId}`)
  
  return NextResponse.json({ success: true, message: 'Invite sent!' })
}

