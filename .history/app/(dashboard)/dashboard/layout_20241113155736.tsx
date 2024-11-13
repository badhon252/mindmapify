import { DashboardNav } from '@/components/dashboard/nav';
import { UserNav } from '@/components/dashboard/user-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* <DashboardNav /> */}
      <div className="flex-1">
        <main className="">{children}</main>
      </div>
    </div>
  );
}
