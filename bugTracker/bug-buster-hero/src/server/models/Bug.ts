
import mongoose, { Schema, Document } from 'mongoose';
import { Bug as BugType } from '@/lib/types';

export interface IBug extends Omit<BugType, 'id'>, Document {
  // The MongoDB _id will replace the id field
}

const BugSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open'
  },
  priority: { 
    type: String, 
    required: true,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  reportedBy: { type: String, required: true },
  assignedTo: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
BugSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IBug>('Bug', BugSchema);
