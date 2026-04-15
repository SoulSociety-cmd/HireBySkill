import mongoose, { Schema, models, model } from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  name?: string;
  password?: string;
  role?: 'student' | 'company';
  score?: number;
  badge?: string;
  location?: string;
  availability?: string;
  skills?: string[];
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: String,
  password: String,
  score: { type: Number, default: 0 },
  badge: String,
  location: String,
  availability: String,
  skills: [String],
});

export const User = models.User || model<IUser>('User', userSchema);

export interface ITest extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  companyId: mongoose.Types.ObjectId;
  price: number;
  testCases: Array<{ input: [number, string, number], expected: number }>;
}

const testSchema = new Schema<ITest>({
  title: String,
  description: String,
  companyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, default: 10 },
  testCases: [{
    input: Schema.Types.Mixed,
    expected: Number,
  }],
});

export const Test = models.Test || model<ITest>('Test', testSchema);

export interface ISubmission extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  testId: string;
  companyId?: mongoose.Types.ObjectId;
  code: string;
  score: number;
  results: any;
  timeTaken: number;
  language: string;
  createdAt?: Date;
}

const submissionSchema = new Schema<ISubmission>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: String, required: true },
  companyId: { type: Schema.Types.ObjectId, ref: 'User' },
  language: { type: String, default: 'js' },
  code: { type: String, required: true },
  score: { type: Number, required: true },
  results: Object,
  timeTaken: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Submission = models.Submission || model<ISubmission>('Submission', submissionSchema);

export interface IJob extends mongoose.Document {
  companyId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  requiredSkills: Record<string, number>;
  locationPref?: string;
  deadline?: Date;
}

const jobSchema = new Schema<IJob>({
  companyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  requiredSkills: { type: Map, of: Number, required: true },
  locationPref: String,
  deadline: Date,
});

export const Job = models.Job || model<IJob>('Job', jobSchema);
