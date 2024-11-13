export interface Position {
  x: number;
  y: number;
}

export interface Node {
  id: string;
  position: Position;
  content: string;
  description?: string;
  type: 'text' | 'image' | 'link';
  metadata?: Record<string, unknown>;
}

export interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'default' | 'bidirectional' | 'hierarchical';
  label?: string;
}

export interface KnowledgeMap {
  id: string;
  title: string;
  description?: string;
  nodes: Node[];
  connections: Connection[];
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  collaborators?: string[];
  tags?: string[];
}