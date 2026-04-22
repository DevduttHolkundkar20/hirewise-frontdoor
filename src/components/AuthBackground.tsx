import { motion } from "framer-motion";
import { Sparkles, Brain, Code2, Target, Zap, Trophy } from "lucide-react";

const floatingIcons = [
  { Icon: Brain, x: "8%", y: "18%", delay: 0, size: 28 },
  { Icon: Code2, x: "88%", y: "22%", delay: 0.6, size: 24 },
  { Icon: Target, x: "12%", y: "78%", delay: 1.2, size: 26 },
  { Icon: Zap, x: "85%", y: "72%", delay: 0.9, size: 22 },
  { Icon: Trophy, x: "6%", y: "46%", delay: 0.3, size: 20 },
  { Icon: Sparkles, x: "92%", y: "48%", delay: 1.5, size: 24 },
];

export function AuthBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dotted grid */}
      <div className="absolute inset-0 bg-dotted opacity-40" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-ai/25 to-primary/20 blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.6, 0.4, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
        animate={{ x: ["-50%", "-45%", "-55%", "-50%"], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Diagonal gradient streak */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, hsl(var(--primary) / 0.08) 50%, transparent 70%)",
        }}
      />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center justify-center rounded-2xl border border-border/60 glass shadow-card"
          style={{ left: x, top: y, width: size + 24, height: size + 24 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 1, 1],
            y: [20, 0, -8, 0],
          }}
          transition={{
            opacity: { duration: 1, delay },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
          }}
        >
          <Icon className="text-primary" style={{ width: size * 0.6, height: size * 0.6 }} />
        </motion.div>
      ))}

      {/* Tiny stars */}
      {[...Array(18)].map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        return (
          <motion.span
            key={`s-${i}`}
            className="absolute h-1 w-1 rounded-full bg-ai"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{
              duration: 2 + (i % 4),
              repeat: Infinity,
              delay: (i % 7) * 0.3,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
