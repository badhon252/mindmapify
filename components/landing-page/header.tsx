import { motion } from "framer-motion";
import { Brain, Link, ChevronDown } from "lucide-react";
import { Button } from "react-day-picker";

<header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
  <nav className="container mx-auto px-4 py-4">
    <div className="flex justify-between items-center">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Brain className="h-8 w-8 text-primary" />
          <Link href="/" className="text-xl font-bold">
            MindMapify
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Login
          </Link>
        </nav>
        <Button size="lg">
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </div>
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <ChevronDown
          className={`w-6 h-6 transition-transform ${
            isMenuOpen ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  </nav>
  {isMenuOpen && (
    <motion.div
      className="md:hidden bg-background border-t border-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
        <a
          href="#features"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          Features
        </a>
        <a
          href="#how-it-works"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          How It Works
        </a>
        <a
          href="#pricing"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          Pricing
        </a>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
          Get Started
        </Button>
      </div>
    </motion.div>
  )}
</header>;
