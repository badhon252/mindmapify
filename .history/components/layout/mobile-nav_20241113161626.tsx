'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Brain } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserNav } from '../dashboard/user-nav';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Knowledge Maps',
    href: '/dashboard/mindmaps',
  },
  {
    title: 'Content Library',
    href: '/dashboard/library',
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-1">
        <div className="flex items-center gap-2 p-6 border-b">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl">MindMapify</span>
        </div>
        <div className="flex flex-col justify-between">

        <nav className="p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center px-3 py-2 rounded-lg transition-colors',
                pathname === item.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="">
            <UserNav />
        </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}