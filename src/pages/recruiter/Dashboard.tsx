import { Briefcase, Users, TrendingUp, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const stats = [
  { label: "Active Jobs", value: "12", icon: Briefcase, color: "bg-primary/10 text-primary" },
  { label: "Total Applicants", value: "348", icon: Users, color: "bg-accent/10 text-accent" },
  { label: "Avg Match Score", value: "78%", icon: TrendingUp, color: "bg-emerald-100 text-emerald-600" },
  { label: "Shortlisted", value: "56", icon: Star, color: "bg-amber-100 text-amber-600" },
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

const recentCandidates = [
  { name: "Sarah Chen", role: "Frontend Dev", match: 92 },
  { name: "James Wilson", role: "Data Scientist", match: 87 },
  { name: "Priya Sharma", role: "Backend Dev", match: 85 },
];

const recentJobs = [
  { title: "Senior React Developer", applicants: 23, posted: "2 days ago" },
  { title: "ML Engineer", applicants: 18, posted: "5 days ago" },
  { title: "DevOps Lead", applicants: 12, posted: "1 week ago" },
];

export default function RecruiterDashboard() {
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

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Skill Demand Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={skillData}><XAxis dataKey="name" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Bar dataKey="value" fill="hsl(230,75%,57%)" radius={[4,4,0,0]} /></BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Monthly Applicant Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}><XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Line type="monotone" dataKey="applicants" stroke="hsl(250,60%,62%)" strokeWidth={2} dot={{ r: 4 }} /></LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Applicant Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" label={({ name }) => name}>
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Recent Candidates</h3>
          <div className="space-y-3">
            {recentCandidates.map(c => (
              <div key={c.name} className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2">
                <div><p className="text-sm font-medium text-foreground">{c.name}</p><p className="text-xs text-muted-foreground">{c.role}</p></div>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">{c.match}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Recent Jobs</h3>
          <div className="space-y-3">
            {recentJobs.map(j => (
              <div key={j.title} className="rounded-lg bg-secondary/50 px-3 py-2">
                <p className="text-sm font-medium text-foreground">{j.title}</p>
                <p className="text-xs text-muted-foreground">{j.applicants} applicants · {j.posted}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
