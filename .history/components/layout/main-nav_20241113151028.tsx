'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Brain,
  LayoutDashboard,
  Map,
  Library,
  BarChart2,
  Settings,
  User
} from 'lucide-react';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Knowledge Maps',
    href: '/dashboard/mindmaps',
    icon: User,
  },
  {
    title: 'Content Library',
    href: '/dashboard/library',
    icon: Library,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart2,
  },{
    title: 'Collaboration',
    href: '/dashboard/collab',
    icon: BarChart2,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 bg-background border-r min-h-screen p-6">
      <div className="flex items-center gap-2 mb-8">
        <Brain className="h-6 w-6 text-primary" />
        <Link href='/' className="font-semibold text-xl">MindMapify</Link>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg relative group transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-primary/10 rounded-lg"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}