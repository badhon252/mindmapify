import { useState } from 'react'
import { Group } from 'lucide-react'

export function SmartGroupingPanel({ nodes, setNodes }) {
  const [groupName, setGroupName] = useState('')

  const handleCreateGroup = () => {
    const selectedNodes = nodes.filter((node) => node.selected)
    if (selectedNodes.length < 2) {
      alert('Please select at least two nodes to create a group')
      return
    }

    const groupNode = {
      id: `group_${Date.now()}`,
      type: 'group',
      data: { label: groupName },
      position: { x: 0, y: 0 },
      style: {
        width: 300,
        height: 200,
        backgroundColor: 'rgba(240, 240, 240, 0.5)',
        borderRadius: '5px',
        border: '1px solid #ccc',
        padding: '10px',
      },
    }

    const updatedNodes = nodes.map((node) => {
      if (node.selected) {
        return {
          ...node,
          position: {
            x: node.position.x - groupNode.position.x,
            y: node.position.y - groupNode.position.y,
          },
          parentNode: groupNode.id,
          extent: 'parent',
        }
      }
      return node
    })

    setNodes([groupNode, ...updatedNodes])
    setGroupName('')
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Smart Grouping</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="flex-1 p-2 border rounded"
        />
        <button onClick={handleCreateGroup} className="p-2 bg-purple-500 text-white rounded flex items-center justify-center">
          <Group className="h-5 w-5 mr-2" />
          Group
        </button>
      </div>
    </div>
  )
}