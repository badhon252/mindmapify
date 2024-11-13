'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain } from 'lucide-react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="w-full max-w-md p-8 space-y-6 bg-background rounded-lg shadow-lg">
        <div className="flex items-center justify-center space-x-2">
          <Brain className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">MindMapify</span>
        </div>
        <h1 className="text-2xl font-semibold text-center">Create your account</h1>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="First name" />
            <Input placeholder="Last name" />
          </div>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm password" />
          <Button className="w-full" size="lg">
            Sign up
          </Button>
        </form>
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}