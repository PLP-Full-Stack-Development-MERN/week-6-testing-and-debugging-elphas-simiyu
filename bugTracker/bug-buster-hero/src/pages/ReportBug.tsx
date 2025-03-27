
import React from 'react';
import { PageTransition } from '@/components/Animations';
import Navbar from '@/components/Navbar';
import BugForm from '@/components/BugForm';
import { BugFormData } from '@/lib/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bugService } from '@/lib/api';

const ReportBug: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const createBugMutation = useMutation({
    mutationFn: bugService.createBug,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bugs'] });
      toast.success('Bug reported successfully!');
      navigate('/');
    },
    onError: (error) => {
      console.error('Error creating bug:', error);
      toast.error('Failed to report bug');
    }
  });
  
  const handleSubmit = (data: BugFormData) => {
    createBugMutation.mutate(data);
  };
  
  const handleCancel = () => {
    navigate('/');
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Report New Bug</h1>
            <p className="text-muted-foreground">
              Fill out the form below to report a new bug in the system
            </p>
          </div>
          
          <BugForm 
            onSubmit={handleSubmit} 
            onCancel={handleCancel} 
            isSubmitting={createBugMutation.isPending}
          />
        </main>
      </div>
    </PageTransition>
  );
};

export default ReportBug;
