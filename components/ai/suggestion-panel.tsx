'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Plus, ArrowRight } from 'lucide-react';
import { AISuggestion } from '@/lib/ai/suggestions';
import { useKnowledgeMap } from '@/hooks/use-knowledge-map';
import { motion, AnimatePresence } from 'framer-motion';

export function SuggestionPanel() {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const { nodes, connections, addNode, addConnection } = useKnowledgeMap();

  useEffect(() => {
    // In a real implementation, this would fetch suggestions based on the current map
    const mockSuggestions: AISuggestion[] = [
      {
        id: '1',
        type: 'connection',
        title: 'Connect Related Topics',
        description: 'Machine Learning and Neural Networks seem related',
        confidence: 0.85,
      },
      {
        id: '2',
        type: 'topic',
        title: 'Add New Topic',
        description: 'Consider adding "Deep Learning" to your map',
        confidence: 0.75,
      },
    ];
    setSuggestions(mockSuggestions);
  }, [nodes, connections]);

  return (
    <div className="w-80 bg-background border-l">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          AI Suggestions
        </h3>
      </div>
      <div className="p-4 space-y-4">
        <AnimatePresence>
          {suggestions.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-4 hover:border-primary transition-colors">
                <h4 className="font-medium mb-2">{suggestion.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {suggestion.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {Math.round(suggestion.confidence * 100)}% confidence
                  </div>
                  <Button size="sm" variant="outline">
                    {suggestion.type === 'connection' ? (
                      <ArrowRight className="w-4 h-4 mr-2" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    Add to Map
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}