import { MainNav } from '@/components/layout/main-nav';
import { MobileNav } from '@/components/layout/mobile-nav';
import { PageTransition } from '@/components/layout/page-transition';
import { UserNav } from '@/components/dashboard/user-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <MainNav />
      <div className="flex-1">
        <header className="h-16 border-b flex items-center justify-between px-4">
          <MobileNav />
          <div className="flex items-end justify-end gap-4">
            <UserNav />
          </div>
        </header>
        <main className="p-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}