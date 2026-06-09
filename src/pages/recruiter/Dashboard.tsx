import { Briefcase, Users, TrendingUp, Star, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/lib/api-config";

const stats_initial = [
  { label: "Active Jobs", value: "0", icon: Briefcase, color: "bg-primary/10 text-primary" },
  { label: "Total Applicants", value: "0", icon: Users, color: "bg-accent/10 text-accent" },
  { label: "Avg Match Score", value: "0%", icon: TrendingUp, color: "bg-emerald-100 text-emerald-600" },
  { label: "Shortlisted", value: "0", icon: Star, color: "bg-amber-100 text-amber-600" },
];

const skillData = [
  { name: "React", value: 45 }, { name: "Python", value: 38 }, { name: "Node.js", value: 32 },
  { name: "Java", value: 28 }, { name: "AWS", value: 22 }, { name: "ML", value: 18 },
];

const monthlyData = [
  { month: "Jan", applicants: 32 }, { month: "Feb", applicants: 45 }, { month: "Mar", applicants: 58 },
  { month: "Apr", applicants: 42 }, { month: "May", applicants: 67 }, { month: "Jun", applicants: 54 },
];

const pieData = [
  { name: "Excellent", value: 30 }, { name: "Good", value: 45 }, { name: "Average", value: 20 }, { name: "Poor", value: 5 },
];
const COLORS = ["hsl(230,75%,57%)", "hsl(250,60%,62%)", "hsl(225,18%,60%)", "hsl(0,72%,51%)"];

interface Job {
  id: number;
  title: string;
  applicants?: number;
  postedAt?: string;
  posted?: string;
}

interface Candidate {
  id: number;
  name: string;
  role: string;
  match: number;
}

export default function RecruiterDashboard() {
  const { data: jobs = [], isLoading: jobsLoading } = useQuery<Job[]>({
    queryKey: ["recruiter-jobs"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch jobs");
      return response.json();
    },
  });

  const { data: candidates = [], isLoading: candidatesLoading } = useQuery<Candidate[]>({
    queryKey: ["recruiter-candidates"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/get_applicants`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch applicants");
      const data = await response.json();
      return data.slice(0, 3);
    },
  });

  const stats = [
    { label: "Active Jobs", value: String(jobs.length), icon: Briefcase, color: "bg-primary/10 text-primary" },
    { label: "Total Applicants", value: "348", icon: Users, color: "bg-accent/10 text-accent" },
    { label: "Avg Match Score", value: "78%", icon: TrendingUp, color: "bg-emerald-100 text-emerald-600" },
    { label: "Shortlisted", value: "56", icon: Star, color: "bg-amber-100 text-amber-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">AI-powered hiring insights at a glance.</p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-ai/30 bg-ai/5 px-3 py-1.5 text-xs font-medium text-ai sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-ai animate-pulse" />
          AI insights active
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className="rounded-xl border border-border glass-card p-5 shadow-card hover-lift">
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Hiring Insights */}
      <div className="relative overflow-hidden rounded-2xl gradient-border p-6">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-ai/10 blur-3xl" />
        <div className="relative grid gap-4 sm:grid-cols-3">
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ai">
              <Star className="h-3.5 w-3.5" /> Top Skill in Demand
            </p>
            <p className="font-display text-lg font-bold text-foreground">React + TypeScript</p>
            <p className="text-xs text-muted-foreground">45 active candidates</p>
          </div>
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ai">
              <TrendingUp className="h-3.5 w-3.5" /> Availability Trend
            </p>
            <p className="font-display text-lg font-bold text-foreground">+24% this month</p>
            <p className="text-xs text-muted-foreground">Advanced candidates rising</p>
          </div>
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ai">
              <Users className="h-3.5 w-3.5" /> Avg Hiring Score
            </p>
            <p className="font-display text-lg font-bold text-foreground">78 / 100</p>
            <p className="text-xs text-muted-foreground">Above industry baseline</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border glass-card p-5 shadow-card hover-lift">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Skill Demand Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={skillData}><XAxis dataKey="name" fontSize={12} stroke="hsl(var(--muted-foreground))" /><YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" /><Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} /><Bar dataKey="value" fill="url(#barGrad)" radius={[6,6,0,0]} />
              <defs><linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(235 80% 58%)" /><stop offset="100%" stopColor="hsl(265 75% 62%)" /></linearGradient></defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-border glass-card p-5 shadow-card hover-lift">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Monthly Applicant Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}><XAxis dataKey="month" fontSize={12} stroke="hsl(var(--muted-foreground))" /><YAxis fontSize={12} stroke="hsl(var(--muted-foreground))" /><Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} /><Line type="monotone" dataKey="applicants" stroke="hsl(265 75% 62%)" strokeWidth={3} dot={{ r: 5, fill: "hsl(235 80% 58%)" }} /></LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border glass-card p-5 shadow-card hover-lift">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Applicant Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" label={({ name }) => name}>
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie><Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }} /></PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border glass-card p-5 shadow-card hover-lift">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Recent Candidates</h3>
          <div className="space-y-3">
            {candidatesLoading ? (
              <div className="flex justify-center py-4"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
            ) : candidates.length > 0 ? (
              candidates.map(c => (
                <div key={c.id} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 transition-colors hover:bg-secondary">
                  <div><p className="text-sm font-medium text-foreground">{c.name}</p><p className="text-xs text-muted-foreground">{c.role}</p></div>
                  <span className="rounded-full bg-gradient-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">{c.match}%</span>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-xs text-muted-foreground">No recent candidates.</div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border glass-card p-5 shadow-card hover-lift">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Recent Jobs</h3>
          <div className="space-y-3">
            {jobsLoading ? (
              <div className="flex justify-center py-4"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
            ) : jobs.length > 0 ? (
              jobs.map(j => (
                <div key={j.id} className="rounded-lg bg-secondary/50 px-3 py-2">
                  <p className="text-sm font-medium text-foreground">{j.title}</p>
                  <p className="text-xs text-muted-foreground">{j.applicants || 0} applicants · {j.posted || (j.postedAt ? new Date(j.postedAt).toLocaleDateString() : "Recently")}</p>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-xs text-muted-foreground">No recent jobs found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
