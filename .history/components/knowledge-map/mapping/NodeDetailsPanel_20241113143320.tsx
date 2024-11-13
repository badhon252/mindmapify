import { useState, useEffect } from 'react'
import { Save, Trash2 } from 'lucide-react'

export function NodeDetailsPanel({ node, setNodes }) {
  const [nodeData, setNodeData] = useState(node?.data || {})

  useEffect(() => {
    setNodeData(node?.data || {})
  }, [node])

  const handleSave = () => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          return { ...n, data: nodeData }
        }
        return n
      })
    )
  }

  const handleDelete = () => {
    setNodes((nds) => nds.filter((n) => n.id !== node.id))
  }

  if (!node) return <div className="p-4">Select a node to view details</div>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Node Details</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={nodeData.label || ''}
          onChange={(e) => setNodeData({ ...nodeData, label: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="color"
          value={nodeData.color || '#ffffff'}
          onChange={(e) => setNodeData({ ...nodeData, color: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={nodeData.icon || ''}
          onChange={(e) => setNodeData({ ...nodeData, icon: e.target.value })}
          placeholder="Icon URL"
          className="w-full p-2 border rounded"
        />
        <div className="flex space-x-2">
          <button onClick={handleSave} className="flex-1 p-2 bg-green-500 text-white rounded flex items-center justify-center">
            <Save className="h-5 w-5 mr-2" />
            Save
          </button>
          <button onClick={handleDelete} className="flex-1 p-2 bg-red-500 text-white rounded flex items-center justify-center">
            <Trash2 className="h-5 w-5 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}