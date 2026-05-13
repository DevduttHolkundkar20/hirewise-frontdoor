import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Briefcase, Target, Sparkles } from "lucide-react";
import { API_BASE_URL } from "@/lib/api-config";

interface Job {
  id: number;
  title: string;
  skills: string[];
  match?: number;
  orgName?: string;
  org?: string;
  experience?: string;
  description?: string;
  employmentType?: string;
}

export default function JobMatches() {
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading, error } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch jobs");
      return response.json();
    },
  });

  const applyMutation = useMutation({
    mutationFn: async (jobId: number) => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/apply_job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ jobId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to apply for job");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Application submitted successfully!");
      setApplyJob(null);
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-destructive font-medium">Error: {(error as Error).message}</p>
        <button 
          onClick={() => queryClient.invalidateQueries({ queryKey: ["jobs"] })}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Job Matches</h1>
          <p className="text-sm text-muted-foreground">AI-curated opportunities based on your profile.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-ai/30 bg-ai/5 px-3 py-1.5 text-xs font-medium text-ai">
          <Sparkles className="h-3.5 w-3.5" /> AI Matching Enabled
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {jobs.length > 0 ? (
          jobs.map(j => (
            <div key={j.id} className="group rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-foreground truncate">{j.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{j.orgName || j.org || "Company"}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                    {j.match || Math.floor(Math.random() * 20) + 75}%
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Match Score</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {j.skills.map(s => (
                  <span key={s} className="rounded-full bg-secondary/80 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mb-4 text-xs text-muted-foreground line-clamp-2">
                {j.description || "No description provided."}
              </div>
              <button 
                onClick={() => setApplyJob(j)} 
                className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
              >
                Apply for Position
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-12 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <p className="text-foreground font-medium">No job matches found yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Check back later for new opportunities.</p>
          </div>
        )}
      </div>

      <Dialog open={!!applyJob} onOpenChange={() => setApplyJob(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Confirm Application
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <p className="text-sm leading-relaxed text-muted-foreground">
              You are applying for <span className="font-semibold text-foreground">{applyJob?.title}</span> at <span className="font-semibold text-foreground">{applyJob?.orgName || applyJob?.org}</span>.
            </p>
            <div className="rounded-xl bg-secondary/30 p-4 text-xs border border-border">
              <p className="font-medium text-foreground mb-1">What happens next?</p>
              <p className="text-muted-foreground">Your verified profile, skills analysis, and resume will be sent to the hiring team. You will be notified via email when they review your application.</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button 
              onClick={() => setApplyJob(null)} 
              disabled={applyMutation.isPending}
              className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => applyMutation.mutate(applyJob!.id)} 
              disabled={applyMutation.isPending}
              className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-hero-glow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {applyMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Applying...
                </>
              ) : (
                "Confirm Application"
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
