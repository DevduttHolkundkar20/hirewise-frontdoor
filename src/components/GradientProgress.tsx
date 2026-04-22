import { motion } from "framer-motion";

interface GradientProgressProps {
  value: number;
  variant?: "primary" | "ai" | "success" | "warning" | "danger";
  height?: number;
  showLabel?: boolean;
}

export function GradientProgress({ value, variant = "primary", height = 8, showLabel = false }: GradientProgressProps) {
  const variants: Record<string, string> = {
    primary: "bg-gradient-to-r from-primary to-accent",
    ai: "bg-gradient-to-r from-ai to-primary",
    success: "bg-gradient-to-r from-emerald-400 to-emerald-600",
    warning: "bg-gradient-to-r from-amber-400 to-orange-500",
    danger: "bg-gradient-to-r from-rose-400 to-rose-600",
  };

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded-full bg-secondary" style={{ height }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className={`h-full rounded-full ${variants[variant]}`}
        />
      </div>
      {showLabel && <span className="mt-1 block text-xs text-muted-foreground">{value}%</span>}
    </div>
  );
}
