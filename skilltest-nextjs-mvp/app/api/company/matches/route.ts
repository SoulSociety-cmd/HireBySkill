import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { Submission, Job } from '@/lib/models'
import { calculateSkillFit, RequiredSkills } from '@/lib/skillMatch'

export async function GET(req: Request) {
  await connectDB()
  
  const { searchParams } = new URL(req.url)
  const jobId = searchParams.get('jobId')
  const companyId = searchParams.get('companyId')
  const minFit = parseInt(searchParams.get('minFit') || '70')

  if (!jobId && !companyId) {
    return NextResponse.json({ error: 'jobId or companyId required' }, { status: 400 })
  }

  let requiredSkills: RequiredSkills = { js: 80, react: 85 } // default
  if (jobId) {
    const job = await Job.findById(jobId)
    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    requiredSkills = job.requiredSkills as RequiredSkills
  }

  // All company submissions for context
  const matchQuery = companyId ? { companyId } : {}
  const allSubs = await Submission.find(matchQuery).sort({ createdAt: -1 }).lean()

  // Group by student
  const studentSubs = new Map<string, any[]>()
  allSubs.forEach(sub => {
    const sid = sub.userId.toString()
    if (!studentSubs.has(sid)) studentSubs.set(sid, [])
    studentSubs.get(sid)!.push(sub)
  })

  const matches: Array<{
    studentId: string
    skillFit: number
    tests: {name: string, score: number}[]
    rank: number
  }> = []

  studentSubs.forEach((subs, studentId) => {
    // Filter relevant for job skills
    const relevant = subs.filter(s => getTestSkills(s.testId).some(sk => requiredSkills[sk]))
    if (relevant.length === 0) return

    const fit = calculateSkillFit(relevant, requiredSkills, undefined, subs)

    if (fit.skillFit >= minFit) {
      matches.push({
        studentId,
        skillFit: fit.skillFit,
        tests: fit.tests,
        rank: 0 // temp
      })
    }
  })

  // Rank
  matches.sort((a, b) => b.skillFit - a.skillFit)
  matches.forEach((m, i) => m.rank = i + 1)

  return NextResponse.json(matches.slice(0, 10))
}

function getTestSkills(testId: string): string[] {
  const map: Record<string, string[]> = {
    'calculator-js': ['js', 'math'],
    'todo-frontend': ['react', 'js'],
    'api-fetch': ['js', 'api'],
    'palindrome': ['js'],
    // ...
  }
  return map[testId] || ['general']
}
