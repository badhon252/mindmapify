"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Book,
  BarChart2,
  Brain,
  Clock,
  Calendar as CalendarIcon,
  TrendingUp,
  Award,
  Target,
  Zap,
  Users,
  CheckCircle,
} from "lucide-react";

const studySessions = {
  "2024-11-12": { hours: 2, quizzesCompleted: 1, topicsReviewed: 3 },
  "2024-11-13": { hours: 1.5, quizzesCompleted: 0, topicsReviewed: 2 },
  "2024-11-14": { hours: 3, quizzesCompleted: 2, topicsReviewed: 4 },
  // Add more mock data for different days
};

const dailyActivityData = [
  { day: "Mon", studyTime: 2, topicsReviewed: 5, quizzesTaken: 2 },
  { day: "Tue", studyTime: 1.5, topicsReviewed: 3, quizzesTaken: 1 },
  { day: "Wed", studyTime: 3, topicsReviewed: 7, quizzesTaken: 3 },
  { day: "Thu", studyTime: 2.5, topicsReviewed: 6, quizzesTaken: 2 },
  { day: "Fri", studyTime: 1, topicsReviewed: 2, quizzesTaken: 1 },
  { day: "Sat", studyTime: 4, topicsReviewed: 10, quizzesTaken: 4 },
  { day: "Sun", studyTime: 3.5, topicsReviewed: 8, quizzesTaken: 3 },
];

const weeklyProgressData = [
  { week: "Week 1", progress: 65 },
  { week: "Week 2", progress: 72 },
  { week: "Week 3", progress: 80 },
  { week: "Week 4", progress: 85 },
];

const topPerformingTopics = [
  { topic: "Machine Learning", score: 92 },
  { topic: "Data Structures", score: 88 },
  { topic: "React Fundamentals", score: 95 },
  { topic: "Neural Networks", score: 87 },
  { topic: "Algorithms", score: 90 },
];

const learningStyleData = [
  { name: "Visual", value: 35 },
  { name: "Auditory", value: 25 },
  { name: "Reading/Writing", value: 20 },
  { name: "Kinesthetic", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function LearningAnalytics() {
  const [view, setView] = useState("month"); // For toggling views
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const selectedDateKey = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : undefined;
  const sessionData = studySessions[selectedDateKey];
  const [dailyGoal, setDailyGoal] = useState(2);
  const [showCollaborativeInsights, setShowCollaborativeInsights] =
    useState(false);

  return (
    <div className="space-y-8">
      {/* Main Dashboard Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Learning Analytics Dashboard
          </CardTitle>
          <CardDescription>
            Gain insights into your learning patterns and progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Tabs for different analytic views */}
          <Tabs defaultValue="daily" className="space-y-4">
            <TabsList>
              <TabsTrigger value="daily">Daily Activity</TabsTrigger>
              <TabsTrigger value="weekly">Weekly Progress</TabsTrigger>
              <TabsTrigger value="topics">Top Performing Topics</TabsTrigger>
              <TabsTrigger value="style">Learning Style</TabsTrigger>
            </TabsList>
            {/* Daily Activity Tab */}
            <TabsContent value="daily">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Learning Activity</CardTitle>
                  <CardDescription>
                    Your study patterns over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis
                        yAxisId="left"
                        orientation="left"
                        stroke="#8884d8"
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="#82ca9d"
                      />
                      <Tooltip />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="studyTime"
                        fill="#8884d8"
                        name="Study Time (hours)"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="topicsReviewed"
                        fill="#82ca9d"
                        name="Topics Reviewed"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="quizzesTaken"
                        fill="#ffc658"
                        name="Quizzes Taken"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Weekly Progress Tab */}
            <TabsContent value="weekly">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Learning Progress</CardTitle>
                  <CardDescription>
                    Your overall progress over the past month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="progress"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Top Performing Topics Tab */}
            <TabsContent value="topics">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Topics</CardTitle>
                  <CardDescription>
                    Your highest-scoring subjects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    {topPerformingTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between mb-4 last:mb-0"
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{index + 1}</Badge>
                          <span>{topic.topic}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={topic.score} className="w-[100px]" />
                          <span className="font-semibold">{topic.score}%</span>
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Learning Style Tab */}
            <TabsContent value="style">
              <Card>
                <CardHeader>
                  <CardTitle>Your Learning Style</CardTitle>
                  <CardDescription>
                    Understanding your preferred learning methods
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <div className="w-1/2">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={learningStyleData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {learningStyleData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 pl-8">
                    <h4 className="font-semibold mb-2">Recommendations:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Use more visual aids in your study materials</li>
                      <li>Incorporate audio lectures and discussions</li>
                      <li>Practice note-taking and summarizing</li>
                      <li>Engage in hands-on learning activities</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Add more quick stats cards as needed */}
      </div>

      {/* Study Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <CalendarIcon className="h-6 w-6" />
            Study Calendar
          </CardTitle>
          <CardDescription>
            Track and gamify your daily learning activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Calendar Component with Interactive Markers */}
          <div className="flex justify-between items-center mb-4">
            <Select onValueChange={(value) => setView(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day View</SelectItem>
                <SelectItem value="week">Week View</SelectItem>
                <SelectItem value="month">Month View</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Start Study Session</Button>
          </div>

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border shadow relative"
            renderDay={(day, currentMonth) => {
              const dayKey = day.toISOString().split("T")[0];
              const isToday = day.toDateString() === new Date().toDateString();
              const isStudyDay = studySessions[dayKey];
              return (
                <div className="relative">
                  <div
                    className={`p-2 rounded-md ${
                      isToday
                        ? "bg-blue-100 text-blue-800 font-bold"
                        : "text-gray-800"
                    } ${
                      isStudyDay ? "bg-green-50 border border-green-300" : ""
                    }`}
                  >
                    {day.getDate()}
                    {isStudyDay && (
                      <Badge className="absolute top-0 right-0 h-4 w-4 bg-green-400 text-white rounded-full flex items-center justify-center text-xs">
                        ✔
                      </Badge>
                    )}
                  </div>
                </div>
              );
            }}
          />

          {sessionData ? (
            <div className="bg-gray-50 p-4 rounded-md shadow mt-4 space-y-2">
              <h4 className="font-semibold text-lg">
                Study Summary for {selectedDateKey}
              </h4>
              <p>Hours Studied: {sessionData.hours} hours</p>
              <p>Topics Reviewed: {sessionData.topicsReviewed}</p>
              <p>Quizzes Completed: {sessionData.quizzesCompleted}</p>
              <Progress
                value={(sessionData.hours / 5) * 100}
                className="w-full"
              />
              <Button variant="link" className="text-blue-500 mt-2">
                View Full Details
              </Button>
            </div>
          ) : (
            <p className="text-gray-600 text-center mt-4">
              No study data for this day. Start a session!
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View Insights</Button>
          <div className="flex gap-4 items-center">
            <span className="text-sm font-medium text-gray-500">
              Study Streak:
            </span>
            <Badge className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded">
              7 days <CheckCircle className="h-4 w-4" />
            </Badge>
            <Award
              className="text-yellow-500 h-5 w-5"
              title="Achievement Badge: Consistency!"
            />
          </div>
        </CardFooter>
      </Card>

      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Goals</CardTitle>
          <CardDescription>
            Set and track your daily study objectives
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label
              htmlFor="daily-goal"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Daily Study Goal (hours)
            </label>
            <Slider
              id="daily-goal"
              min={0}
              max={8}
              step={0.5}
              value={[dailyGoal]}
              onValueChange={(value) => setDailyGoal(value[0])}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Current goal: {dailyGoal} hours
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="collaborative-insights"
              checked={showCollaborativeInsights}
              onCheckedChange={setShowCollaborativeInsights}
            />
            <label
              htmlFor="collaborative-insights"
              className="text-sm font-medium text-gray-700"
            >
              Show Collaborative Insights
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Update Goals</Button>
        </CardFooter>
      </Card>

      {/* Collaborative Insights */}
      {showCollaborativeInsights && (
        <Card>
          <CardHeader>
            <CardTitle>Collaborative Insights</CardTitle>
            <CardDescription>
              See how you compare to your study group
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Your Rank</span>
              <Badge>3rd of 15</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                Group Study Time (Last 7 Days)
              </h4>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <Progress value={75} className="flex-1" />
                <span>18.5 hours</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Top Group Achiever</h4>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Alice - 24.5 hours</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
