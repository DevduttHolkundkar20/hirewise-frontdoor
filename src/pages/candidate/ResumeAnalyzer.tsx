import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle, AlertCircle, XCircle, Sparkles, FileText, Target, TrendingUp, Lightbulb } from "lucide-react";
import { CircularProgress } from "@/components/CircularProgress";
import { GradientProgress } from "@/components/GradientProgress";

const strengths = ["React & TypeScript", "Clean Code Architecture", "REST API Design", "Quantified Impact"];
const missingSkills = ["System Design", "Docker/Kubernetes", "GraphQL", "CI/CD Pipelines"];
const improvements = [
  "Add a 'Tech Stack' summary near the top for quick ATS scanning",
  "Quantify at least 2 more achievements (e.g. 'reduced latency by 30%')",
  "Include cloud certifications (AWS/GCP) if available",
  "Add links to live projects or GitHub with pinned repos",
  "Tailor the summary to the target role keywords",
];

const skillMatch = [
  { skill: "React", score: 92, level: "strong" },
  { skill: "TypeScript", score: 88, level: "strong" },
  { skill: "Node.js", score: 74, level: "medium" },
  { skill: "System Design", score: 42, level: "weak" },
  { skill: "SQL", score: 58, level: "medium" },
];

const levelColor = {
  strong: "success",
  medium: "warning",
  weak: "danger",
} as const;

const levelLabel = {
  strong: "Strong",
  medium: "Medium",
  weak: "Weak",
};

export default function ResumeAnalyzer() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
          <Sparkles className="h-6 w-6 text-ai" /> AI Resume Analyzer
        </h1>
        <p className="text-sm text-muted-foreground">Deep analysis, skill match & actionable improvements.</p>
      </div>

      {/* Upload */}
      <label className="group flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border glass-card p-10 text-muted-foreground transition-all hover:border-primary/60 hover:shadow-card-hover">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-hero-glow transition-transform group-hover:scale-110">
          <Upload className="h-6 w-6" />
        </div>
        <span className="font-medium text-foreground">{uploaded ? "sarah_chen_resume.pdf" : "Upload your resume for AI analysis"}</span>
        <span className="text-xs">PDF, DOCX supported · Max 5MB</span>
        <input type="file" className="hidden" onChange={() => setUploaded(true)} />
      </label>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Circular score */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-2xl gradient-border p-6 text-center"
        >
          <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <FileText className="h-3.5 w-3.5" /> Resume Score
          </p>
          <CircularProgress value={82} label="out of 100" gradient="primary" />
          <p className="mt-3 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Above Average</p>
        </motion.div>

        {/* Skill match */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 rounded-2xl border border-border glass-card p-6 shadow-card"
        >
          <div className="mb-4 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h3 className="font-display text-sm font-semibold text-foreground">Skill Match Analysis</h3>
            <span className="ml-auto font-display text-lg font-bold text-gradient-primary">78%</span>
          </div>
          <div className="space-y-3">
            {skillMatch.map((s, i) => (
              <motion.div
                key={s.skill}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
              >
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{s.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      s.level === "strong" ? "bg-success/10 text-success" :
                      s.level === "medium" ? "bg-warning/10 text-amber-600" :
                      "bg-destructive/10 text-destructive"
                    }`}>{levelLabel[s.level]}</span>
                    <span className="text-muted-foreground">{s.score}%</span>
                  </div>
                </div>
                <GradientProgress value={s.score} variant={levelColor[s.level]} height={6} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Strengths & Missing */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border glass-card p-6 shadow-card hover-lift">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10 text-success">
              <TrendingUp className="h-4 w-4" />
            </div>
            <h3 className="font-display text-sm font-semibold text-foreground">Strength Areas</h3>
          </div>
          <div className="space-y-2">
            {strengths.map(s => (
              <div key={s} className="flex items-center gap-2 rounded-lg bg-success/5 px-3 py-2">
                <CheckCircle className="h-4 w-4 shrink-0 text-success" />
                <span className="text-sm text-foreground">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border glass-card p-6 shadow-card hover-lift">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <XCircle className="h-4 w-4" />
            </div>
            <h3 className="font-display text-sm font-semibold text-foreground">Missing Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map(s => (
              <span key={s} className="rounded-full border border-destructive/30 bg-destructive/5 px-3 py-1 text-xs font-medium text-destructive">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Adding these could boost your match score by up to <span className="font-semibold text-foreground">14%</span>.</p>
        </div>
      </div>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl gradient-border p-6"
      >
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-ai/10 blur-3xl" />
        <div className="relative">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-ai text-ai-foreground shadow-ai-glow pulse-ai">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-foreground">AI Suggestions Panel</h3>
              <p className="text-xs text-muted-foreground">Actionable improvements, ranked by impact</p>
            </div>
          </div>
          <ol className="space-y-3">
            {improvements.map((imp, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-ai text-xs font-bold text-ai-foreground">{i + 1}</span>
                <span className="text-sm text-foreground">{imp}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>
    </div>
  );
}
