'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  Search,
  Plus,
  Brain,
  Calendar,
  ChevronRight,
  Users,
  Clock,
  Zap,
  BarChart2,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('maps');
  const canvasRef = useRef(null);
  const controls = useAnimation();

  const recentMaps = [
    {
      id: 1,
      title: 'Project Brainstorm',
      lastEdited: '2 hours ago',
      collaborators: 3,
    },
    {
      id: 2,
      title: 'Marketing Strategy',
      lastEdited: '1 day ago',
      collaborators: 2,
    },
    {
      id: 3,
      title: 'Personal Goals',
      lastEdited: '3 days ago',
      collaborators: 1,
    },
  ];

  const learningProgress = [
    { subject: 'Machine Learning', progress: 75 },
    { subject: 'Web Development', progress: 60 },
    { subject: 'Data Structures', progress: 40 },
  ];

  const aiSuggestions = [
    {
      id: 1,
      title: 'Explore AI Ethics',
      description: 'Based on your recent activity',
    },
    {
      id: 2,
      title: 'Review JavaScript Basics',
      description: 'Recommended for your next study session',
    },
  ];

  const upcomingReviews = [
    { id: 1, title: 'Neural Networks', date: 'Today, 3:00 PM' },
    { id: 2, title: 'React Hooks', date: 'Tomorrow, 10:00 AM' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw circular progress
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 80;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 10;
      ctx.stroke();

      const progress = 0.65; // 65% progress
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius,
        -Math.PI / 2,
        -Math.PI / 2 + progress * 2 * Math.PI
      );
      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 10;
      ctx.stroke();

      // Draw text
      ctx.font = 'bold 24px Inter';
      ctx.fillStyle = '#1E293B';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('65%', centerX, centerY);

      ctx.font = '14px Inter';
      ctx.fillStyle = '#64748B';
      ctx.fillText('Overall Progress', centerX, centerY + 30);

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-['Inter']">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            MindMapify
          </Link>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Link
              href="/editor"
              className="bg-[#2563EB] text-white p-2 rounded-md hover:bg-[#1D4ED8] transition-colors"
            >
              <Plus className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome back, User!
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.section
            className="col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Dashboard</h2>
                <div className="flex space-x-2">
                  {['maps', 'progress', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      className={`px-3 py-1 rounded-md ${
                        activeTab === tab
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {activeTab === 'maps' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Recent Mind Maps
                  </h3>
                  {recentMaps.map((map) => (
                    <motion.div
                      key={map.id}
                      className="flex items-center justify-between py-3 border-b last:border-b-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center">
                        <Brain className="w-5 h-5 text-[#2563EB] mr-3" />
                        <span>{map.title}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-4">
                          {map.lastEdited}
                        </span>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-500">
                            {map.collaborators}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              {activeTab === 'progress' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Learning Progress
                  </h3>
                  {learningProgress.map((item, index) => (
                    <motion.div
                      key={index}
                      className="mb-4 last:mb-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-1">
                        <span>{item.subject}</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div
                          className="bg-[#10B981] h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Upcoming Reviews
                  </h3>
                  {upcomingReviews.map((review) => (
                    <motion.div
                      key={review.id}
                      className="flex items-center justify-between py-3 border-b last:border-b-0"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-[#2563EB] mr-3" />
                        <span>{review.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Overall Progress</h2>
              <canvas ref={canvasRef} width={200} height={200} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">AI-Suggested Content</h2>
              {aiSuggestions.map((suggestion) => (
                <motion.div
                  key={suggestion.id}
                  className="flex items-start mb-4 last:mb-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap className="w-5 h-5 text-[#8B5CF6] mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">{suggestion.title}</h3>
                    <p className="text-sm text-gray-500">
                      {suggestion.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        <motion.section
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/editor"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-2">
                <Brain className="w-6 h-6 text-[#2563EB] mr-2" />
                <h3 className="text-lg font-semibold">Create New Map</h3>
              </div>
              <p className="text-gray-600">
                Start a new mind map or knowledge graph
              </p>
            </Link>
            <Link
              href="/learning"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-2">
                <BookOpen className="w-6 h-6 text-[#10B981] mr-2" />
                <h3 className="text-lg font-semibold">Learning Center</h3>
              </div>
              <p className="text-gray-600">
                Access your personalized learning materials
              </p>
            </Link>
            <Link
              href="/analytics"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-2">
                <BarChart2 className="w-6 h-6 text-[#8B5CF6] mr-2" />
                <h3 className="text-lg font-semibold">Analytics</h3>
              </div>
              <p className="text-gray-600">
                View detailed insights on your progress
              </p>
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
