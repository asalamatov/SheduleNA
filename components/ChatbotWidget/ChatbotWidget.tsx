"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Send, Loader2, X } from "lucide-react";

import { ChatbotButton } from "./ChatbotButton";
import { TypingCursor } from "./TypingCursor";
import { TypingDots } from "./TypingDots";

interface ChatForm {
  message: string;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hi! How can I help you with scheduling?" },
  ]);

  const { register, handleSubmit, reset } = useForm<ChatForm>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = async (data: ChatForm) => {
    const message = data.message.trim();
    if (!message) return;

    const userMessage = { role: "user" as const, content: message };
    setMessages((prev) => [...prev, userMessage]);
    reset();

    const assistantIndex = messages.length + 1;
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        assistantText += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          updated[assistantIndex] = { role: "assistant", content: assistantText };
          return updated;
        });
      }
    } catch (err) {
      console.error("Streaming error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error occurred." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-[28rem] h-[34rem] bg-white text-black shadow-lg rounded-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-green-500 text-white rounded-t-lg">
            <span className="font-semibold">Admissions Assistant</span>
            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3 text-sm space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md max-w-[80%] ${
                  msg.role === "user"
                    ? "ml-auto bg-green-200 text-right"
                    : "bg-gray-100"
                }`}
              >
                {msg.content}
                {isLoading && i === messages.length - 1 && <TypingCursor />}
              </div>
            ))}
            {isLoading && messages[messages.length - 1].role !== "assistant" && (
              <div className="p-2 bg-gray-100 rounded-md text-gray-600 text-sm flex items-center gap-2">
                Assistant is typing <TypingDots />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input box */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-3 flex gap-2 border-t"
          >
            <input
              {...register("message")}
              className="flex-1 border p-2 rounded text-sm text-white focus:outline-none"
              placeholder="Ask something..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      ) : (
        <ChatbotButton setIsOpen={setIsOpen} />
      )}
    </div>
  );
}