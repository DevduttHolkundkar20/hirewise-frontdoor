const rankings = [
  { rank: 1, name: "Sarah Chen", score: 92, skills: ["React", "TS"], trend: "↑" },
  { rank: 2, name: "James Wilson", score: 87, skills: ["Python", "ML"], trend: "↑" },
  { rank: 3, name: "Priya Sharma", score: 85, skills: ["Java", "AWS"], trend: "→" },
  { rank: 4, name: "Alex Kim", score: 78, skills: ["Go", "K8s"], trend: "↓" },
  { rank: 5, name: "Maria Lopez", score: 73, skills: ["JS", "React"], trend: "↑" },
];

export default function AIRankings() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">AI Rankings</h1>
      <p className="text-sm text-muted-foreground">Candidates ranked by AI-powered composite scoring across technical skills, coding accuracy, and interview performance.</p>

      <div className="space-y-3">
        {rankings.map(r => (
          <div key={r.rank} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card transition-shadow hover:shadow-card-hover">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-lg font-bold ${r.rank <= 3 ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
              {r.rank}
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{r.name}</p>
              <div className="flex gap-1.5 mt-1">
                {r.skills.map(s => <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{s}</span>)}
              </div>
            </div>
            <span className="text-lg mr-2">{r.trend}</span>
            <div className="text-right">
              <p className="font-display text-xl font-bold text-primary">{r.score}</p>
              <p className="text-xs text-muted-foreground">AI Score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
