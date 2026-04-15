import { ISubmission } from './models'
import type { HydratedDocument } from 'mongoose';

type SubmissionDoc = HydratedDocument<ISubmission>;

export interface RequiredSkills {
  [skill: string]: number // skill: required score
}

export interface SkillFitResult {
  skillFit: number
  technical: number
  speed: number
  consistency: number
  freshness: number
  tests: Array<{ name: string; score: number }>
}

export function calculateSkillFit(
  submissions: Submission[],
  requiredSkills: RequiredSkills,
  jobTestIds?: string[], // filter to job-related tests
  allSubs?: Submission[] // for averages/consistency
): SkillFitResult {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  // Filter relevant subs (all or jobTestIds)
  const relevantSubs = submissions.filter(s => 
    !jobTestIds || jobTestIds.includes(s.testId)
  )

  // Technical 50%: avg score on required skills tests vs reqs
  const skillScores: number[] = []
  relevantSubs.forEach(sub => {
    // Map testId to skills (extendable)
    const testSkills = getSkillsFromTestId(sub.testId)
    Object.keys(requiredSkills).forEach(skill => {
      if (testSkills.includes(skill)) {
        const req = requiredSkills[skill]
        const normalized = Math.min(100, Math.max(0, (sub.score / req) * 100))
        skillScores.push(normalized)
      }
    })
  })
  const technical = skillScores.length ? skillScores.reduce((a,b)=>a+b,0) / skillScores.length : 0

  // Speed 20%: avg time < avg_all *1.2
  const userAvgTime = relevantSubs.reduce((sum, s)=>sum + s.timeTaken, 0) / Math.max(1, relevantSubs.length)
  const globalAvgTime = allSubs?.filter(s => relevantSubs.some(rs => rs.testId === s.testId))
    ?.reduce((sum, s)=>sum + s.timeTaken, 0) / Math.max(1, allSubs!.length) || 900
  const speedFactor = userAvgTime < globalAvgTime * 1.2 ? 100 : Math.max(0, 100 - ((userAvgTime / (globalAvgTime * 1.2)) - 1) * 100)
  const speed = speedFactor

  // Consistency 20%: #tests >=80% / min(5, total)
  const consistentTests = allSubs?.filter(s => s.score >= 80) || []
  const consistency = Math.min(5, consistentTests.length) / 5 * 100

  // Freshness 10%: recent tests <30 days
  const recentTests = relevantSubs.filter(s => s.createdAt! > thirtyDaysAgo).length
  const totalRelevant = Math.max(1, relevantSubs.length)
  const freshness = (recentTests / totalRelevant) * 100

  const skillFit = Math.round(
    technical * 0.5 + speed * 0.2 + consistency * 0.2 + freshness * 0.1
  )

  const tests = relevantSubs.slice(0,5).map(s => ({
    name: s.testId!,
    score: s.score!
  }))

  return { skillFit, technical, speed, consistency, freshness, tests }
}

function getSkillsFromTestId(testId: string): string[] {
  // Production: from Job or Test model
  // MVP mapping
  const mapping: Record<string, string[]> = {
    'calculator-js': ['js', 'math'],
    'todo-frontend': ['react', 'js', 'dom'],
    'api-fetch': ['js', 'api'],
    'fizzbuzz-py': ['python', 'logic'],
    'palindrome': ['js', 'string'],
    // Extend with all testCases
  }
  return mapping[testId] || ['general']
}

