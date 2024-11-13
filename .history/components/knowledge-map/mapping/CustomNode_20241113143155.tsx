import { Handle, Position } from 'reactflow'

export function CustomNode({ data }) {
  return (
    <div style={{ background: data.color }} className="px-4 py-2 rounded-md shadow-md border border-gray-300">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center">
        {data.icon && <img src={data.icon} alt="Node icon" className="w-6 h-6 mr-2" />}
        <div>{data.label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}