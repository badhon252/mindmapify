'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Node, Connection, Position } from '@/types/knowledge-map';
import { useKnowledgeMap } from '@/hooks/use-knowledge-map';
import { NodeComponent } from './node';
import { ConnectionLine } from './connection-line';
import { useZoom } from '@/hooks/use-zoom';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function KnowledgeMapCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { nodes, connections, addNode, updateNodePosition, addConnection } = useKnowledgeMap();
  const { zoom, increaseZoom, decreaseZoom } = useZoom();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const position = {
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom
    };

    addNode({
      id: `node-${Date.now()}`,
      position,
      content: 'New Node',
      type: 'text'
    });
  };

  const handleNodeDragStart = (nodeId: string, position: Position) => {
    setIsDragging(true);
    setDragStart(position);
    setSelectedNode(nodeId);
  };

  const handleNodeDragEnd = (nodeId: string, position: Position) => {
    setIsDragging(false);
    setDragStart(null);
    updateNodePosition(nodeId, position);
    
    if (selectedNode && selectedNode !== nodeId) {
      addConnection({
        id: `conn-${Date.now()}`,
        sourceId: selectedNode,
        targetId: nodeId,
        type: 'default'
      });
    }
    setSelectedNode(null);
  };

  return (
    <div className="relative w-full h-[calc(100vh-12rem)] bg-background border rounded-lg overflow-hidden">
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <Button variant="outline" size="icon" onClick={decreaseZoom}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
        <Button variant="outline" size="icon" onClick={increaseZoom}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <motion.div
        ref={canvasRef}
        className="w-full h-full relative"
        style={{ scale: zoom }}
        onClick={handleCanvasClick}
      >
        {connections.map((connection) => (
          <ConnectionLine
            key={connection.id}
            connection={connection}
            nodes={nodes}
          />
        ))}
        
        {nodes.map((node) => (
          <NodeComponent
            key={node.id}
            node={node}
            isSelected={node.id === selectedNode}
            onDragStart={(position) => handleNodeDragStart(node.id, position)}
            onDragEnd={(position) => handleNodeDragEnd(node.id, position)}
          />
        ))}
      </motion.div>
    </div>
  );
}