import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  HelpCircle, 
  Book, 
  Phone, 
  Mail, 
  Video,
  Send,
  Bot,
  User,
  Search,
  ChevronRight
} from "lucide-react";

interface HelpCenterProps {
  onClose: () => void;
}

interface ChatMessage {
  id: number;
  type: 'bot' | 'user';
  message: string;
  timestamp: Date;
}

export default function HelpCenter({ onClose }: HelpCenterProps) {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      message: "Hello! I'm your EduPortal AI assistant. I can help you understand student data, navigate the platform, and answer questions about risk assessment. How can I assist you today?",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: chatHistory.length + 1,
      type: 'user',
      message: chatMessage,
      timestamp: new Date()
    };

    // Simulate AI response
    const botResponse: ChatMessage = {
      id: chatHistory.length + 2,
      type: 'bot',
      message: generateBotResponse(chatMessage),
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage, botResponse]);
    setChatMessage('');
  };

  const generateBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('risk') || lowerMessage.includes('dropout')) {
      return "Our risk assessment system evaluates students based on multiple factors: attendance (below 70% increases risk), academic performance (failing grades), fee payment status, and medical conditions. High-risk students are highlighted in red and need immediate intervention. Would you like me to explain how to create intervention plans?";
    }
    
    if (lowerMessage.includes('attendance')) {
      return "Attendance tracking is crucial for identifying at-risk students. You can view attendance data in the Students section, filter by attendance percentage, and generate reports. Students with attendance below 70% are automatically flagged for attention. Need help setting up attendance alerts?";
    }
    
    if (lowerMessage.includes('grades') || lowerMessage.includes('marks')) {
      return "Grade management allows you to track student performance across subjects. The system calculates average marks and identifies students who are underperforming. You can view detailed grade breakdowns, compare class averages, and identify students who need academic support.";
    }
    
    if (lowerMessage.includes('fees') || lowerMessage.includes('payment')) {
      return "Fee management tracks payment status for all students. Overdue payments are highlighted in red, pending payments in orange. You can generate fee reports, send payment reminders, and track collection rates. Students with fee issues may have higher dropout risk.";
    }
    
    if (lowerMessage.includes('medical') || lowerMessage.includes('health')) {
      return "Medical records help identify students who may need special attention. Students with chronic conditions, medication needs, or health issues are flagged for monitoring. This information is crucial for understanding absenteeism patterns and providing appropriate support.";
    }
    
    return "I'm here to help you navigate EduPortal! I can assist with understanding student data, risk assessment criteria, generating reports, managing classes, and using platform features. What specific area would you like help with?";
  };

  const faqItems = [
    {
      question: "How is student risk level calculated?",
      answer: "Risk level is determined by attendance rate, academic performance, fee payment status, and medical conditions."
    },
    {
      question: "What makes a student 'high-risk'?",
      answer: "Students with attendance below 70%, failing grades, overdue fees, or urgent medical conditions are flagged as high-risk."
    },
    {
      question: "How do I generate reports?",
      answer: "Go to the Reports section and select the type of report you need. You can filter by class, date range, or risk level."
    },
    {
      question: "Can I export student data?",
      answer: "Yes, you can export data from any section using the Export button. Data is available in CSV and PDF formats."
    }
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[80vh] bg-card rounded-xl shadow-float border">
        <div className="flex h-full">
          {/* Left Sidebar - FAQ & Resources */}
          <div className="w-1/3 border-r p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Help Center</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                ×
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4 mb-8">
              <Card className="shadow-card cursor-pointer hover:shadow-elevated transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Book className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="font-medium">User Guide</h3>
                      <p className="text-sm text-muted-foreground">Complete platform documentation</p>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card cursor-pointer hover:shadow-elevated transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-secondary" />
                    <div>
                      <h3 className="font-medium">Video Tutorials</h3>
                      <p className="text-sm text-muted-foreground">Step-by-step video guides</p>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card cursor-pointer hover:shadow-elevated transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-accent" />
                    <div>
                      <h3 className="font-medium">Contact Support</h3>
                      <p className="text-sm text-muted-foreground">Get help from our team</p>
                    </div>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <Card key={index} className="shadow-card">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-2">{item.question}</h4>
                      <p className="text-xs text-muted-foreground">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - AI Chat */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="gradient-hero p-2 rounded-lg">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-sm text-muted-foreground">
                    Ask me anything about EduPortal features and student management
                  </p>
                </div>
                <Badge variant="secondary" className="ml-auto">Online</Badge>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {chatHistory.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'bot' && (
                    <div className="gradient-hero p-2 rounded-full h-8 w-8 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-12'
                        : 'bg-muted mr-12'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.type === 'user' && (
                    <div className="bg-primary p-2 rounded-full h-8 w-8 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me about student management, risk assessment, or platform features..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} variant="hero">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                💡 Try asking: "How do I identify at-risk students?" or "What does the risk assessment mean?"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}