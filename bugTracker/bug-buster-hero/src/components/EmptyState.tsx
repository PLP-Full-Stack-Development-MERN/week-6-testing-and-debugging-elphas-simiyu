
import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No bugs found',
  description = 'There are no bugs to display at the moment.',
  action,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center p-8 rounded-lg"
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <SearchX className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      
      {action && (
        <Button asChild>
          <Link to={action.href}>{action.label}</Link>
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
