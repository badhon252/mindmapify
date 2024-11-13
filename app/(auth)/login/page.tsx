'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-background rounded-lg shadow-lg">
      <div className="flex items-center justify-center space-x-2">
        <Brain className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">MindMapify</span>
      </div>
      <h1 className="text-2xl font-semibold text-center">Welcome back</h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
      <div className="text-center text-sm">
        <Link href="/forgot-password" className="text-primary hover:underline">
          Forgot your password?
        </Link>
      </div>
      <div className="text-center text-sm">
        Don't have an account?{' '}
        <Link href="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}