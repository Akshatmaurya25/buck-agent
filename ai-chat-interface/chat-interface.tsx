"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "./logo.png";
interface Message {
  role: "agent" | "user";
  content: string | React.ReactNode;
  timestamp: string;
}
import runagent from "../src/index";
export const outerMessage: Message[] = [];
export let sendMessageGlobal: ((message: string) => void) | null = null;

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [loading, setloading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content: "Hello, I am a generative AI agent. How may I assist you today?",
      timestamp: "4:08:28 PM",
    },
    {
      role: "user",
      content: "Hi, I'd like to check my bill.",
      timestamp: "4:08:37 PM",
    },
    {
      role: "agent",
      content:
        "Please hold for a second.\n\nOk, I can help you with that\n\nI'm pulling up your current bill information\n\nYour current bill is $150, and it is due on August 31, 2024.\n\nIf you need more details, feel free to ask!",
      timestamp: "4:08:37 PM",
    },
  ]);

  const sendMessage = (message: string, role?: string) => {
    if (!message.trim()) return;
    const newMessage: Message = {
      role: role === "agent" ? "agent" : "user",
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const executeTask = async (task: string) => {
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) throw new Error("Failed to add game");

      // Refresh the games list
      console.log(response);
    } catch (err) {
      console.error("Error", err);
    }
  };
  useEffect(() => {
    sendMessageGlobal = sendMessage; // Assign sendMessage function globally
    outerMessage.length = 0;
    outerMessage.push(...messages);
    console.log(outerMessage);
  }, [messages]);
  const handleSend = (message: string) => {
    sendMessage(message);
    executeTask(message);
  };
  return (
    <div className="flex-1 flex flex-col bg-[#141414] overflow-auto text-[#F1E9E9]">
      <ScrollArea className="flex-1 max-h-full  p-4">
        <div className="space-y-4  overflow-y">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-2 max-w-[80%]",
                message.role === "user"
                  ? "ml-auto justify-end mr-7"
                  : "justify-start"
              )}
            >
              {message.role === "agent" && (
                // <div className="h-8 w-8 rounded-full bg-[#3C2322] flex-shrink-0" />
                <div className="rounded-full h-fit overflow-hidden">
                  <Image src={logo} width={30} className="" alt="" />
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {message.role === "agent" ? "Buck" : "You"}
                  </span>
                  <span className="text-sm text-[#F1E9E9]">
                    {message.timestamp}
                  </span>
                </div>
                <div
                  className={cn(
                    "p-3 rounded-lg",
                    message.role === "user" ? "bg-[#2E2E2E]" : "bg-[#3C2322]"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
                {message.role === "agent" && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#F1E9E9] hover:bg-[#2E2E2E]"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#F1E9E9] hover:bg-[#2E2E2E]"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#F1E9E9] hover:bg-[#2E2E2E]"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#F1E9E9] hover:bg-[#2E2E2E]"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              {loading && (
                <>
                  <div className="rounded-full h-fit overflow-hidden">
                    <Image src={logo} width={30} className="" alt="" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Buck</span>
                    <span className="text-sm text-[#F1E9E9]">
                      {message.timestamp}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      message.role === "user" ? "bg-[#2E2E2E]" : "bg-[#3C2322]"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">Loading</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-[#3C2322]">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type a message as a customer"
            value={input}
            // rows={1}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[44px] max-h-32 bg-[#2E2E2E] text-[#F1E9E9] border-[#3C2322]"
          />
          <Button
            className="px-8 bg-[#3C2322] text-[#F1E9E9] hover:bg-[#2E2E2E]"
            onClick={() => handleSend(input)}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
