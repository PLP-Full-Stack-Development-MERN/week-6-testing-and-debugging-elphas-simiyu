
import React from 'react';
import { PageTransition } from '@/components/Animations';
import Navbar from '@/components/Navbar';
import BugForm from '@/components/BugForm';
import { Bug, BugFormData } from '@/lib/types';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bugService } from '@/lib/api';

const EditBug: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  
  // Fetch the bug from the API
  const { 
    data: bug, 
    isLoading, 
    isError 
  } = useQuery({
    queryKey: ['bug', id],
    queryFn: () => id ? bugService.getBugById(id) : Promise.reject('No ID provided'),
    enabled: !!id
  });
  
  // Update bug mutation
  const updateBugMutation = useMutation({
    mutationFn: (data: BugFormData) => id ? bugService.updateBug(id, data) : Promise.reject('No ID provided'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bugs'] });
      queryClient.invalidateQueries({ queryKey: ['bug', id] });
      toast.success('Bug updated successfully!');
      navigate('/');
    },
    onError: (error) => {
      console.error('Error updating bug:', error);
      toast.error('Failed to update bug');
    }
  });
  
  // Handle errors
  React.useEffect(() => {
    if (isError) {
      toast.error('Bug not found');
      navigate('/');
    }
  }, [isError, navigate]);
  
  const handleSubmit = (data: BugFormData) => {
    updateBugMutation.mutate(data);
  };
  
  const handleCancel = () => {
    navigate('/');
  };
  
  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </main>
        </div>
      </PageTransition>
    );
  }
  
  if (!bug) {
    return null; // We'll redirect in the useEffect
  }
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Edit Bug Report</h1>
            <p className="text-muted-foreground">
              Update the details for bug #{bug.id.slice(0, 8)}
            </p>
          </div>
          
          <BugForm 
            initialData={bug} 
            onSubmit={handleSubmit} 
            onCancel={handleCancel} 
            isSubmitting={updateBugMutation.isPending}
          />
        </main>
      </div>
    </PageTransition>
  );
};

export default EditBug;
