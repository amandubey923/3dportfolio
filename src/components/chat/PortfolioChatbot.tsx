"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "Who is Aman?",
  "Show top projects",
  "What are his skills?",
  "How can I contact him?",
];

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I am **Aman AI**, Aman Dubey's portfolio assistant. Ask me anything about Aman's **10+ full-stack projects**, **technical skills**, **SIH hackathon journey**, or **contact info**!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    setHasInteracted(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Format history for context
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role === "assistant" ? ("model" as const) : ("user" as const),
          content: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || "Failed to generate reply");
      }
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I encountered a temporary communication glitch. You can still reach Aman directly at [kumaraman19137@gmail.com](mailto:kumaraman19137@gmail.com) or inspect his projects on [GitHub](https://github.com/amandubey923).",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content:
          "Conversation reset. What else would you like to explore about Aman Dubey's engineering portfolio?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  // Basic markdown link and bold renderer
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|\n)/g);

    return parts.map((part, index) => {
      if (!part) return null;

      // Link: [Text](URL)
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80 inline-flex items-center gap-0.5"
          >
            {linkMatch[1]}
            <ExternalLink className="w-2.5 h-2.5 inline-block" />
          </a>
        );
      }

      // Bold: **Text**
      const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
      if (boldMatch) {
        return (
          <strong key={index} className="font-bold text-foreground">
            {boldMatch[1]}
          </strong>
        );
      }

      // Newline
      if (part === "\n") {
        return <br key={index} />;
      }

      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Floating Chat Popover Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="mb-4 w-[360px] sm:w-[410px] max-w-[calc(100vw-32px)] h-[540px] max-h-[78vh] flex flex-col rounded-3xl border border-primary/30 bg-card/95 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-primary/15 border border-primary/40 shadow-[0_0_15px_var(--glow-primary)]">
                  <Bot className="w-5 h-5 text-primary" />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-background animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5 leading-none">
                    Aman AI
                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-primary/20 text-primary border border-primary/30">
                      ASSISTANT
                    </span>
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Portfolio Assistant • Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  title="Clear conversation"
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-4 py-2 bg-white/[0.015] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                  className="shrink-0 px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.03] hover:border-primary/50 hover:bg-primary/10 text-[11px] font-medium text-foreground/80 hover:text-primary transition active:scale-95 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Message Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
              {messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-[11px] font-mono ${
                        isUser
                          ? "bg-primary text-primary-foreground font-bold"
                          : "bg-white/10 text-primary border border-white/10"
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                        isUser
                          ? "bg-primary/20 border border-primary/40 text-foreground shadow-sm rounded-tr-sm"
                          : "bg-white/[0.04] border border-white/10 text-foreground/90 rounded-tl-sm"
                      }`}
                    >
                      <div>{renderFormattedText(m.content)}</div>
                      <div className="text-[9px] font-mono text-muted-foreground/70 mt-1 text-right">
                        {m.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground text-xs pl-9">
                  <div className="flex items-center gap-1 p-2 rounded-xl bg-white/[0.04] border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                  <span className="text-[11px] font-mono">Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input & Disclaimer */}
            <div className="p-3.5 bg-white/[0.02] border-t border-white/10 space-y-2">
              <div className="flex items-end gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/15 focus-within:border-primary/60 transition shadow-inner">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Aman's projects, stack, experience..."
                  rows={1}
                  className="flex-1 max-h-24 bg-transparent resize-none px-3 py-1.5 text-xs sm:text-sm text-foreground focus:outline-none placeholder:text-muted-foreground/70 leading-normal"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2 rounded-xl btn-primary-gradient text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0 active:scale-95"
                  title="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-[10px] text-center text-muted-foreground/75 font-mono">
                AI assistant • Answers strictly grounded in portfolio data
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative flex items-center gap-2.5 px-4 py-3 rounded-full border shadow-2xl transition-all duration-300 ${
          isOpen
            ? "bg-card border-primary/50 text-foreground shadow-[0_0_25px_var(--glow-primary)]"
            : "btn-primary-gradient text-primary-foreground shadow-[0_0_30px_var(--glow-primary)]"
        }`}
        aria-label="Toggle Aman AI Assistant"
      >
        <div className="relative">
          {isOpen ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <Bot className="w-5 h-5 text-current animate-pulse" />
          )}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-background" />
          )}
        </div>

        <span className="text-xs font-bold font-mono tracking-wide">
          {isOpen ? "Close Assistant" : "Ask Aman AI"}
        </span>
      </motion.button>
    </div>
  );
}

