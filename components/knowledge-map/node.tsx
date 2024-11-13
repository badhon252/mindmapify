'use client';

import { motion } from 'framer-motion';
import { Node, Position } from '@/types/knowledge-map';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FileText, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

interface NodeProps {
  node: Node;
  isSelected: boolean;
  onDragStart: (position: Position) => void;
  onDragEnd: (position: Position) => void;
}

const nodeIcons = {
  text: FileText,
  image: ImageIcon,
  link: LinkIcon,
};

export function NodeComponent({ node, isSelected, onDragStart, onDragEnd }: NodeProps) {
  const Icon = nodeIcons[node.type];

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={(event, info) => {
        onDragStart({ x: info.point.x, y: info.point.y });
      }}
      onDragEnd={(event, info) => {
        onDragEnd({ x: info.point.x, y: info.point.y });
      }}
      initial={{ x: node.position.x, y: node.position.y }}
      animate={{ x: node.position.x, y: node.position.y }}
      className="absolute"
      style={{ touchAction: 'none' }}
    >
      <Card
        className={cn(
          'w-48 p-4 cursor-move shadow-lg transition-shadow hover:shadow-xl',
          isSelected && 'ring-2 ring-primary'
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm font-medium truncate">{node.content}</div>
        </div>
        {node.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {node.description}
          </p>
        )}
      </Card>
    </motion.div>
  );
}