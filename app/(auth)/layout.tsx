'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Mock authentication check
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-muted/50 flex items-center justify-center">
      {children}
    </div>
  );
}