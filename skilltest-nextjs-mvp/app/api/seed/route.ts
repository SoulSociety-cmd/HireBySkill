import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { User, Job } from '@/lib/models'
import bcrypt from 'bcryptjs'

export async function GET(request: Request) {
  await connectDB()
  
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (type === 'company') {
    const companyEmail = 'company@test.com'
    const password = 'test123'
    const hashed = bcrypt.hashSync(password, 12)

    const company = await User.findOneAndUpdate(
      { email: companyEmail },
      { 
        email: companyEmail,
        name: 'Test Company',
        password: hashed,
        role: 'company'
      },
      { upsert: true, new: true }
    )

    return NextResponse.json({ success: true, companyId: company._id })
  }

  if (type === 'jobs') {
    const companyEmail = 'company@test.com'
    const company = await User.findOne({ email: companyEmail })
    if (!company) return NextResponse.json({ error: 'Seed company first' }, { status: 400 })

    const jobsData = [
      {
        companyId: company._id,
        title: 'Frontend Developer',
        requiredSkills: { react: 85, js: 80, css: 70 },
        locationPref: 'Remote OK'
      },
      {
        companyId: company._id,
        title: 'Backend Engineer',
        requiredSkills: { node: 85, js: 80, db: 75 },
        locationPref: 'SF/NY'
      },
      {
        companyId: company._id,
        title: 'Fullstack',
        requiredSkills: { react: 80, node: 80, js: 85 },
        locationPref: 'Remote'
      }
    ]

    const jobs = await Job.insertMany(jobsData)
    return NextResponse.json({ success: true, jobs: jobs.length })
  }

  return NextResponse.json({ error: 'Invalid type. Use ?type=company or ?type=jobs' }, { status: 400 })
}
