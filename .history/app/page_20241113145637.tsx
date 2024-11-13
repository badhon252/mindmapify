import { Button } from '@/components/ui/button';
import { Brain, Sparkles, Users, FileText, Lock, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <Link href='/'>
            <span className="text-xl font-bold">MindMapify</span>
            
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
              Login
            </Link>
          </nav>
          <Button size="lg">
            <Link href='/dashboard'>Get Started</Link>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Notes into
              <span className="text-primary block mt-2">Dynamic Knowledge Maps</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Revolutionize the way you learn and retain information with AI-powered mind mapping and intelligent knowledge organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Brain className="h-8 w-8" />}
                title="Dynamic Knowledge Mapping"
                description="Create intuitive mind maps with our drag-and-drop interface. Connect ideas and visualize relationships effortlessly."
              />
              <FeatureCard
                icon={<Sparkles className="h-8 w-8" />}
                title="AI-Powered Insights"
                description="Get intelligent suggestions and connections powered by advanced AI algorithms."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8" />}
                title="Real-time Collaboration"
                description="Work together with your team in real-time. Share, edit, and brainstorm simultaneously."
              />
              <FeatureCard
                icon={<FileText className="h-8 w-8" />}
                title="Multi-Format Integration"
                description="Import content from various formats including PDF, DOCX, and popular note-taking apps."
              />
              <FeatureCard
                icon={<Lock className="h-8 w-8" />}
                title="Secure & Private"
                description="Your data is protected with enterprise-grade security and end-to-end encryption."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8" />}
                title="Smart Learning Paths"
                description="Get personalized study recommendations and track your progress effectively."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-semibold">MindMapify</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg bg-background border hover:border-primary transition-colors">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}