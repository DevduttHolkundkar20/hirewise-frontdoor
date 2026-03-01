import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function MyProfile() {
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js", "Python"]);
  const [skillInput, setSkillInput] = useState("");
  const [resumeFile, setResumeFile] = useState<string | null>("resume_john_doe.pdf");
  const [form, setForm] = useState({
    name: "John Doe", email: "john@example.com", phone: "+1 555-1234",
    experience: "3 years at TechCorp as Frontend Developer", education: "B.S. Computer Science, MIT",
    projects: "E-commerce Platform, Chat Application, ML Pipeline",
  });

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const addSkill = () => { if (skillInput.trim() && !skills.includes(skillInput.trim())) { setSkills([...skills, skillInput.trim()]); setSkillInput(""); } };
  const inputClass = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

  const analytics = [
    { label: "Technical Level", value: "Advanced" },
    { label: "Questions Solved", value: "124" },
    { label: "Coding Accuracy", value: "88%" },
    { label: "Technical Score", value: "85" },
    { label: "Behavioral Score", value: "79" },
    { label: "Overall Readiness", value: "82%" },
  ];

  const completion = 78;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">My Profile</h1>

      {/* Completion bar */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Profile Completion</span>
          <span className="text-sm font-semibold text-primary">{completion}%</span>
        </div>
        <Progress value={completion} className="h-2" />
      </div>

      {/* Basic info */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
        <h3 className="font-display text-sm font-semibold text-foreground">Personal Information</h3>
        {[
          { label: "Name", key: "name" }, { label: "Email", key: "email" }, { label: "Phone", key: "phone" },
        ].map(f => (
          <div key={f.key}>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{f.label}</label>
            <input className={inputClass} value={(form as any)[f.key]} onChange={e => update(f.key, e.target.value)} />
          </div>
        ))}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Skills</label>
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

        {[
          { label: "Experience", key: "experience" }, { label: "Education", key: "education" }, { label: "Projects", key: "projects" },
        ].map(f => (
          <div key={f.key}>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{f.label}</label>
            <textarea className={inputClass + " min-h-[80px]"} value={(form as any)[f.key]} onChange={e => update(f.key, e.target.value)} />
          </div>
        ))}
      </div>

      {/* Resume upload */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-3 font-display text-sm font-semibold text-foreground">Resume</h3>
        {resumeFile ? (
          <div className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3">
            <span className="text-sm text-foreground">{resumeFile}</span>
            <div className="flex gap-2">
              <button onClick={() => setResumeFile(null)} className="text-xs text-destructive hover:underline">Remove</button>
              <label className="cursor-pointer text-xs text-primary hover:underline">Replace<input type="file" className="hidden" onChange={e => setResumeFile(e.target.files?.[0]?.name || null)} /></label>
            </div>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border p-8 text-muted-foreground hover:border-primary/50 transition-colors">
            <Upload className="h-8 w-8" />
            <span className="text-sm font-medium">Upload Resume</span>
            <input type="file" className="hidden" onChange={e => setResumeFile(e.target.files?.[0]?.name || null)} />
          </label>
        )}
      </div>

      {/* Analytics */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="mb-3 font-display text-sm font-semibold text-foreground">Profile Analytics</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {analytics.map(a => (
            <div key={a.label} className="rounded-lg bg-secondary/50 px-3 py-2.5 text-center">
              <p className="text-xs text-muted-foreground">{a.label}</p>
              <p className="font-display text-lg font-bold text-foreground">{a.value}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-hero-glow hover:shadow-lg transition-shadow">
        Save Profile
      </button>
    </div>
  );
}
