import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User } from "lucide-react";

type Role = "recruiter" | "candidate";
type Message = { id: number; from: "user" | "ai"; text: string };

const greetings: Record<Role, string> = {
  candidate: "Hi! I'm your AI career assistant. Ask me about interview prep, resume tips, coding hints, or career guidance.",
  recruiter: "Hi! I'm your AI hiring assistant. Ask me to surface top candidates, explain rankings, or summarize applicants.",
};

const candidateReplies = [
  "Here's a tip: for system design interviews, focus on trade-offs between consistency and availability. Want me to generate 3 practice questions?",
  "Based on your profile, I recommend practicing **SQL joins** and **dynamic programming** this week — these show up often in mid-level interviews.",
  "Great resume structure! Consider quantifying your impact (e.g. 'reduced latency by 30%') and adding a short 'Tech Stack' line near the top.",
  "For behavioral questions, use the **STAR** method: Situation, Task, Action, Result. Keep stories under 2 minutes.",
  "Career tip: roles tagged 'AI/ML' have grown 43% this quarter. Your React + Python combo is a strong match — want personalized job picks?",
];

const recruiterReplies = [
  "Top backend candidates right now: **Sarah Chen** (92% match), **James Wilson** (87%), **Priya Sharma** (85%). All have 85%+ coding accuracy.",
  "Sarah Chen ranks high because of: strong React/TS fundamentals, 156 problems solved, 94% accuracy, and a technical interview score of 88.",
  "Hiring insight: your pipeline is 62% intermediate, 28% advanced. Consider posting a senior-focused role to balance levels.",
  "Summary of James Wilson: ML specialist, 3 yrs at Meta, built a recommendation engine. Strong fit for Data Scientist roles — recommend technical round.",
  "I suggest shortlisting candidates with match ≥ 85% and coding ≥ 85%. That filter returns **3** candidates today.",
];

export function AIChatbot({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "ai", text: greetings[role] },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now(), from: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    const pool = role === "candidate" ? candidateReplies : recruiterReplies;
    const reply = pool[Math.floor(Math.random() * pool.length)];
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, from: "ai", text: reply }]);
    }, 1100 + Math.random() * 600);
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
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            className="fixed bottom-24 right-6 z-40 flex h-[520px] w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl glass-card shadow-card-hover"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border/60 bg-gradient-ai px-4 py-3 text-ai-foreground">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold">HireSphere AI</p>
                <p className="text-[11px] opacity-80">Always online · Powered by AI</p>
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
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/20">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && send()}
                  placeholder={role === "candidate" ? "Ask about interviews, resume, jobs..." : "Ask about candidates, rankings..."}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={send}
                  disabled={!input.trim()}
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
