"use client";
import * as React from "react";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Download, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "./logo.png";
interface Message {
  role: "agent" | "user";
  content: string;
  timestamp: string;
}
import runagent from "./game/src/index";
import axios from "axios";
import { copyToClipboard } from "./lib/utils";
export const outerMessage: Message[] = [];
export let sendMessageGlobal: ((message: string) => void) | null = null;

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content:
        "Hello, I am a Buck Terminal. Connect your wallet and let's get started",
      timestamp: "4:08:28 PM",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const sendMessage = (message: string, role?: string) => {
    if (!message.trim()) return;
    const newMessage: Message = {
      role: role === "agent" ? "agent" : "user",
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    scrollToBottom();
  };

  const executeTask = async (task: string) => {
    try {
      const response = await axios.post("/api", task, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        sendMessage(response.data.data, "agent");
        setLoading(false);
      }
      console.log("Response:", response);
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
  const handleSend = (input: string) => {
    if (!input.trim()) return;
    sendMessage(input, "user");
    executeTask(input);
    setInput("");
    setLoading(true);
  };
  return (
    <div className="flex-1 flex flex-col bg-[#141414] overflow-auto text-[#F1E9E9]">
      <ScrollArea className="flex-1 flex flex-col max-h-full  p-4">
        <div className="space-y-4 flex flex-col overflow-y">
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
                      onClick={() => copyToClipboard(message.content)}
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
            </div>
          ))}
          {loading && (
            <>
              <div className="flex gap-2">
                <div className="rounded-full h-fit w-fit flex gap-2  overflow-hidden">
                  <Image src={logo} width={30} className="" alt="" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium">Buck</span>
                  <span className="text-xs text-yellow-400 font-medium">
                    Wait for response
                  </span>
                </div>
                <div className="flex items-center gap-2"></div>
              </div>
              <div
                className={cn(
                  "p-3 rounded-lg mx-9 max-w-[45%]",
                  "bg-[#3C2322]"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                  </div>
                </p>
              </div>
            </>
          )}
          <div ref={messagesEndRef} />
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
