import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

const techData = [
  { month: "Jan", score: 62 }, { month: "Feb", score: 68 }, { month: "Mar", score: 72 },
  { month: "Apr", score: 75 }, { month: "May", score: 80 }, { month: "Jun", score: 85 },
];

const codingData = [
  { month: "Jan", accuracy: 70 }, { month: "Feb", accuracy: 74 }, { month: "Mar", accuracy: 78 },
  { month: "Apr", accuracy: 82 }, { month: "May", accuracy: 85 }, { month: "Jun", accuracy: 88 },
];

const behavioralData = [
  { month: "Jan", score: 55 }, { month: "Feb", score: 60 }, { month: "Mar", score: 65 },
  { month: "Apr", score: 70 }, { month: "May", score: 74 }, { month: "Jun", score: 79 },
];

const radarData = [
  { subject: "Algorithms", A: 85 }, { subject: "System Design", A: 65 }, { subject: "Databases", A: 78 },
  { subject: "Frontend", A: 92 }, { subject: "Backend", A: 70 }, { subject: "Behavioral", A: 79 },
];

export default function Performance() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Performance</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <Chart title="Technical Score Trend" data={techData} dataKey="score" color="hsl(230,75%,57%)" />
        <Chart title="Coding Accuracy Trend" data={codingData} dataKey="accuracy" color="hsl(250,60%,62%)" />
        <Chart title="Behavioral Score Trend" data={behavioralData} dataKey="score" color="hsl(160,60%,45%)" />

        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="mb-4 font-display text-sm font-semibold text-foreground">Strengths vs Weaknesses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" fontSize={11} />
              <Radar dataKey="A" stroke="hsl(230,75%,57%)" fill="hsl(230,75%,57%)" fillOpacity={0.2} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Chart({ title, data, dataKey, color }: { title: string; data: any[]; dataKey: string; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <h3 className="mb-4 font-display text-sm font-semibold text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}><XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} /><Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
