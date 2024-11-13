'use client';

import { Connection, Node } from '@/types/knowledge-map';
import { motion } from 'framer-motion';

interface ConnectionLineProps {
  connection: Connection;
  nodes: Node[];
}

export function ConnectionLine({ connection, nodes }: ConnectionLineProps) {
  const sourceNode = nodes.find((n) => n.id === connection.sourceId);
  const targetNode = nodes.find((n) => n.id === connection.targetId);

  if (!sourceNode || !targetNode) return null;

  const start = {
    x: sourceNode.position.x + 96, // Half of node width
    y: sourceNode.position.y + 32, // Half of node height
  };

  const end = {
    x: targetNode.position.x + 96,
    y: targetNode.position.y + 32,
  };

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <motion.line
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeDasharray="4"
      />
    </svg>
  );
}