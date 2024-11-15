import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Check, Brain, FileText, Users, Zap } from "lucide-react";
import { Button } from "react-day-picker";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Main Concept" },
    type: "input",
  },
  { id: "2", position: { x: -100, y: 100 }, data: { label: "Sub Idea 1" } },
  { id: "3", position: { x: 100, y: 100 }, data: { label: "Sub Idea 2" } },
  {
    id: "4",
    position: { x: 0, y: 200 },
    data: { label: "Connection" },
    type: "output",
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-4", source: "3", target: "4" },
];

export default function Hero() {
  return (
    <main className="pt-20">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ opacity, scale }}>
          <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </motion.div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Revolutionize Your Knowledge Management
          </motion.h1>
          <motion.p
            className="text-xl mb-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform complex ideas into clear, interconnected mind maps with
            AI-powered insights and collaborative tools.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3 w-full sm:w-auto">
              Start Mapping
            </Button>
            <Button
              variant="outline"
              className="text-lg px-8 py-3 w-full sm:w-auto"
            >
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Powerful Features for Enhanced Learning
          </h2>
          <Tabs defaultValue="mapping" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="mapping">Dynamic Mapping</TabsTrigger>
              <TabsTrigger value="ai">AI-Powered Insights</TabsTrigger>
              <TabsTrigger value="integration">
                Multi-Format Integration
              </TabsTrigger>
              <TabsTrigger value="collaboration">
                Real-time Collaboration
              </TabsTrigger>
            </TabsList>
            <TabsContent value="mapping">
              <Card>
                <CardHeader>
                  <CardTitle>Dynamic Knowledge Mapping</CardTitle>
                  <CardDescription>
                    Create intuitive, interconnected mind maps with our advanced
                    interface.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Intuitive drag-and-drop interface</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Customizable nodes and connections</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Hierarchical structure support</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Advanced layout algorithms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <ReactFlow
                      nodes={initialNodes}
                      edges={initialEdges}
                      fitView
                    >
                      <Background />
                      <Controls />
                    </ReactFlow>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ai">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Insights</CardTitle>
                  <CardDescription>
                    Leverage advanced AI to enhance your learning and knowledge
                    management.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Smart concept suggestions</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Automated memory prompts</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Discover hidden connections</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Personalized learning paths</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted p-4 rounded-lg flex items-center justify-center">
                    <Brain className="w-24 h-24 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="integration">
              <Card>
                <CardHeader>
                  <CardTitle>Multi-Format Integration</CardTitle>
                  <CardDescription>
                    Seamlessly integrate various file types into your knowledge
                    maps.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Support for PDFs, images, and videos</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Easy drag-and-drop functionality</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Automatic content extraction</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Rich media embedding</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted p-4 rounded-lg flex items-center justify-center">
                    <FileText className="w-24 h-24 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="collaboration">
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Collaboration</CardTitle>
                  <CardDescription>
                    Work together seamlessly on shared knowledge maps.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Simultaneous editing</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Comment and feedback system</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Version history and rollback</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>Team workspaces</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted p-4 rounded-lg flex items-center justify-center">
                    <Users className="w-24 h-24 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            How MindMapify Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Create Your Map",
                description:
                  "Start with a central idea and branch out your thoughts using our intuitive interface.",
                icon: Brain,
              },
              {
                title: "Enhance with AI",
                description:
                  "Let our AI analyze your map and provide personalized suggestions and insights.",
                icon: Zap,
              },
              {
                title: "Collaborate and Learn",
                description:
                  "Share your maps, work together in real-time, and accelerate your learning process.",
                icon: Users,
              },
            ].map((step, index) => (
              <Card key={index} className="bg-card">
                <CardHeader>
                  <step.icon className="w-12 h-12 text-primary mb-4" />
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Dr. Alex Johnson",
                role: "Neuroscientist",
                quote:
                  "MindMapify has revolutionized my research process. The AI-powered insights have helped me make connections I might have otherwise missed.",
              },
              {
                name: "Sarah Lee",
                role: "MBA Student",
                quote:
                  "As a visual learner, MindMapify has become an essential part of my study routine. It's helped me tackle complex business concepts with ease.",
              },
              {
                name: "Michael Brown",
                role: "Software Architect",
                quote:
                  "The collaborative features in MindMapify have transformed how our team brainstorms and documents system designs. It's an invaluable tool for our workflow.",
              },
              {
                name: "Emily Chen",
                role: "High School Teacher",
                quote:
                  "MindMapify has made lesson planning and student engagement so much more interactive and effective. My students love using it for group projects.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-muted">
                <CardHeader>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="italic">&quot;{testimonial.quote}&quot;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "Free",
                features: [
                  "5 mind maps",
                  "Basic AI insights",
                  "Limited collaboration",
                  "Community support",
                ],
              },
              {
                name: "Pro",
                price: "$12.99/mo",
                features: [
                  "Unlimited mind maps",
                  "Advanced AI features",
                  "Full collaboration",
                  "Priority support",
                  "Custom themes",
                  "Offline mode",
                ],
              },
              {
                name: "Team",
                price: "$49.99/mo",
                features: [
                  "Everything in Pro",
                  "Team management",
                  "Advanced analytics",
                  "API access",
                  "Dedicated account manager",
                  "Custom onboarding",
                ],
              },
            ].map((plan, index) => (
              <Card key={index} className={index === 1 ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 mr-2 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      index === 1
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : ""
                    }`}
                  >
                    {index === 1 ? "Start Pro Trial" : "Choose Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of professionals and students who are revolutionizing
            their knowledge management with MindMapify.
          </p>
          <Button className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-3">
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </main>
  );
}
