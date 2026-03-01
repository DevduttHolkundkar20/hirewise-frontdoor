import { useState } from "react";
import { Eye, Download, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const applicants = [
  { id: 1, name: "Sarah Chen", match: 92, level: "Advanced", solved: 156, accuracy: 94, interview: 88, skills: ["React", "TypeScript", "Node.js"], email: "sarah@email.com", experience: "4 years at Google", projects: "E-commerce platform, Real-time chat app", behavioral: 85, overall: 90, resume: true },
  { id: 2, name: "James Wilson", match: 87, level: "Advanced", solved: 132, accuracy: 89, interview: 82, skills: ["Python", "ML", "TensorFlow"], email: "james@email.com", experience: "3 years at Meta", projects: "Recommendation engine, NLP pipeline", behavioral: 80, overall: 84, resume: true },
  { id: 3, name: "Priya Sharma", match: 85, level: "Intermediate", solved: 98, accuracy: 86, interview: 79, skills: ["Java", "Spring", "AWS"], email: "priya@email.com", experience: "2 years at Amazon", projects: "Microservices platform, CI/CD pipeline", behavioral: 88, overall: 83, resume: true },
  { id: 4, name: "Alex Kim", match: 78, level: "Intermediate", solved: 87, accuracy: 82, interview: 75, skills: ["Go", "Kubernetes", "Docker"], email: "alex@email.com", experience: "2 years startup", projects: "Container orchestration tool", behavioral: 76, overall: 77, resume: true },
  { id: 5, name: "Maria Lopez", match: 72, level: "Beginner", solved: 45, accuracy: 76, interview: 68, skills: ["JavaScript", "React", "CSS"], email: "maria@email.com", experience: "1 year intern", projects: "Portfolio site, Todo app", behavioral: 82, overall: 73, resume: true },
];

export default function Applicants() {
  const [selected, setSelected] = useState<typeof applicants[0] | null>(null);
  const [shortlisted, setShortlisted] = useState<number[]>([]);

  const toggleShortlist = (id: number) => {
    setShortlisted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Applicants</h1>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Match %</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Level</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Solved</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Accuracy</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Interview</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map(a => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{a.name}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">{a.match}%</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{a.level}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.solved}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.accuracy}%</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.interview}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => setSelected(a)} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"><Eye className="h-4 w-4" /></button>
                      <button className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"><Download className="h-4 w-4" /></button>
                      <button onClick={() => toggleShortlist(a.id)} className={`rounded-lg border p-1.5 transition-colors ${shortlisted.includes(a.id) ? "border-amber-300 bg-amber-50 text-amber-500" : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                        <Star className="h-4 w-4" fill={shortlisted.includes(a.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader><DialogTitle className="font-display">{selected.name}</DialogTitle></DialogHeader>
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
                  <p className="text-xs font-medium text-muted-foreground mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.skills.map(s => <span key={s} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{s}</span>)}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Projects</p>
                  <p className="text-foreground">{selected.projects}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg bg-secondary/50 px-3 py-2">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="font-medium text-foreground">{value}</p>
  </div>
);
