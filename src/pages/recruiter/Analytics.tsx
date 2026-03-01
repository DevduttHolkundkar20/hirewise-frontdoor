import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const hireData = [
  { month: "Jan", hires: 4 }, { month: "Feb", hires: 6 }, { month: "Mar", hires: 3 },
  { month: "Apr", hires: 8 }, { month: "May", hires: 5 }, { month: "Jun", hires: 7 },
];

const sourceData = [
  { source: "LinkedIn", count: 120 }, { source: "Referral", count: 85 }, { source: "Direct", count: 65 },
  { source: "Job Board", count: 45 }, { source: "Campus", count: 33 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Analytics</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Monthly Hires</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={hireData}><XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
              <Area type="monotone" dataKey="hires" stroke="hsl(230,75%,57%)" fill="hsl(230,75%,57%)" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Applicant Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sourceData} layout="vertical"><XAxis type="number" fontSize={12} /><YAxis dataKey="source" type="category" fontSize={12} width={70} /><Tooltip />
              <Bar dataKey="count" fill="hsl(250,60%,62%)" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
