import { FileCheck, Target, Code, TrendingUp } from "lucide-react";

const stats = [
  { label: "Resume Match", value: "82%", icon: FileCheck, color: "bg-primary/10 text-primary" },
  { label: "Readiness Score", value: "76%", icon: Target, color: "bg-accent/10 text-accent" },
  { label: "Questions Solved", value: "124", icon: Code, color: "bg-emerald-100 text-emerald-600" },
  { label: "Coding Accuracy", value: "88%", icon: TrendingUp, color: "bg-amber-100 text-amber-600" },
];

const recommendedJobs = [
  { title: "Senior React Developer", company: "Acme Tech", match: 92 },
  { title: "Full Stack Engineer", company: "InnovateCo", match: 85 },
  { title: "Frontend Lead", company: "StartupXYZ", match: 80 },
];

const weakSkills = ["System Design", "SQL Optimization", "Behavioral Questions"];

const recentActivity = [
  "Solved 3 React coding problems",
  "Completed mock behavioral interview",
  "Updated resume skills section",
];

export default function CandidateDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Recommended Jobs</h3>
          <div className="space-y-3">
            {recommendedJobs.map(j => (
              <div key={j.title} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
                <div><p className="text-sm font-medium text-foreground">{j.title}</p><p className="text-xs text-muted-foreground">{j.company}</p></div>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">{j.match}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Areas to Improve</h3>
          <div className="space-y-2">
            {weakSkills.map(s => (
              <div key={s} className="flex items-center gap-2 rounded-lg bg-destructive/5 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-destructive" />
                <span className="text-sm text-foreground">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
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
