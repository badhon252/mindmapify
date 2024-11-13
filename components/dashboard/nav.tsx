import { Brain, Layout, Map, Users, Settings, FileText } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { icon: Layout, label: 'Dashboard', href: '/dashboard' },
  { icon: Map, label: 'Mind Maps', href: '/dashboard/mindmaps' },
  { icon: Users, label: 'Collaboration', href: '/dashboard/collaboration' },
  { icon: FileText, label: 'Documents', href: '/dashboard/documents' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function DashboardNav() {
  return (
    <div className="w-64 border-r bg-muted/10 min-h-screen p-4">
      <div className="flex items-center space-x-2 mb-8">
        <Brain className="h-6 w-6 text-primary" />
        <span className="font-semibold">MindMapify</span>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}