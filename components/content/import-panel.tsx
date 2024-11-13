'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Link, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { summarizeContent } from '@/lib/ai/summarization';
import { useKnowledgeMap } from '@/hooks/use-knowledge-map';

export function ImportPanel() {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { addNode } = useKnowledgeMap();

  const handleImport = async (type: 'url' | 'text') => {
    setIsProcessing(true);
    try {
      const content = type === 'url' ? url : text;
      const summary = await summarizeContent(content, type === 'url' ? 'webpage' : 'text');
      
      // Create nodes from the summary
      const mainNode = {
        id: `node-${Date.now()}`,
        position: { x: 400, y: 300 },
        content: summary.title,
        type: 'text' as const,
        description: summary.mainPoints.join(' • '),
      };
      
      addNode(mainNode);
      
      // Clear the form
      if (type === 'url') {
        setUrl('');
      } else {
        setText('');
      }
    } catch (error) {
      console.error('Failed to process content:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-4">
      <Tabs defaultValue="text">
        <TabsList className="mb-4">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Text
          </TabsTrigger>
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Link className="w-4 h-4" />
            URL
          </TabsTrigger>
          <TabsTrigger value="file" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            File
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text">
          <div className="space-y-4">
            <Textarea
              placeholder="Paste your text content here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
            />
            <Button
              onClick={() => handleImport('text')}
              disabled={!text || isProcessing}
              className="w-full"
            >
              Process Text
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="url">
          <div className="space-y-4">
            <Input
              type="url"
              placeholder="Enter URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              onClick={() => handleImport('url')}
              disabled={!url || isProcessing}
              className="w-full"
            >
              Import from URL
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="file">
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag and drop files here, or click to select files
            </p>
            <Input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => {
                // Handle file upload
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}