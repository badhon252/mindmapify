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
          <MobileNav />
        
        <main className="p-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}