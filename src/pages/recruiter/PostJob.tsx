import { useState } from "react";
import { X, Loader2, Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript"]);
  const [skillInput, setSkillInput] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [empType, setEmpType] = useState("full-time");

  const postJobMutation = useMutation({
    mutationFn: async (jobData: any) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/post_job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to publish job");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Job published successfully!");
      navigate("/recruiter/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || skills.length === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    postJobMutation.mutate({
      title,
      skills,
      experience,
      description,
      employmentType: empType,
      postedAt: new Date().toISOString(),
    });
  };

  const inputClass = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:opacity-50";

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-12">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Post a Job</h1>
        <p className="text-sm text-muted-foreground">Fill in the details to find your next great hire.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 shadow-card space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Job Title *</label>
          <input 
            required
            className={inputClass} 
            placeholder="e.g. Senior React Developer" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={postJobMutation.isPending}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Required Skills *</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {skills.map(s => (
              <span key={s} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {s} 
                <button 
                  type="button"
                  onClick={() => setSkills(skills.filter(x => x !== s))}
                  disabled={postJobMutation.isPending}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input 
              className={inputClass} 
              placeholder="Add skill..." 
              value={skillInput} 
              onChange={e => setSkillInput(e.target.value)} 
              onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())}
              disabled={postJobMutation.isPending}
            />
            <button 
              type="button"
              onClick={addSkill} 
              disabled={postJobMutation.isPending}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Experience Required</label>
          <input 
            className={inputClass} 
            placeholder="e.g. 3-5 years" 
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            disabled={postJobMutation.isPending}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Job Description *</label>
          <textarea 
            required
            className={inputClass + " min-h-[120px]"} 
            placeholder="Describe the role, responsibilities, and requirements..." 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={postJobMutation.isPending}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Employment Type</label>
          <div className="flex gap-3">
            {["full-time", "internship", "contract"].map(t => (
              <button 
                key={t} 
                type="button"
                disabled={postJobMutation.isPending}
                onClick={() => setEmpType(t)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-all ${empType === t ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/50 disabled:opacity-50"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          disabled={postJobMutation.isPending}
          className="btn-gradient w-full rounded-xl py-3.5 font-semibold text-primary-foreground shadow-hero-glow flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {postJobMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Publish Job
            </>
          )}
        </button>
      </form>
    </div>
  );
}
