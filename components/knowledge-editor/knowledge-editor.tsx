'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  Search,
  Plus,
  Minus,
  Save,
  Undo,
  Redo,
  Users,
  Zap,
  Settings,
  Layout,
  Image as ImageIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function KnowledgeMapEditor() {
  const [zoom, setZoom] = useState(1);
  const [nodes, setNodes] = useState([
    { id: 1, x: 400, y: 300, content: 'Central Topic' },
    { id: 2, x: 600, y: 200, content: 'Subtopic 1' },
    { id: 3, x: 600, y: 400, content: 'Subtopic 2' },
  ]);
  const [connections, setConnections] = useState([
    { from: 1, to: 2 },
    { from: 1, to: 3 },
  ]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingStart, setDrawingStart] = useState(null);
  const canvasRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach((connection) => {
        const fromNode = nodes.find((node) => node.id === connection.from);
        const toNode = nodes.find((node) => node.id === connection.to);
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = '#8B5CF6';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 50, 0, 2 * Math.PI);
        ctx.fillStyle = node.id === selectedNode ? '#2563EB' : '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#2563EB';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = '14px Inter';
        ctx.fillStyle = node.id === selectedNode ? '#FFFFFF' : '#1E293B';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.content, node.x, node.y);
      });

      // Draw current connection if drawing
      if (isDrawing && drawingStart) {
        const mouse = getMousePosition(canvas, event);
        ctx.beginPath();
        ctx.moveTo(drawingStart.x, drawingStart.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = '#8B5CF6';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [nodes, connections, selectedNode, isDrawing, drawingStart]);

  const handleNodeClick = (nodeId) => {
    setSelectedNode(nodeId);
  };

  const handleCanvasMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    const clickedNode = nodes.find(
      (node) => Math.hypot(node.x - x, node.y - y) < 50
    );

    if (clickedNode) {
      setIsDrawing(true);
      setDrawingStart({ x: clickedNode.x, y: clickedNode.y });
    } else {
      const newNode = {
        id: nodes.length + 1,
        x,
        y,
        content: `New Node ${nodes.length + 1}`,
      };
      setNodes([...nodes, newNode]);
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (isDrawing) {
      // Update the canvas to show the line being drawn
    }
  };

  const handleCanvasMouseUp = (e) => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top) / zoom;

      const endNode = nodes.find(
        (node) => Math.hypot(node.x - x, node.y - y) < 50
      );

      if (endNode && drawingStart) {
        const startNode = nodes.find(
          (node) => node.x === drawingStart.x && node.y === drawingStart.y
        );
        if (startNode && startNode.id !== endNode.id) {
          setConnections([
            ...connections,
            { from: startNode.id, to: endNode.id },
          ]);
        }
      }

      setIsDrawing(false);
      setDrawingStart(null);
    }
  };

  const getMousePosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / zoom,
      y: (event.clientY - rect.top) / zoom,
    };
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-['Inter']">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            MindMapify
          </Link>
          <div className="flex items-center space-x-4">
            <button className="bg-[#2563EB] text-white p-2 rounded-md hover:bg-[#1D4ED8] transition-colors">
              <Save className="w-5 h-5" />
            </button>
            <button className="bg-[#10B981] text-white p-2 rounded-md hover:bg-[#059669] transition-colors">
              <Users className="w-5 h-5" />
            </button>
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
          Knowledge Map Editor
        </motion.h1>

        <div className="flex justify-between mb-4">
          <div className="flex items-center space-x-2">
            <button
              className="bg-white p-2 rounded-md shadow-sm"
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="font-bold">{Math.round(zoom * 100)}%</span>
            <button
              className="bg-white p-2 rounded-md shadow-sm"
              onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-white p-2 rounded-md shadow-sm">
              <Undo className="w-5 h-5" />
            </button>
            <button className="bg-white p-2 rounded-md shadow-sm">
              <Redo className="w-5 h-5" />
            </button>
            <button className="bg-white p-2 rounded-md shadow-sm">
              <Layout className="w-5 h-5" />
            </button>
            <button className="bg-white p-2 rounded-md shadow-sm">
              <ImageIcon className="w-5 h-5" />
            </button>
            <button className="bg-white p-2 rounded-md shadow-sm">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="border border-gray-200 rounded-md cursor-pointer"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
          />
        </div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4">AI Suggestions</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <Zap className="w-5 h-5 text-[#8B5CF6] mr-3 mt-1" />
              <div>
                <h3 className="font-semibold">Add a 'History' subtopic</h3>
                <p className="text-sm text-gray-500">
                  This could provide context for the central topic.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Zap className="w-5 h-5 text-[#8B5CF6] mr-3 mt-1" />
              <div>
                <h3 className="font-semibold">
                  Link 'Subtopic 1' and 'Subtopic 2'
                </h3>
                <p className="text-sm text-gray-500">
                  These topics seem related based on your other maps.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
