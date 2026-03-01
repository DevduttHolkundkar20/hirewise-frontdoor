import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const jobs = [
  { id: 1, title: "Senior React Developer", skills: ["React", "TypeScript", "Node.js"], match: 92, org: "Acme Technologies" },
  { id: 2, title: "Full Stack Engineer", skills: ["Python", "Django", "React"], match: 85, org: "InnovateCo" },
  { id: 3, title: "Frontend Lead", skills: ["Vue.js", "TypeScript", "CSS"], match: 80, org: "StartupXYZ" },
  { id: 4, title: "ML Engineer", skills: ["Python", "TensorFlow", "AWS"], match: 74, org: "DataCorp" },
  { id: 5, title: "DevOps Engineer", skills: ["Docker", "Kubernetes", "CI/CD"], match: 68, org: "CloudFirst" },
];

export default function JobMatches() {
  const [applyJob, setApplyJob] = useState<typeof jobs[0] | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Job Matches</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {jobs.map(j => (
          <div key={j.id} className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">{j.title}</h3>
                <p className="text-sm text-muted-foreground">{j.org}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">{j.match}%</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {j.skills.map(s => <span key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">{s}</span>)}
            </div>
            <button onClick={() => setApplyJob(j)} className="w-full rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Apply
            </button>
          </div>
        ))}
      </div>

      <Dialog open={!!applyJob} onOpenChange={() => setApplyJob(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-display">Confirm Application</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">
            Your profile, resume, and performance data will be sent to the recruiter at <strong className="text-foreground">{applyJob?.org}</strong> for the <strong className="text-foreground">{applyJob?.title}</strong> position.
          </p>
          <div className="flex gap-3 mt-4">
            <button onClick={() => setApplyJob(null)} className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium text-foreground hover:bg-secondary">Cancel</button>
            <button onClick={() => { alert("Application submitted!"); setApplyJob(null); }} className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Confirm</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
