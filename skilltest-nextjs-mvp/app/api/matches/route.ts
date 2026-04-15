import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { Submission, Job } from '@/lib/models'
import { calculateSkillFit, RequiredSkills } from '@/lib/skillMatch'

export async function GET(req: Request) {
  await connectDB()
  
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  
  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 })
  }

  // All jobs
  const jobs = await Job.find({}).lean()
  const allSubs = await Submission.find({ userId }).lean()

  const matches: Array<{
    jobId: string
    title: string
    skillFit: number
    tests: {name: string, score: number}[]
    rank: number
  }> = []

  jobs.forEach((job: any) => {
    const reqSkills = job.requiredSkills as RequiredSkills
    const fit = calculateSkillFit([allSubs as any], reqSkills, undefined, allSubs as any)
    
    if (fit.skillFit >= 70) {
      matches.push({
        jobId: job._id.toString(),
        title: job.title,
        skillFit: fit.skillFit,
        tests: fit.tests,
        rank: 0
      })
    }
  })

  matches.sort((a,b) => b.skillFit - a.skillFit)
  matches.forEach((m,i) => m.rank = i+1)

  return NextResponse.json(matches.slice(0,10))
}
