import mongoose, { Schema, models, model } from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  name?: string;
  password?: string;
  role?: 'student' | 'company';
  score?: number;
  badge?: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: String,
  password: String,
  score: { type: Number, default: 0 },
  badge: String,
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
  userId: string;
  testId: string;
  companyId?: mongoose.Types.ObjectId;
  code: string;
  score: number;
  results: any;
  timeTaken: number;
}

const submissionSchema = new Schema<ISubmission>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  testId: { type: String },
  companyId: { type: Schema.Types.ObjectId, ref: 'User' },
  language: { type: String, default: 'js' },
  code: String,
  score: Number,
  results: Object,
  timeTaken: Number,
});

export const Submission = models.Submission || model<ISubmission>('Submission', submissionSchema);
