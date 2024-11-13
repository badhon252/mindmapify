import { useState } from 'react'
import { PlusCircle, Image, Palette } from 'lucide-react'

export function NodeCreationPanel({ onCreateNode }) {
  const [nodeText, setNodeText] = useState('')
  const [nodeColor, setNodeColor] = useState('#ffffff')
  const [nodeIcon, setNodeIcon] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreateNode({ label: nodeText, color: nodeColor, icon: nodeIcon })
    setNodeText('')
    setNodeColor('#ffffff')
    setNodeIcon('')
  }

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Create Node</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={nodeText}
          onChange={(e) => setNodeText(e.target.value)}
          placeholder="Enter node text"
          className="w-full p-2 border rounded"
        />
        <div className="flex items-center space-x-2">
          <Palette className="h-5 w-5" />
          <input
            type="color"
            value={nodeColor}
            onChange={(e) => setNodeColor(e.target.value)}
            className="p-1 border rounded"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Image className="h-5 w-5" />
          <input
            type="text"
            value={nodeIcon}
            onChange={(e) => setNodeIcon(e.target.value)}
            placeholder="Enter icon URL"
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded flex items-center justify-center">
          <PlusCircle className="h-5 w-5 mr-2" />
          Create Node
        </button>
      </form>
    </div>
  )
}