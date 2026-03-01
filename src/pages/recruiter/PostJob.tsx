import { useState } from "react";
import { X } from "lucide-react";

export default function PostJob() {
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript"]);
  const [skillInput, setSkillInput] = useState("");
  const [empType, setEmpType] = useState("full-time");

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const inputClass = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Post a Job</h1>
      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Job Title</label>
          <input className={inputClass} placeholder="e.g. Senior React Developer" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Required Skills</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {skills.map(s => (
              <span key={s} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {s} <button onClick={() => setSkills(skills.filter(x => x !== s))}><X className="h-3 w-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input className={inputClass} placeholder="Add skill..." value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())} />
            <button onClick={addSkill} className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Add</button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Experience Required</label>
          <input className={inputClass} placeholder="e.g. 3-5 years" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Job Description</label>
          <textarea className={inputClass + " min-h-[120px]"} placeholder="Describe the role..." />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Employment Type</label>
          <div className="flex gap-3">
            {["full-time", "internship", "contract"].map(t => (
              <button key={t} onClick={() => setEmpType(t)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-all ${empType === t ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/50"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <button className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-hero-glow hover:shadow-lg transition-shadow">
          Publish Job
        </button>
      </div>
    </div>
  );
}
