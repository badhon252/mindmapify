import { useState } from 'react'
import { X } from 'lucide-react'

export function OnboardingTutorial({ onClose }) {
  const [step, setStep] = useState(0)
  const steps = [
    "Welcome to Dynamic Knowledge Mapping! Let's get you started.",
    "Create nodes by entering keywords or phrases in the left panel.",
    "Customize your nodes with icons, colors, and hierarchies.",
    "Connect nodes by dragging from one node to another.",
    "Use the search bar to quickly find nodes in your map.",
    "You're all set! Start mapping your knowledge."
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <button onClick={onClose} className="float-right">
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Tutorial</h2>
        <p className="mb-4">{steps[step]}</p>
        <div className="flex justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className="px-4 py-2 bg-gray-200 rounded"
            disabled={step === 0}
          >
            Previous
          </button>
          <button
            onClick={() => step < steps.length - 1 ? setStep(step + 1) : onClose()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {step < steps.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  )
}