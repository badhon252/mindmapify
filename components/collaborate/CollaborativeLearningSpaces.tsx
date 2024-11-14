'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, MessageSquare, Users, FileText, Share2 } from 'lucide-react'

const mockCollaborators = [
  { id: 1, name: 'Alice Johnson', initials: 'AJ', image: '/placeholder.svg?height=32&width=32' },
  { id: 2, name: 'Bob Smith', initials: 'BS', image: '/placeholder.svg?height=32&width=32' },
  { id: 3, name: 'Charlie Davis', initials: 'CD', image: '/placeholder.svg?height=32&width=32' },
]

const mockComments = [
  { id: 1, user: 'Alice Johnson', text: 'Great progress on the literature review section!', timestamp: '2 min ago' },
  { id: 2, user: 'Bob Smith', text: 'Can we expand on the methodology? I think we need more detail there.', timestamp: '5 min ago' },
]

const mockRevisions = [
  { id: 1, user: 'Alice Johnson', action: 'Added new section: Results', timestamp: '10 min ago', file: 'results.md' },
  { id: 2, user: 'Bob Smith', action: 'Updated introduction', timestamp: '15 min ago', file: 'introduction.md' },
  { id: 3, user: 'Charlie Davis', action: 'Deleted outdated data table', timestamp: '20 min ago', file: 'data-analysis.md' },
]

export default function CollaborativeLearningSpaces() {
  const [sharingPermission, setSharingPermission] = useState('private')
  const [editingRights, setEditingRights] = useState('view')
  const [newComment, setNewComment] = useState('')

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New comment submitted:', newComment)
    setNewComment('')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Research Paper Collaboration</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sharing" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sharing">
                <Share2 className="w-4 h-4 mr-2" />
                Sharing
              </TabsTrigger>
              <TabsTrigger value="collaboration">
                <Users className="w-4 h-4 mr-2" />
                Collaboration
              </TabsTrigger>
              <TabsTrigger value="history">
                <Clock className="w-4 h-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sharing" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sharing-permissions" className="text-lg font-semibold">Sharing Permissions</Label>
                  <RadioGroup id="sharing-permissions" defaultValue="private" className="mt-2" onValueChange={setSharingPermission}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public">Public (Anyone can view)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private">Private (Only team members)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="specific" id="specific" />
                      <Label htmlFor="specific">Specific Users</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="editing-rights" className="text-lg font-semibold">Editing Rights</Label>
                  <Select onValueChange={setEditingRights} defaultValue="view">
                    <SelectTrigger id="editing-rights" className="mt-2">
                      <SelectValue placeholder="Select editing rights" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">View Only</SelectItem>
                      <SelectItem value="edit">Edit</SelectItem>
                      <SelectItem value="suggest">Suggest Changes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="mt-4">Update Sharing Settings</Button>
              </div>
            </TabsContent>
            <TabsContent value="collaboration" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-semibold">Active Collaborators</Label>
                  <div className="flex mt-2 space-x-2">
                    {mockCollaborators.map((collaborator) => (
                      <Avatar key={collaborator.id}>
                        <AvatarImage src={collaborator.image} alt={collaborator.name} />
                        <AvatarFallback>{collaborator.initials}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-lg font-semibold">Recent Comments</Label>
                  <ScrollArea className="h-[200px] mt-2 p-4 rounded-md border">
                    {mockComments.map((comment) => (
                      <div key={comment.id} className="mb-4">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback>{comment.user[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-semibold">{comment.user}</span>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="mt-1">{comment.text}</p>
                      </div>
                    ))}
                  </ScrollArea>
                  <form onSubmit={handleCommentSubmit} className="mt-4">
                    <Textarea 
                      placeholder="Add a comment or suggestion..." 
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button type="submit" className="mt-2">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Add Comment
                    </Button>
                  </form>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <Label className="text-lg font-semibold">Revision History</Label>
              <ScrollArea className="h-[300px] mt-2 p-4 rounded-md border">
                {mockRevisions.map((revision) => (
                  <div key={revision.id} className="mb-4 flex items-start space-x-2">
                    <FileText className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{revision.user}</span>
                        <span className="text-xs text-gray-500">{revision.timestamp}</span>
                      </div>
                      <p>{revision.action}</p>
                      <p className="text-sm text-gray-500">File: {revision.file}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <Button className="mt-4">View Full History</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save Draft</Button>
          <Button>Publish Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}