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
        {/* <header className="border-b">
          <div className="flex h-16 items-center px-4 gap-4">
            <div className="flex-1" />
            <UserNav />
          </div>
        </header> */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
