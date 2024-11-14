"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Brain,
  CheckCircle,
  ChevronRight,
  Clock,
  Link,
  MessageSquare,
  X,
  Zap,
  BarChart,
  Book,
  Share2,
} from "lucide-react";

export default function AIInsightsPage() {
  const [activeTab, setActiveTab] = useState("suggestions");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationSnoozeTime, setNotificationSnoozeTime] = useState(5);
  const [learningStreak, setLearningStreak] = useState(7);
  const [showCollaborationModal, setShowCollaborationModal] = useState(false);

  const suggestedConnections = [
    {
      from: "Machine Learning",
      to: "Neural Networks",
      reason: "Both are fundamental concepts in AI",
    },
    {
      from: "Data Structures",
      to: "Algorithms",
      reason: "Often taught and applied together in computer science",
    },
    {
      from: "React",
      to: "Virtual DOM",
      reason: "React uses Virtual DOM for efficient rendering",
    },
  ];

  const quizzes = [
    {
      question: "What is the primary purpose of a neural network?",
      answer: "To mimic the human brain's decision-making process",
    },
    {
      question: "Which data structure uses LIFO (Last In, First Out)?",
      answer: "Stack",
    },
    {
      question: "What is the main advantage of using React's Virtual DOM?",
      answer: "Improved performance by minimizing direct DOM manipulation",
    },
  ];

  const relatedContent = [
    { title: "Introduction to Machine Learning", type: "Article", link: "#" },
    { title: "Neural Networks Explained", type: "Video", link: "#" },
    {
      title: "Data Structures and Algorithms Course",
      type: "Course",
      link: "#",
    },
  ];

  const learningAnalytics = {
    topicsExplored: 15,
    connectionsCreated: 37,
    quizzesTaken: 22,
    averageScore: 85,
  };

  const collaborators = [
    {
      name: "Alice",
      avatar: "/placeholder-avatar-1.jpg",
      recentActivity: "Added 3 new connections",
    },
    {
      name: "Bob",
      avatar: "/placeholder-avatar-2.jpg",
      recentActivity: "Completed 2 quizzes",
    },
    {
      name: "Charlie",
      avatar: "/placeholder-avatar-3.jpg",
      recentActivity: "Suggested a new topic",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleApproveConnection = (connection) => {
    console.log(`Approved connection: ${connection.from} to ${connection.to}`);
    // Here you would typically update the mind map with the new connection
  };

  const handleDismissConnection = (connection) => {
    console.log(`Dismissed connection: ${connection.from} to ${connection.to}`);
    // Here you would typically remove the suggestion from the list
  };

  const handleSubmitQuiz = () => {
    console.log(`Submitted answer: ${quizAnswer}`);
    setShowQuiz(false);
    setQuizAnswer("");
    // Here you would typically check the answer and provide feedback
  };

  const handleSnoozeNotification = () => {
    setShowNotification(false);
    setTimeout(
      () => setShowNotification(true),
      notificationSnoozeTime * 60 * 1000
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-4xl font-bold mb-6">
        AI-Powered Insights and Recall
      </h1>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="quizzes">Memory Prompts</TabsTrigger>
          <TabsTrigger value="explore">Explore Content</TabsTrigger>
          <TabsTrigger value="analytics">Learning Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Suggested Connections</CardTitle>
              <CardDescription>
                Discover potential links between your mind map nodes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                {suggestedConnections.map((connection, index) => (
                  <motion.div
                    key={`${connection.from}-${connection.to}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="mb-4">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Badge>{connection.from}</Badge>
                            <ChevronRight className="w-4 h-4" />
                            <Badge>{connection.to}</Badge>
                          </div>
                          <div className="space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      handleApproveConnection(connection)
                                    }
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />{" "}
                                    Approve
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Add this connection to your mind map</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      handleDismissConnection(connection)
                                    }
                                  >
                                    <X className="w-4 h-4 mr-1" /> Dismiss
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Remove this suggestion</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {connection.reason}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Quizzes and Memory Prompts</CardTitle>
              <CardDescription>
                Reinforce your learning with AI-generated questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showQuiz ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {quizzes[0].question}
                  </h3>
                  <Textarea
                    placeholder="Type your answer here..."
                    value={quizAnswer}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                  />
                  <Button onClick={handleSubmitQuiz}>Submit Answer</Button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="mb-4">Ready for a quick knowledge check?</p>
                  <Button onClick={() => setShowQuiz(true)}>Start Quiz</Button>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quiz History</CardTitle>
              <CardDescription>Track your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Completed Quizzes</span>
                  <span className="font-semibold">22</span>
                </div>
                <Progress value={60} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  You're making great progress! Keep it up to reinforce your
                  learning.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Learning Streak</CardTitle>
              <CardDescription>
                Maintain your daily learning habit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  <span className="text-2xl font-bold">
                    {learningStreak} days
                  </span>
                </div>
                <Button variant="outline">View Streak Details</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="explore" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Explore Related Content</CardTitle>
              <CardDescription>
                Discover new resources to expand your knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                {relatedContent.map((content, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h3 className="text-lg font-semibold">{content.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <Badge>{content.type}</Badge>
                      <Button variant="link" asChild>
                        <a
                          href={content.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Explore
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Content Recommendations</CardTitle>
              <CardDescription>
                Personalized suggestions based on your learning patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Machine Learning Fundamentals
                  </AccordionTrigger>
                  <AccordionContent>
                    Based on your recent activity, we recommend exploring the
                    core principles of machine learning algorithms and their
                    applications.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Advanced Data Structures</AccordionTrigger>
                  <AccordionContent>
                    To complement your understanding of algorithms, delve into
                    advanced data structures like Red-Black trees and B-trees.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    React Performance Optimization
                  </AccordionTrigger>
                  <AccordionContent>
                    Enhance your React skills by learning about memoization,
                    lazy loading, and other performance optimization techniques.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Analytics</CardTitle>
              <CardDescription>
                Gain insights into your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Topics Explored
                    </CardTitle>
                    <Book className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {learningAnalytics.topicsExplored}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Connections Created
                    </CardTitle>
                    <Link className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {learningAnalytics.connectionsCreated}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Quizzes Taken
                    </CardTitle>
                    <Brain className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {learningAnalytics.quizzesTaken}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Quiz Score
                    </CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {learningAnalytics.averageScore}%
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Learning Patterns</CardTitle>
              <CardDescription>
                Visualize your study habits and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for a chart or graph component */}
              <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">
                  Learning pattern visualization goes here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Customize your learning reminders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="frequency"
                  >
                    Reminder Frequency
                  </label>
                  <p className="text-sm text-muted-foreground">
                    How often should we remind you to review?
                  </p>
                </div>
                <Select defaultValue="daily">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <label htmlFor="notifications">Enable push notifications</label>
              </div>
              <div>
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="snooze-time"
                >
                  Default Snooze Time (minutes)
                </label>
                <Slider
                  id="snooze-time"
                  min={5}
                  max={60}
                  step={5}
                  value={[notificationSnoozeTime]}
                  onValueChange={(value) => setNotificationSnoozeTime(value[0])}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Current setting: {notificationSnoozeTime} minutes
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Collaboration Preferences</CardTitle>
              <CardDescription>
                Manage how you interact with others on the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="public-profile" />
                <label htmlFor="public-profile">Make my profile public</label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="share-progress" />
                <label htmlFor="share-progress">
                  Share my learning progress with connections
                </label>
              </div>
              <Button onClick={() => setShowCollaborationModal(true)}>
                Manage Collaborators
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4"
          >
            <Card className="w-80">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Time to Review!</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowNotification(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  It's been a while since you reviewed "Neural Networks". Ready
                  for a quick refresher?
                </p>
                <div className="flex justify-between">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSnoozeNotification}
                  >
                    <Clock className="w-4 h-4 mr-1" /> Snooze
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setShowNotification(false);
                      setActiveTab("quizzes");
                      setShowQuiz(true);
                    }}
                  >
                    <Brain className="w-4 h-4 mr-1" /> Start Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog
        open={showCollaborationModal}
        onOpenChange={setShowCollaborationModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Collaborators</DialogTitle>
            <DialogDescription>
              View and manage your collaborators on Mindmapify
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {collaborators.map((collaborator, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={collaborator.avatar}
                      alt={collaborator.name}
                    />
                    <AvatarFallback>
                      {collaborator.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{collaborator.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {collaborator.recentActivity}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowCollaborationModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-4 left-4 space-x-2">
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" /> Share Insights
        </Button>
        <Button variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" /> Feedback
        </Button>
      </div>
    </div>
  );
}
