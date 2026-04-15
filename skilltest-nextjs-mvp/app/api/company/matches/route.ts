import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import { Submission } from '@/lib/models'

export async function GET(req: Request) {
  await connectDB()
  
  const { searchParams } = new URL(req.url)
  const companyId = searchParams.get('companyId')
  const minScore = parseInt(searchParams.get('minScore') || '70')
  
  if (!companyId) {
    return NextResponse.json({ error: 'companyId required' }, { status: 400 })
  }

  // Matching algo: high score + recent submissions
  const matches = await Submission.aggregate([
    { $match: { companyId, score: { $gte: minScore } } },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
    { $addFields: {
        matchScore: {
          $add: [
            { $multiply: ['$score', 0.7] },
            { $subtract: [100, { $multiply: [{ $divide: [{ $subtract: [new Date(), '$createdAt'], $const: 1 }], 86400000 ] }, 0.3 ] } ] // recency
        ]
      }
    },
    { $sort: { matchScore: -1 } },
    { $limit: 20 },
    {
      $project: {
        _id: 1,
        user: { _id: 1, name: 1, email: 1 },
        score: 1,
        matchScore: 1,
        testId: 1,
        timeTaken: 1
      }
    }
  ])

  return NextResponse.json(matches)
}

