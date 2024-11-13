'use client';

import { Card } from '@/components/ui/card';
import { Brain, Clock, Share2, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useKnowledgeMap } from '@/hooks/use-knowledge-map';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface MindMapGridProps {
  view?: 'grid' | 'list';
  searchQuery?: string;
}

export function MindMapGrid({ view = 'grid', searchQuery = '' }: MindMapGridProps) {
  const { maps, deleteMap } = useKnowledgeMap();

  const filteredMaps = maps.filter((map) =>
    map.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`grid gap-6 ${
        view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''
      }`}
    >
      {filteredMaps.map((mindMap) => (
        <motion.div key={mindMap.id} variants={item}>
          {/* <Link href={`/dashboard/mindmaps/${mindMap.id}`}> */}
          <Link href={`/dashboard/mindmaps/map`}>
            <Card
              className={`p-6 hover:border-primary transition-colors cursor-pointer ${
                view === 'list' ? 'flex items-center justify-between' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Brain className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">{mindMap.title}</h3>
                    {mindMap.description && (
                      <p className="text-sm text-muted-foreground">
                        {mindMap.description}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        deleteMap(mindMap.id);
                      }}
                      className="text-destructive"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    Updated{' '}
                    {formatDistanceToNow(new Date(mindMap.updatedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                {mindMap.collaborators?.length > 0 && (
                  <div className="flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    <span>{mindMap.collaborators.length} collaborators</span>
                  </div>
                )}
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}