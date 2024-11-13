'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questions: QuizQuestion[];
}

export function QuizModal({ open, onOpenChange, questions }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowFeedback(true);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setShowFeedback(false);
      }
    }, 1500);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Knowledge Check</DialogTitle>
          <DialogDescription>
            Test your understanding of the concepts
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Progress value={progress} className="mb-4" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="font-medium">
                {questions[currentQuestion].question}
              </h3>
              <RadioGroup
                value={selectedAnswer}
                onValueChange={setSelectedAnswer}
                className="space-y-2"
              >
                {questions[currentQuestion].options.map((option) => (
                  <div
                    key={option}
                    className={`flex items-center space-x-2 p-2 rounded-md ${
                      showFeedback &&
                      option === questions[currentQuestion].correctAnswer
                        ? 'bg-green-100'
                        : showFeedback &&
                          option === selectedAnswer &&
                          option !== questions[currentQuestion].correctAnswer
                        ? 'bg-red-100'
                        : ''
                    }`}
                  >
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <Button
            onClick={handleNext}
            disabled={!selectedAnswer || showFeedback}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}