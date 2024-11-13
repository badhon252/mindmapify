'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Grid, List } from 'lucide-react';
import { MindMapGrid } from '@/components/dashboard/mindmap-grid';
import { useRouter } from 'next/navigation';
import { useKnowledgeMap } from '@/hooks/use-knowledge-map';

export default function MindMapsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { createMap } = useKnowledgeMap();

  const handleCreateMap = () => {
    const mapId = createMap();
    // router.push(`/dashboard/mindmaps/${mapId}`);
    router.push(`/dashboard/mindmaps/map`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mind Maps</h1>
          <p className="text-muted-foreground">
            Create and manage your knowledge maps
          </p>
        </div>
        <Button onClick={handleCreateMap}>
          <Plus className="w-4 h-4 mr-2" />
          New Mind Map
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search mind maps..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 border rounded-md p-1">
          <Button
            variant={view === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setView('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setView('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <MindMapGrid view={view} searchQuery={searchQuery} />
    </div>
  );
}