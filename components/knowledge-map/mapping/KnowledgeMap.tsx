'use client'

import { useState, useCallback } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  NodeTypes,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { OnboardingTutorial } from './OnboardingTutorial'
import { NodeCreationPanel } from './NodeCreationPanel'
import { NodeDetailsPanel } from './NodeDetailsPanel'
import { SmartGroupingPanel } from './SmartGroupingPanel'
import { CustomNode } from './CustomNode'

const nodeTypes: NodeTypes = {
  custom: CustomNode,
}

export default function KnowledgeMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [showTutorial, setShowTutorial] = useState(true)
  const [selectedNode, setSelectedNode] = useState(null)

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const handleNodeClick = (event, node) => {
    setSelectedNode(node)
  }

  const handleCreateNode = (nodeData) => {
    const newNode = {
      id: `node_${nodes.length + 1}`,
      type: 'custom',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { ...nodeData },
    }
    setNodes((nds) => nds.concat(newNode))
  }

  return (
    <div className="h-screen flex">
      {showTutorial && <OnboardingTutorial onClose={() => setShowTutorial(false)} />}
      <div className="w-1/4 p-4 border-r">
        <NodeCreationPanel onCreateNode={handleCreateNode} />
        <SmartGroupingPanel nodes={nodes} setNodes={setNodes} />
      </div>
      <div className="w-1/2 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      <div className="w-1/4 p-4 border-l">
        <NodeDetailsPanel node={selectedNode} setNodes={setNodes} />
      </div>
    </div>
  )
}