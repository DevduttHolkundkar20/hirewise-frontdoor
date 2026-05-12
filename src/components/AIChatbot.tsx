import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User, Maximize2, Minimize2 } from "lucide-react";
import { toast } from "sonner";

type Role = "recruiter" | "candidate";
type Message = { id: number; from: "user" | "ai"; text: string };

const greetings: Record<Role, string> = {
  candidate: "Hi! I'm your AI career assistant. Ask me about interview prep, resume tips, coding hints, or career guidance.",
  recruiter: "Hi! I'm your AI hiring assistant. Ask me to surface top candidates, explain rankings, or summarize applicants.",
};

export function AIChatbot({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "ai", text: greetings[role] },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async () => {
    const text = input.trim();
    if (!text || typing) return;

    const userMsg: Message = { id: Date.now(), from: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      if (response.status === 401) {
        toast.error("Session expired. Please login again.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();
      const aiReply = data.response || "Sorry, I couldn't process that.";
      
      setMessages(prev => [...prev, { id: Date.now() + 1, from: "ai", text: aiReply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        from: "ai", 
        text: "I'm having trouble connecting to the server. Please try again later." 
      }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-ai text-ai-foreground shadow-ai-glow pulse-ai"
        aria-label="Open AI assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isFullScreen ? "calc(100vw - 3rem)" : "360px",
              height: isFullScreen ? "calc(100vh - 8rem)" : "520px",
              bottom: isFullScreen ? "6rem" : "6rem",
              right: "1.5rem"
            }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed z-40 flex flex-col overflow-hidden rounded-2xl glass-card shadow-card-hover border border-border/60 transition-all`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border/60 bg-gradient-ai px-4 py-3 text-ai-foreground">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold">HireWise AI</p>
                <p className="text-[11px] opacity-80">Always online · Powered by AI</p>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-ai-foreground/80 hover:text-ai-foreground"
                  title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                >
                  {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                <button 
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-ai-foreground/80 hover:text-ai-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-background/40 to-background/80 p-4">
              {messages.map(m => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.from === "ai" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-ai text-ai-foreground">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      m.from === "user"
                        ? "bg-gradient-primary text-primary-foreground rounded-br-sm"
                        : "bg-card text-foreground shadow-card rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.from === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-ai text-ai-foreground">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-card px-4 py-3 shadow-card">
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: "0s" }} />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: "0.15s" }} />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: "0.3s" }} />
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border/60 bg-card/80 p-3 backdrop-blur">
              <div className={`mx-auto flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/20 ${isFullScreen ? "max-w-4xl" : "w-full"}`}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && send()}
                  placeholder={role === "candidate" ? "Ask about interviews, resume, jobs..." : "Ask about candidates, rankings..."}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  disabled={typing}
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={send}
                  disabled={!input.trim() || typing}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

