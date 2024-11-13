import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, User</h1>
        <p className="text-muted-foreground">Manage your mind maps and knowledge base</p>
      </div>
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        New Mind Map
      </Button>
    </div>
  );
}