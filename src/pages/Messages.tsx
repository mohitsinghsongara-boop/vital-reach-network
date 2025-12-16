import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Search, User } from 'lucide-react';
import { messageAPI } from '@/services/api';
import { toast } from 'sonner';

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    setIsLoading(true);
    try {
      await messageAPI.sendMessage(selectedConversation, newMessage);
      setNewMessage('');
      // Refresh messages
      loadMessages(selectedConversation);
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const data = await messageAPI.getMessages(conversationId);
      setMessages(data);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const loadConversations = async () => {
    try {
      const data = await messageAPI.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Messages</h1>
            <p className="text-muted-foreground">Communicate with donors, receivers, and blood banks</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 h-[calc(100vh-250px)]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Conversations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
                  {conversations.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No conversations yet</p>
                      <p className="text-sm mt-2">Start a conversation from a user profile</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {conversations.map((conversation) => (
                        <button
                          key={conversation.id}
                          onClick={() => {
                            setSelectedConversation(conversation.id);
                            loadMessages(conversation.id);
                          }}
                          className={`w-full p-4 text-left hover:bg-accent transition-colors ${
                            selectedConversation === conversation.id ? 'bg-accent' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {getInitials(conversation.otherUser?.name || 'U')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-semibold truncate">
                                  {conversation.otherUser?.name || 'Unknown User'}
                                </p>
                                {conversation.unreadCount > 0 && (
                                  <Badge variant="default" className="ml-2">
                                    {conversation.unreadCount}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground truncate">
                                {conversation.lastMessage?.content || 'No messages yet'}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Messages View */}
            <Card className="lg:col-span-2 flex flex-col">
              {selectedConversation ? (
                <>
                  <CardHeader className="border-b">
                    <CardTitle>Messages</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-0">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <div className="text-center">
                            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No messages yet</p>
                            <p className="text-sm mt-2">Start the conversation!</p>
                          </div>
                        </div>
                      ) : (
                        messages.map((message) => {
                          const isOwn = message.senderId === user?.id;
                          return (
                            <div
                              key={message.id}
                              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[70%] rounded-lg p-3 ${
                                  isOwn
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-foreground'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p
                                  className={`text-xs mt-1 ${
                                    isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                  }`}
                                >
                                  {new Date(message.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim() || isLoading}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold">Select a conversation</p>
                    <p className="text-sm mt-2">Choose a conversation from the list to start messaging</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Messages;



