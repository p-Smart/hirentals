import React, { useState } from "react";
import { Send, Check, X, Lock } from "lucide-react";
import { Button } from "../components/ui/button";

interface Message {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  status: "pending" | "accepted" | "declined" | "closed";
  created_at: string;
}

interface Conversation {
  user_id: string;
  name: string;
  last_message?: string;
  unread?: number;
  status: "pending" | "accepted" | "declined" | "closed";
}

const dummyConversations: Conversation[] = [
  {
    user_id: "1",
    name: "Alice Johnson",
    last_message: "Thank you for your interest!",
    unread: 2,
    status: "pending",
  },
  {
    user_id: "2",
    name: "Bob Brown",
    last_message: "Can we discuss the details?",
    unread: 0,
    status: "accepted",
  },
  {
    user_id: "3",
    name: "Charlie Davis",
    last_message: "I am not available at the moment.",
    unread: 1,
    status: "declined",
  },
  {
    user_id: "4",
    name: "David Evans",
    last_message: "This lead has been closed.",
    unread: 0,
    status: "closed",
  },
  {
    user_id: "5",
    name: "Eve Foster",
    last_message: "Looking forward to working with you!",
    unread: 3,
    status: "accepted",
  },
];

const dummyMessages: { [key: string]: Message[] } = {
  "1": [
    {
      id: "1",
      sender: "owner",
      receiver: "Alice Johnson",
      content: "Thank you for your interest!",
      status: "pending",
      created_at: "2023-10-01T12:00:00Z",
    },
    {
      id: "2",
      sender: "Alice Johnson",
      receiver: "owner",
      content: "Can we discuss the details?",
      status: "pending",
      created_at: "2023-10-01T12:05:00Z",
    },
  ],
  "2": [
    {
      id: "1",
      sender: "owner",
      receiver: "Bob Brown",
      content: "Can we discuss the details?",
      status: "accepted",
      created_at: "2023-10-02T14:00:00Z",
    },
    {
      id: "2",
      sender: "Bob Brown",
      receiver: "owner",
      content: "Sure, let me know your availability.",
      status: "accepted",
      created_at: "2023-10-02T14:05:00Z",
    },
  ],
  "3": [
    {
      id: "1",
      sender: "owner",
      receiver: "Charlie Davis",
      content: "I am not available at the moment.",
      status: "declined",
      created_at: "2023-10-03T16:00:00Z",
    },
    {
      id: "2",
      sender: "Charlie Davis",
      receiver: "owner",
      content: "Thank you for letting me know.",
      status: "declined",
      created_at: "2023-10-03T16:05:00Z",
    },
  ],
  "4": [
    {
      id: "1",
      sender: "owner",
      receiver: "David Evans",
      content: "This lead has been closed.",
      status: "closed",
      created_at: "2023-10-04T18:00:00Z",
    },
    {
      id: "2",
      sender: "David Evans",
      receiver: "owner",
      content: "Understood, thank you.",
      status: "closed",
      created_at: "2023-10-04T18:05:00Z",
    },
  ],
  "5": [
    {
      id: "1",
      sender: "owner",
      receiver: "Eve Foster",
      content: "Looking forward to working with you!",
      status: "accepted",
      created_at: "2023-10-05T20:00:00Z",
    },
    {
      id: "2",
      sender: "Eve Foster",
      receiver: "owner",
      content: "Same here, let’s get started.",
      status: "accepted",
      created_at: "2023-10-05T20:05:00Z",
    },
  ],
};

const Messages = () => {
  const [conversations, setConversations] =
    useState<Conversation[]>(dummyConversations);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  const loadMessages = (userId: string) => {
    setMessages(dummyMessages[userId] || []);
  };

  const handleConversationClick = (userId: string) => {
    setSelectedConversation(userId);
    loadMessages(userId);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: `${messages.length + 1}`,
      sender: "owner",
      receiver: selectedConversation,
      content: newMessage.trim(),
      status: "pending",
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Accepted
          </span>
        );
      case "declined":
        return (
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
            Declined
          </span>
        );
      case "closed":
        return (
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            Closed
          </span>
        );
      default:
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)] bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex h-full">
        {/* Conversations List */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Messages</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No conversations yet
              </div>
            ) : (
              conversations.map((conversation) => (
                <button
                  key={conversation.user_id}
                  onClick={() => handleConversationClick(conversation.user_id)}
                  className={`w-full p-4 text-left hover:bg-gray-50 ${
                    selectedConversation === conversation.user_id
                      ? "bg-gray-50"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{conversation.name}</h3>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.last_message}
                      </p>
                      {getStatusBadge(conversation.status)}
                    </div>
                    {conversation.unread ? (
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                        {conversation.unread}
                      </span>
                    ) : null}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-medium">
                  {
                    conversations.find(
                      (c) => c.user_id === selectedConversation
                    )?.name
                  }
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "owner"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.sender === "owner"
                          ? "bg-primary text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Button onClick={sendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
