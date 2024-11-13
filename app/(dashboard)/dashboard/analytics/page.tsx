'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Brain, Clock, Target, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Mon', value: 4 },
  { name: 'Tue', value: 3 },
  { name: 'Wed', value: 5 },
  { name: 'Thu', value: 7 },
  { name: 'Fri', value: 6 },
  { name: 'Sat', value: 8 },
  { name: 'Sun', value: 9 },
];

const stats = [
  {
    title: 'Total Maps',
    value: '12',
    icon: Brain,
    color: 'text-blue-500',
  },
  {
    title: 'Study Time',
    value: '24h',
    icon: Clock,
    color: 'text-green-500',
  },
  {
    title: 'Goals Met',
    value: '8/10',
    icon: Target,
    color: 'text-purple-500',
  },
  {
    title: 'Progress',
    value: '+15%',
    icon: TrendingUp,
    color: 'text-orange-500',
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

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your learning progress and insights</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-background ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Learning Activity</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}