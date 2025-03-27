
export type BugStatus = "open" | "in-progress" | "resolved";

export interface Bug {
  id: string;
  title: string;
  description: string;
  status: BugStatus;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
  reportedBy: string;
  assignedTo?: string;
}

export type BugFormData = Omit<Bug, 'id' | 'createdAt' | 'updatedAt'>;
