'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Brain,
  Clock,
  Users,
  Plus,
  ArrowRight,
  BookOpen,
  Target,
} from 'lucide-react';
import Link from 'next/link';

const recentMaps = [
  {
    id: 1,
    title: 'Web Development Concepts',
    lastEdited: '2 hours ago',
    collaborators: 3,
  },
  {
    id: 2,
    title: 'Machine Learning Basics',
    lastEdited: '1 day ago',
    collaborators: 2,
  },
  {
    id: 3,
    title: 'Project Architecture',
    lastEdited: '3 days ago',
    collaborators: 1,
  },
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

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">Here's an overview of your learning journey</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Map
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div variants={item}>
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Maps</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
            <Link
              href="/dashboard/mindmaps"
              className="text-sm text-primary hover:underline inline-flex items-center"
            >
              View all maps
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Learning Goals</p>
                <h3 className="text-2xl font-bold">8/10</h3>
              </div>
            </div>
            <Link
              href="/dashboard/goals"
              className="text-sm text-primary hover:underline inline-flex items-center"
            >
              Track progress
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Study Time</p>
                <h3 className="text-2xl font-bold">24h</h3>
              </div>
            </div>
            <Link
              href="/dashboard/analytics"
              className="text-sm text-primary hover:underline inline-flex items-center"
            >
              View analytics
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Card>
        </motion.div>
      </motion.div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Mind Maps</h2>
        <div className="space-y-4">
          {recentMaps.map((map) => (
            <div
              key={map.id}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-medium">{map.title}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {map.lastEdited}
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {map.collaborators}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}