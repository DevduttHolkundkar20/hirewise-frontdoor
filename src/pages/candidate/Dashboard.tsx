import { FileCheck, Target, Code, TrendingUp, Sparkles, Flame, Trophy, Award, BookOpen, Newspaper, Zap, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { GradientProgress } from "@/components/GradientProgress";

const stats = [
  { label: "Resume Match", value: 82, suffix: "%", icon: FileCheck, gradient: "from-primary to-accent" },
  { label: "Readiness Score", value: 76, suffix: "%", icon: Target, gradient: "from-accent to-primary-glow" },
  { label: "Questions Solved", value: 124, suffix: "", icon: Code, gradient: "from-emerald-400 to-emerald-600" },
  { label: "Coding Accuracy", value: 88, suffix: "%", icon: TrendingUp, gradient: "from-ai to-primary" },
];

const recommendedJobs = [
  { title: "Senior React Developer", company: "Acme Tech", match: 92 },
  { title: "Full Stack Engineer", company: "InnovateCo", match: 85 },
  { title: "Frontend Lead", company: "StartupXYZ", match: 80 },
];

const weakSkills = [
  { name: "System Design", level: 45 },
  { name: "SQL Optimization", level: 52 },
  { name: "Behavioral Questions", level: 60 },
];

const recentActivity = [
  "Solved 3 React coding problems",
  "Completed mock behavioral interview",
  "Updated resume skills section",
];

const badges = [
  { name: "Top Performer", icon: Trophy, color: "from-amber-400 to-orange-500" },
  { name: "Problem Solver", icon: Zap, color: "from-primary to-accent" },
  { name: "Interview Ready", icon: Award, color: "from-ai to-primary" },
];

const aiInsights = [
  { type: "Trending Skill", title: "AI/ML Engineering", desc: "Demand up 43% this quarter", icon: Flame, tag: "Hot" },
  { type: "Industry Update", title: "Remote roles increased 18%", desc: "Across tech hubs in Q2 2026", icon: Newspaper, tag: "News" },
  { type: "Learning Path", title: "Master System Design", desc: "6-week roadmap curated for you", icon: BookOpen, tag: "Path" },
  { type: "For You", title: "Practice SQL joins today", desc: "Based on your weakest area", icon: Sparkles, tag: "AI" },
];

export default function CandidateDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Welcome back 👋</h1>
          <p className="text-sm text-muted-foreground">Here's your AI-powered career snapshot.</p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-ai/30 bg-ai/5 px-3 py-1.5 text-xs font-medium text-ai sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-ai animate-pulse" />
          Profile 82% complete
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group rounded-xl border border-border glass-card p-5 shadow-card hover-lift"
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient} text-white shadow-md`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="font-display text-2xl font-bold text-foreground">
                  {s.value}{s.suffix}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Career Insights */}
      <div className="relative overflow-hidden rounded-2xl gradient-border p-6">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-ai/10 blur-3xl" />
        <div className="relative">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-ai text-ai-foreground shadow-ai-glow">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-foreground">AI Career Insights</h2>
              <p className="text-xs text-muted-foreground">Trends, updates & personalized picks</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {aiInsights.map((insight, i) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="group cursor-pointer rounded-xl border border-border bg-card p-4 transition-all hover:border-ai/50 hover:shadow-card-hover"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ai/10 text-ai">
                    <insight.icon className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-ai/10 px-2 py-0.5 text-[10px] font-semibold text-ai">{insight.tag}</span>
                </div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{insight.type}</p>
                <p className="mt-1 font-display text-sm font-semibold text-foreground">{insight.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{insight.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowUpRight className="h-3 w-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="rounded-xl border border-border glass-card p-5 shadow-card">
        <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-foreground">
          <Trophy className="h-4 w-4 text-amber-500" /> Your Badges
        </h3>
        <div className="flex flex-wrap gap-3">
          {badges.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5"
            >
              <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${b.color} text-white`}>
                <b.icon className="h-3 w-3" />
              </div>
              <span className="text-xs font-medium text-foreground">{b.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border glass-card p-5 shadow-card hover-lift">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Recommended Jobs</h3>
          <div className="space-y-3">
            {recommendedJobs.map(j => (
              <div key={j.title} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 transition-colors hover:bg-secondary">
                <div><p className="text-sm font-medium text-foreground">{j.title}</p><p className="text-xs text-muted-foreground">{j.company}</p></div>
                <span className="rounded-full bg-gradient-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">{j.match}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border glass-card p-5 shadow-card hover-lift">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Skill Mastery</h3>
          <div className="space-y-4">
            {weakSkills.map(s => (
              <div key={s.name}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{s.name}</span>
                  <span className="text-muted-foreground">{s.level}%</span>
                </div>
                <GradientProgress value={s.level} variant={s.level < 50 ? "danger" : s.level < 70 ? "warning" : "success"} height={6} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border glass-card p-5 shadow-card hover-lift">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Recent Activity</h3>
          <div className="space-y-2">
            {recentActivity.map((a, i) => (
              <div key={i} className="rounded-lg bg-secondary/50 px-3 py-2 text-sm text-foreground">{a}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
