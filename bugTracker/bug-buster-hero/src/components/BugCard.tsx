
import React from 'react';
import { Bug } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface BugCardProps {
  bug: Bug;
  onEdit: (bug: Bug) => void;
  onDelete: (bugId: string) => void;
  onStatusChange: (bugId: string, newStatus: Bug['status']) => void;
}

const priorityColors = {
  low: 'bg-blue-50 text-blue-700',
  medium: 'bg-yellow-50 text-yellow-700',
  high: 'bg-red-50 text-red-700',
};

const BugCard: React.FC<BugCardProps> = ({ bug, onEdit, onDelete, onStatusChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      layout
      className="w-full"
    >
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={cn(
                "inline-block px-2 py-0.5 text-xs font-medium rounded-full",
                priorityColors[bug.priority]
              )}>
                {bug.priority.charAt(0).toUpperCase() + bug.priority.slice(1)}
              </span>
              <StatusBadge status={bug.status} />
            </div>
            <h3 className="font-semibold text-lg">{bug.title}</h3>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground line-clamp-3 mb-2">{bug.description}</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground mt-auto">
              <div>
                <span>Reported by </span>
                <span className="font-medium">{bug.reportedBy}</span>
              </div>
              <div>
                {format(bug.createdAt, 'MMM d, yyyy')}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between gap-2">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1" 
              onClick={() => onEdit(bug)}
            >
              <Edit2 size={14} />
              <span>Edit</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-destructive hover:text-destructive" 
              onClick={() => onDelete(bug.id)}
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </Button>
          </div>
          
          {bug.status !== 'resolved' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onStatusChange(
                bug.id, 
                bug.status === 'open' ? 'in-progress' : 'resolved'
              )}
            >
              {bug.status === 'open' ? 'Move to In Progress' : 'Mark as Resolved'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BugCard;
