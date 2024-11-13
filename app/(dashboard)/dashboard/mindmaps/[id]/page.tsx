'use client';

import { useState } from 'react';
import { KnowledgeMapCanvas } from '@/components/knowledge-map/canvas';
import { SuggestionPanel } from '@/components/ai/suggestion-panel';
import { ImportPanel } from '@/components/content/import-panel';
import { Button } from '@/components/ui/button';
import { Brain, Save, Share2, Book } from 'lucide-react';
import { QuizModal } from '@/components/study/quiz-modal';

const mockQuestions = [
  {
    question: 'How do neural networks relate to deep learning?',
    options: [
      'They are the same thing',
      'Neural networks are a type of deep learning',
      'Deep learning uses neural networks',
    ],
    correctAnswer: 'Deep learning uses neural networks',
  },
  {
    question: 'What is the main advantage of knowledge mapping?',
    options: [
      'It looks pretty',
      'It helps visualize connections between concepts',
      'It saves paper',
    ],
    correctAnswer: 'It helps visualize connections between concepts',
  },
];

export default function MindMapPage({ params }: { params: { id: string } }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showImport, setShowImport] = useState(false);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex-1 flex flex-col">
        <div className="border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Brain className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">Knowledge Map</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowImport(!showImport)}
              >
                Import Content
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowQuiz(true)}>
                <Book className="w-4 h-4 mr-2" />
                Test Knowledge
              </Button>
              <Button variant="outline" size="icon">
                <Save className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {showImport && (
            <div className="p-4 border-t">
              <ImportPanel />
            </div>
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <KnowledgeMapCanvas />
        </div>
      </div>
      <SuggestionPanel />
      <QuizModal
        open={showQuiz}
        onOpenChange={setShowQuiz}
        questions={mockQuestions}
      />
    </div>
  );
}