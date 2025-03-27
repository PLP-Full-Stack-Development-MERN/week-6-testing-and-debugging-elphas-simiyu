
import express from 'express';
import Bug from '../models/Bug';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

// Get all bugs
router.get('/', asyncHandler(async (req, res) => {
  const bugs = await Bug.find().sort({ updatedAt: -1 });
  
  // Transform to match frontend model (convert _id to id)
  const transformedBugs = bugs.map(bug => {
    const bugObj = bug.toObject();
    return {
      id: bugObj._id.toString(),
      title: bugObj.title,
      description: bugObj.description,
      status: bugObj.status,
      priority: bugObj.priority,
      reportedBy: bugObj.reportedBy,
      assignedTo: bugObj.assignedTo,
      createdAt: bugObj.createdAt,
      updatedAt: bugObj.updatedAt
    };
  });
  
  res.status(200).json(transformedBugs);
}));

// Get bug by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const bug = await Bug.findById(req.params.id);
  
  if (!bug) {
    return res.status(404).json({ message: 'Bug not found' });
  }
  
  // Transform to match frontend model
  const bugObj = bug.toObject();
  const transformedBug = {
    id: bugObj._id.toString(),
    title: bugObj.title,
    description: bugObj.description,
    status: bugObj.status,
    priority: bugObj.priority,
    reportedBy: bugObj.reportedBy,
    assignedTo: bugObj.assignedTo,
    createdAt: bugObj.createdAt,
    updatedAt: bugObj.updatedAt
  };
  
  res.status(200).json(transformedBug);
}));

// Create a new bug
router.post('/', asyncHandler(async (req, res) => {
  const newBug = await Bug.create(req.body);
  
  // Transform to match frontend model
  const bugObj = newBug.toObject();
  const transformedBug = {
    id: bugObj._id.toString(),
    title: bugObj.title,
    description: bugObj.description,
    status: bugObj.status,
    priority: bugObj.priority,
    reportedBy: bugObj.reportedBy,
    assignedTo: bugObj.assignedTo,
    createdAt: bugObj.createdAt,
    updatedAt: bugObj.updatedAt
  };
  
  res.status(201).json(transformedBug);
}));

// Update a bug
router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Find and update the bug
  const updatedBug = await Bug.findByIdAndUpdate(
    id,
    { ...req.body, updatedAt: new Date() },
    { new: true, runValidators: true }
  );
  
  if (!updatedBug) {
    return res.status(404).json({ message: 'Bug not found' });
  }
  
  // Transform to match frontend model
  const bugObj = updatedBug.toObject();
  const transformedBug = {
    id: bugObj._id.toString(),
    title: bugObj.title,
    description: bugObj.description,
    status: bugObj.status,
    priority: bugObj.priority,
    reportedBy: bugObj.reportedBy,
    assignedTo: bugObj.assignedTo,
    createdAt: bugObj.createdAt,
    updatedAt: bugObj.updatedAt
  };
  
  res.status(200).json(transformedBug);
}));

// Delete a bug
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const bug = await Bug.findByIdAndDelete(id);
  
  if (!bug) {
    return res.status(404).json({ message: 'Bug not found' });
  }
  
  res.status(200).json({ message: 'Bug deleted successfully' });
}));

// Update bug status
router.patch('/:id/status', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  if (!['open', 'in-progress', 'resolved'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }
  
  const updatedBug = await Bug.findByIdAndUpdate(
    id,
    { status, updatedAt: new Date() },
    { new: true, runValidators: true }
  );
  
  if (!updatedBug) {
    return res.status(404).json({ message: 'Bug not found' });
  }
  
  // Transform to match frontend model
  const bugObj = updatedBug.toObject();
  const transformedBug = {
    id: bugObj._id.toString(),
    title: bugObj.title,
    description: bugObj.description,
    status: bugObj.status,
    priority: bugObj.priority,
    reportedBy: bugObj.reportedBy,
    assignedTo: bugObj.assignedTo,
    createdAt: bugObj.createdAt,
    updatedAt: bugObj.updatedAt
  };
  
  res.status(200).json(transformedBug);
}));

export default router;
