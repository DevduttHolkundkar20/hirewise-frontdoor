import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Download, Star, Brain, Filter, Sparkles, X, CheckCircle, Users, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GradientProgress } from "@/components/GradientProgress";

type Applicant = {
  id: number; name: string; match: number; level: string; solved: number; accuracy: number;
  interview: number; skills: string[]; email: string; experience: string; projects: string;
  behavioral: number; overall: number; rank: string; tags: string[];
};

const applicants: Applicant[] = [
  { id: 1, name: "Sarah Chen", match: 92, level: "Advanced", solved: 156, accuracy: 94, interview: 88, skills: ["React", "TypeScript", "Node.js"], email: "sarah@email.com", experience: "4 years at Google", projects: "E-commerce platform, Real-time chat app", behavioral: 85, overall: 90, rank: "Top 1%", tags: ["Strong Frontend", "High Coding Score", "Interview Ready"] },
  { id: 2, name: "James Wilson", match: 87, level: "Advanced", solved: 132, accuracy: 89, interview: 82, skills: ["Python", "ML", "TensorFlow"], email: "james@email.com", experience: "3 years at Meta", projects: "Recommendation engine, NLP pipeline", behavioral: 80, overall: 84, rank: "Top 5%", tags: ["Strong ML", "AI Expert"] },
  { id: 3, name: "Priya Sharma", match: 85, level: "Intermediate", solved: 98, accuracy: 86, interview: 79, skills: ["Java", "Spring", "AWS"], email: "priya@email.com", experience: "2 years at Amazon", projects: "Microservices platform, CI/CD pipeline", behavioral: 88, overall: 83, rank: "Top 5%", tags: ["Strong Backend", "Cloud Native"] },
  { id: 4, name: "Alex Kim", match: 78, level: "Intermediate", solved: 87, accuracy: 82, interview: 75, skills: ["Go", "Kubernetes", "Docker"], email: "alex@email.com", experience: "2 years startup", projects: "Container orchestration tool", behavioral: 76, overall: 77, rank: "Top 10%", tags: ["DevOps", "Infra"] },
  { id: 5, name: "Maria Lopez", match: 72, level: "Beginner", solved: 45, accuracy: 76, interview: 68, skills: ["JavaScript", "React", "CSS"], email: "maria@email.com", experience: "1 year intern", projects: "Portfolio site, Todo app", behavioral: 82, overall: 73, rank: "Top 20%", tags: ["Frontend", "Rising Star"] },
];

const rankStyle = (rank: string) => {
  if (rank.includes("1%")) return "bg-gradient-to-r from-amber-400 to-orange-500 text-white";
  if (rank.includes("5%")) return "bg-gradient-ai text-ai-foreground";
  if (rank.includes("10%")) return "bg-gradient-primary text-primary-foreground";
  return "bg-secondary text-foreground";
};

export default function Applicants() {
  const [selected, setSelected] = useState<Applicant | null>(null);
  const [shortlisted, setShortlisted] = useState<number[]>([]);
  const [compare, setCompare] = useState<number[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [aiMode, setAiMode] = useState(false);

  const [filters, setFilters] = useState({ minMatch: 0, minCoding: 0, minInterview: 0, skill: "" });

  const toggleShortlist = (id: number) => setShortlisted(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleCompare = (id: number) => setCompare(p => p.includes(id) ? p.filter(x => x !== id) : p.length < 3 ? [...p, id] : p);

  const filtered = useMemo(() => {
    let list = applicants.filter(a =>
      a.match >= filters.minMatch &&
      a.accuracy >= filters.minCoding &&
      a.interview >= filters.minInterview &&
      (filters.skill === "" || a.skills.some(s => s.toLowerCase().includes(filters.skill.toLowerCase())))
    );
    if (aiMode) list = [...list].sort((a, b) => b.overall - a.overall).slice(0, 3);
    return list;
  }, [filters, aiMode]);

  const compareList = applicants.filter(a => compare.includes(a.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-foreground">Applicants</h1>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setShowFilter(v => !v)} className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            <Filter className="h-4 w-4" /> Filters
          </button>
          {compare.length >= 2 && (
            <button onClick={() => setShowCompare(true)} className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              <Users className="h-4 w-4" /> Compare ({compare.length})
            </button>
          )}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setAiMode(v => !v)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
              aiMode ? "bg-gradient-ai text-ai-foreground shadow-ai-glow" : "btn-gradient text-primary-foreground shadow-hero-glow"
            }`}
          >
            <Sparkles className="h-4 w-4" /> {aiMode ? "Showing AI Picks" : "Recommend Best"}
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid gap-3 rounded-xl border border-border glass-card p-4 sm:grid-cols-4">
              <FilterInput label="Skill" type="text" value={filters.skill} onChange={v => setFilters(f => ({ ...f, skill: v }))} placeholder="React, Python..." />
              <FilterInput label="Min Match %" type="number" value={String(filters.minMatch)} onChange={v => setFilters(f => ({ ...f, minMatch: +v || 0 }))} />
              <FilterInput label="Min Coding %" type="number" value={String(filters.minCoding)} onChange={v => setFilters(f => ({ ...f, minCoding: +v || 0 }))} />
              <FilterInput label="Min Interview" type="number" value={String(filters.minInterview)} onChange={v => setFilters(f => ({ ...f, minInterview: +v || 0 }))} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {aiMode && (
        <div className="flex items-center gap-2 rounded-xl border border-ai/30 bg-ai/5 p-3 text-sm">
          <Zap className="h-4 w-4 text-ai" />
          <span className="text-foreground">AI has ranked your top <span className="font-semibold">{filtered.length}</span> candidates based on overall hiring score.</span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border glass-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Candidate</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">AI Rank</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Match</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Level</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Solved</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Accuracy</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Interview</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{a.name}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {a.tags.slice(0, 2).map(t => (
                        <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${rankStyle(a.rank)}`}>
                      <Brain className="h-3 w-3" /> {a.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3"><span className="rounded-full bg-gradient-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">{a.match}%</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{a.level}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.solved}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.accuracy}%</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.interview}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <IconBtn onClick={() => setSelected(a)} title="View"><Eye className="h-4 w-4" /></IconBtn>
                      <IconBtn title="Download resume"><Download className="h-4 w-4" /></IconBtn>
                      <button
                        onClick={() => toggleShortlist(a.id)}
                        title="Shortlist"
                        className={`rounded-lg border p-1.5 transition-colors ${shortlisted.includes(a.id) ? "border-amber-300 bg-amber-50 text-amber-500" : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                      >
                        <Star className="h-4 w-4" fill={shortlisted.includes(a.id) ? "currentColor" : "none"} />
                      </button>
                      <button
                        onClick={() => toggleCompare(a.id)}
                        title="Compare"
                        className={`rounded-lg border p-1.5 transition-colors ${compare.includes(a.id) ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
                      >
                        <Users className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-sm text-muted-foreground">No applicants match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl glass-card">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-display">
                  {selected.name}
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${rankStyle(selected.rank)}`}>{selected.rank}</span>
                </DialogTitle>
              </DialogHeader>

              {/* AI Insight */}
              <div className="relative overflow-hidden rounded-xl gradient-border p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-ai text-ai-foreground shadow-ai-glow pulse-ai">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ai">AI Insight</p>
                    <p className="mt-1 text-sm text-foreground">
                      This candidate shows <span className="font-semibold">strong expertise</span> in {selected.skills[0]} and {selected.skills[1]}, with high coding accuracy ({selected.accuracy}%). Recommended for the <span className="font-semibold">technical round</span>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <Stat label="Email" value={selected.email} />
                  <Stat label="Experience" value={selected.experience} />
                  <Stat label="Match Score" value={`${selected.match}%`} />
                  <Stat label="Coding Accuracy" value={`${selected.accuracy}%`} />
                  <Stat label="Questions Solved" value={String(selected.solved)} />
                  <Stat label="Technical Score" value={String(selected.interview)} />
                  <Stat label="Behavioral Score" value={String(selected.behavioral)} />
                  <Stat label="AI Hiring Score" value={String(selected.overall)} />
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-muted-foreground">Smart Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.tags.map(t => <span key={t} className="rounded-full bg-ai/10 px-2.5 py-0.5 text-xs font-medium text-ai">{t}</span>)}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-muted-foreground">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.skills.map(s => <span key={s} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{s}</span>)}
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-muted-foreground">Projects</p>
                  <p className="text-foreground">{selected.projects}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 rounded-lg bg-gradient-primary py-2 text-xs font-semibold text-primary-foreground transition-shadow hover:shadow-hero-glow">
                    <CheckCircle className="mr-1 inline h-3.5 w-3.5" /> Mark for Interview
                  </button>
                  <button onClick={() => toggleShortlist(selected.id)} className="flex-1 rounded-lg border border-amber-300 bg-amber-50 py-2 text-xs font-semibold text-amber-600 transition-colors hover:bg-amber-100">
                    <Star className="mr-1 inline h-3.5 w-3.5" /> {shortlisted.includes(selected.id) ? "Shortlisted" : "Shortlist"}
                  </button>
                  <button className="flex-1 rounded-lg border border-destructive/30 bg-destructive/5 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10">
                    <X className="mr-1 inline h-3.5 w-3.5" /> Reject
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Compare dialog */}
      <Dialog open={showCompare} onOpenChange={setShowCompare}>
        <DialogContent className="max-w-4xl glass-card">
          <DialogHeader><DialogTitle className="font-display">Candidate Comparison</DialogTitle></DialogHeader>
          <div className={`grid gap-4 ${compareList.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {compareList.map(c => (
              <div key={c.id} className="rounded-xl border border-border bg-card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-display text-sm font-bold text-foreground">{c.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${rankStyle(c.rank)}`}>{c.rank}</span>
                </div>
                <CompareRow label="Match" value={c.match} />
                <CompareRow label="Coding" value={c.accuracy} />
                <CompareRow label="Interview" value={c.interview} />
                <CompareRow label="Behavioral" value={c.behavioral} />
                <CompareRow label="Overall" value={c.overall} highlight />
                <p className="mt-3 mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {c.skills.map(s => <span key={s} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const IconBtn = ({ children, onClick, title }: { children: React.ReactNode; onClick?: () => void; title?: string }) => (
  <button onClick={onClick} title={title} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
    {children}
  </button>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg bg-secondary/50 px-3 py-2">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="font-medium text-foreground">{value}</p>
  </div>
);

const FilterInput = ({ label, type, value, onChange, placeholder }: { label: string; type: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div>
    <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20" />
  </div>
);

const CompareRow = ({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) => (
  <div className="mb-2">
    <div className="mb-1 flex items-center justify-between text-xs">
      <span className={`${highlight ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{label}</span>
      <span className={`font-medium ${highlight ? "text-primary" : "text-foreground"}`}>{value}{label === "Match" || label === "Coding" ? "%" : ""}</span>
    </div>
    <GradientProgress value={value} variant={highlight ? "ai" : "primary"} height={5} />
  </div>
);
