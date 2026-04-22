import { motion } from "framer-motion";

interface CircularProgressProps {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  gradient?: "primary" | "ai" | "accent";
}

export function CircularProgress({ value, size = 140, stroke = 12, label, gradient = "primary" }: CircularProgressProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const gradId = `grad-${gradient}`;
  const stops: Record<string, [string, string]> = {
    primary: ["hsl(235 80% 58%)", "hsl(265 75% 62%)"],
    ai: ["hsl(185 90% 48%)", "hsl(235 80% 58%)"],
    accent: ["hsl(265 75% 62%)", "hsl(245 85% 68%)"],
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stops[gradient][0]} />
            <stop offset="100%" stopColor={stops[gradient][1]} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className="stroke-secondary"
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          stroke={`url(#${gradId})`}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="font-display text-3xl font-bold text-gradient-primary"
        >
          {value}
        </motion.span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  );
}
