'use client';

import { motion } from 'framer-motion';
import { Search, Filter, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const contentItems = [
  { id: 1, title: 'Introduction to AI', type: 'PDF', date: '2024-03-20' },
  { id: 2, title: 'Web Development Basics', type: 'Article', date: '2024-03-19' },
  { id: 3, title: 'Data Structures Guide', type: 'Document', date: '2024-03-18' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Library</h1>
          <p className="text-muted-foreground">Manage and organize your learning resources</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input className="pl-10" placeholder="Search content..." />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4"
      >
        {contentItems.map((item) => (
          <motion.div key={item.id} variants={item}>
            <Card className="p-4 hover:border-primary transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.type}</p>
                </div>
                <span className="text-sm text-muted-foreground">{item.date}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}