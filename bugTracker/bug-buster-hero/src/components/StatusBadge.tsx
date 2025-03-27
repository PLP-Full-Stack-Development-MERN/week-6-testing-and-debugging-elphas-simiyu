
import React from 'react';
import { BugStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: BugStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = {
    open: {
      icon: AlertCircle2,
      label: 'Open',
      variant: 'destructive' as const,
    },
    'in-progress': {
      icon: Clock,
      label: 'In Progress',
      variant: 'default' as const,
    },
    resolved: {
      icon: CheckCircle2,
      label: 'Resolved',
      variant: 'outline' as const,
    }
  };
  
  const { icon: Icon, label, variant } = config[status];
  
  return (
    <Badge variant={variant} className={cn("flex items-center gap-1 py-1 px-2", className)}>
      <Icon size={12} />
      <span>{label}</span>
    </Badge>
  );
};

export const AlertCircle2 = (props: React.ComponentProps<typeof AlertCircle>) => (
  <AlertCircle {...props} />
);

export default StatusBadge;
