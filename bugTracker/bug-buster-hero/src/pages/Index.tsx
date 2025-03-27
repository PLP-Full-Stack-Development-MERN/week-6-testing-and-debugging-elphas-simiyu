
import React from 'react';
import { PageTransition } from '@/components/Animations';
import BugCard from '@/components/BugCard';
import Navbar from '@/components/Navbar';
import { Bug, BugStatus } from '@/lib/types';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bugService } from '@/lib/api';

const Index = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<BugStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = React.useState<Bug['priority'] | 'all'>('all');
  const [bugToDelete, setBugToDelete] = React.useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch bugs from API
  const { data: bugs = [], isLoading, isError } = useQuery({
    queryKey: ['bugs'],
    queryFn: bugService.getAllBugs
  });

  // Delete bug mutation
  const deleteMutation = useMutation({
    mutationFn: bugService.deleteBug,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bugs'] });
      toast.success('Bug deleted successfully');
      setIsDeleteModalOpen(false);
      setBugToDelete(null);
    },
    onError: (error) => {
      console.error('Error deleting bug:', error);
      toast.error('Failed to delete bug');
    }
  });

  // Update bug status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: BugStatus }) => 
      bugService.updateBugStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bugs'] });
      toast.success(`Bug status updated to ${data.status.replace('-', ' ')}`);
    },
    onError: (error) => {
      console.error('Error updating bug status:', error);
      toast.error('Failed to update bug status');
    }
  });

  // Apply filters
  const filteredBugs = React.useMemo(() => {
    let result = [...bugs];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        bug => 
          bug.title.toLowerCase().includes(query) || 
          bug.description.toLowerCase().includes(query) ||
          bug.reportedBy.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(bug => bug.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(bug => bug.priority === priorityFilter);
    }
    
    return result;
  }, [bugs, searchQuery, statusFilter, priorityFilter]);

  const handleEditBug = (bug: Bug) => {
    navigate(`/edit/${bug.id}`, { state: { bug } });
  };

  const handleDeleteClick = (bugId: string) => {
    setBugToDelete(bugId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (bugToDelete) {
      deleteMutation.mutate(bugToDelete);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setBugToDelete(null);
  };

  const handleStatusChange = (bugId: string, newStatus: BugStatus) => {
    updateStatusMutation.mutate({ id: bugId, status: newStatus });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Bug Dashboard</h1>
            <p className="text-muted-foreground">Track and manage your project bugs efficiently</p>
          </div>
          
          <div className="mb-6 flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bugs by title, description or reporter..."
                  className="pl-10"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleFilters}
                className={showFilters ? 'bg-primary text-primary-foreground' : ''}
              >
                <SlidersHorizontal size={18} />
              </Button>
            </div>
            
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-lg bg-secondary/50 animate-slide-down">
                <div>
                  <label className="text-sm font-medium mb-1 block">Status</label>
                  <Select
                    value={statusFilter}
                    onValueChange={(value) => setStatusFilter(value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Priority</label>
                  <Select
                    value={priorityFilter}
                    onValueChange={(value) => setPriorityFilter(value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    variant="ghost" 
                    onClick={clearFilters} 
                    className="text-sm"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Show loading state */}
          {isLoading && (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          
          {/* Show error state */}
          {isError && (
            <EmptyState
              title="Error loading bugs"
              description="There was a problem loading the bugs. Please try again."
              action={{
                label: "Refresh page",
                href: "#"
              }}
            />
          )}
          
          {/* Show bugs */}
          {!isLoading && !isError && filteredBugs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBugs.map(bug => (
                <BugCard
                  key={bug.id}
                  bug={bug}
                  onEdit={handleEditBug}
                  onDelete={handleDeleteClick}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          ) : (
            !isLoading && !isError && (
              <EmptyState
                title={searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' 
                  ? "No matching bugs found" 
                  : "No bugs reported yet"}
                description={searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
                  ? "Try adjusting your filters or search query"
                  : "Start by reporting a new bug to track it here"}
                action={{
                  label: searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
                    ? "Clear Filters"
                    : "Report New Bug",
                  href: searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
                    ? "#" // This will be handled by the onClick on the Button
                    : "/report"
                }}
              />
            )
          )}
        </main>
      </div>
      
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </PageTransition>
  );
};

export default Index;
