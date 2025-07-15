"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Circle,
  CheckCheck,
  Clock,
  Star,
} from "lucide-react";

// Mock messages data
const mockConversations = [
  {
    id: 1,
    participantName: "Sita Cleaning Services",
    participantAvatar: "S",
    lastMessage: "Thank you for booking! I'll be there at 10 AM tomorrow.",
    lastMessageTime: "2 min ago",
    unreadCount: 2,
    isOnline: true,
    service: "House Cleaning",
    status: "confirmed",
  },
  {
    id: 2,
    participantName: "Raj Tutorial Center",
    participantAvatar: "R",
    lastMessage: "What topics would you like to focus on for math tutoring?",
    lastMessageTime: "1 hour ago",
    unreadCount: 0,
    isOnline: false,
    service: "Math Tutoring",
    status: "pending",
  },
  {
    id: 3,
    participantName: "TechMind Solutions",
    participantAvatar: "T",
    lastMessage:
      "I can definitely help with your website project. Let's discuss the requirements.",
    lastMessageTime: "3 hours ago",
    unreadCount: 1,
    isOnline: true,
    service: "Web Development",
    status: "in_progress",
  },
];

const mockMessages = [
  {
    id: 1,
    senderId: "provider",
    senderName: "Sita Cleaning Services",
    content: "Hello! Thank you for booking our cleaning service.",
    timestamp: "10:30 AM",
    isRead: true,
  },
  {
    id: 2,
    senderId: "user",
    senderName: "You",
    content:
      "Hi! I need a thorough cleaning for my 3BHK apartment. When can you come?",
    timestamp: "10:32 AM",
    isRead: true,
  },
  {
    id: 3,
    senderId: "provider",
    senderName: "Sita Cleaning Services",
    content:
      "I can come tomorrow at 10 AM. It will take approximately 4-5 hours for a thorough cleaning.",
    timestamp: "10:35 AM",
    isRead: true,
  },
  {
    id: 4,
    senderId: "user",
    senderName: "You",
    content: "Perfect! That works for me. What should I prepare beforehand?",
    timestamp: "10:37 AM",
    isRead: true,
  },
  {
    id: 5,
    senderId: "provider",
    senderName: "Sita Cleaning Services",
    content:
      "Just make sure all valuable items are kept safely. I'll bring all the cleaning supplies.",
    timestamp: "10:40 AM",
    isRead: true,
  },
  {
    id: 6,
    senderId: "provider",
    senderName: "Sita Cleaning Services",
    content: "Thank you for booking! I'll be there at 10 AM tomorrow.",
    timestamp: "2 min ago",
    isRead: false,
  },
];

export default function MessagesContent() {
  const { t } = useLanguage();
  const [selectedConversation, setSelectedConversation] = useState(
    mockConversations[0],
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.service.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message sending logic here
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "in_progress":
        return "text-blue-600";
      case "completed":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">
            Communicate with service providers and manage your bookings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      selectedConversation.id === conversation.id
                        ? "bg-blue-50 border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {conversation.participantAvatar}
                          </span>
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {conversation.participantName}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {conversation.lastMessageTime}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-gray-600">
                            {conversation.service}
                          </p>
                          <span
                            className={`text-xs font-medium capitalize ${getStatusColor(conversation.status)}`}
                          >
                            {conversation.status.replace("_", " ")}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate pr-2">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b bg-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {selectedConversation.participantAvatar}
                        </span>
                      </div>
                      {selectedConversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {selectedConversation.participantName}
                      </h3>
                      <p className="text-xs text-gray-600 flex items-center">
                        <Circle className="h-2 w-2 mr-1 text-green-500 fill-current" />
                        {selectedConversation.service} •{" "}
                        {selectedConversation.status.replace("_", " ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div
                        className={`flex items-center justify-between mt-1 ${
                          message.senderId === "user"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        <span className="text-xs">{message.timestamp}</span>
                        {message.senderId === "user" && (
                          <div className="ml-2">
                            {message.isRead ? (
                              <CheckCheck className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-gray-50 rounded-b-lg">
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>

                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
