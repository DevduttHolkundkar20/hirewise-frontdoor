import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle, AlertCircle, XCircle, Sparkles, FileText, Target, TrendingUp, Lightbulb, Loader2, Briefcase } from "lucide-react";
import { CircularProgress } from "@/components/CircularProgress";
import { GradientProgress } from "@/components/GradientProgress";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface AnalysisResult {
  score: number;
  analysis: string;
  suggestions: string[];
}

export default function ResumeAnalyzer() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [jobProfile, setJobProfile] = useState("");

  const analyzeMutation = useMutation({
    mutationFn: async ({ file, jobProfile }: { file: File; jobProfile: string }) => {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("job_profile", jobProfile);

      const response = await fetch("http://127.0.0.1:3000/analyze_resume", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401) {
        toast.error("Session expired. Please login again.");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to analyze resume");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
      toast.success("Resume analyzed successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong during analysis.");
    },
  });

  const handleStartAnalysis = () => {
    if (!file) {
      toast.error("Please upload a resume first.");
      return;
    }
    if (!jobProfile.trim()) {
      toast.error("Please specify a job profile.");
      return;
    }
    analyzeMutation.mutate({ file, jobProfile });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null); // Reset result when new file is uploaded
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      <div>
        <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
          <Sparkles className="h-6 w-6 text-ai" /> AI Resume Analyzer
        </h1>
        <p className="text-sm text-muted-foreground">Deep analysis, job matching & actionable improvements.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Position Selection */}
        <div className="rounded-2xl border border-border glass-card p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <h3 className="font-display text-sm font-semibold text-foreground">Target Job Profile</h3>
          </div>
          <div className="relative">
            <textarea
              placeholder="Paste the job description here... (e.g. Looking for a React developer with 3 years experience)"
              value={jobProfile}
              onChange={(e) => setJobProfile(e.target.value)}
              className="w-full min-h-[100px] rounded-xl border border-input bg-background py-3 pl-4 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:opacity-50"
              disabled={analyzeMutation.isPending}
            />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground italic">
            The more detail you provide, the more accurate the AI match will be.
          </p>
        </div>

        {/* Upload */}
        <div className="rounded-2xl border border-border glass-card p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h3 className="font-display text-sm font-semibold text-foreground">Resume File</h3>
          </div>
          <label className="group relative flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-background/50 p-4 transition-all hover:border-primary/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Upload className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {file ? file.name : "Select Resume (PDF)"}
              </p>
              <p className="text-xs text-muted-foreground">Max 5MB · PDF only</p>
            </div>
            <input type="file" className="hidden" onChange={handleFileChange} disabled={analyzeMutation.isPending} accept=".pdf" />
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStartAnalysis}
          disabled={analyzeMutation.isPending}
          className="btn-gradient flex items-center gap-2 rounded-xl px-12 py-3.5 font-semibold text-primary-foreground shadow-hero-glow disabled:opacity-70"
        >
          {analyzeMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Analyze Resume
            </>
          )}
        </motion.button>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 pt-6"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Circular score */}
            <div className="flex flex-col items-center justify-center rounded-2xl gradient-border p-6 text-center">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <FileText className="h-3.5 w-3.5" /> Match Score
              </p>
              <CircularProgress value={result.score} label="out of 100" gradient="primary" />
              <p className="mt-3 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                {result.score >= 80 ? "Excellent" : result.score >= 60 ? "Above Average" : "Needs Improvement"}
              </p>
            </div>

            {/* Analysis Insight */}
            <div className="lg:col-span-2 rounded-2xl border border-border glass-card p-6 shadow-card">
              <div className="mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="font-display text-sm font-semibold text-foreground">AI Detailed Analysis</h3>
              </div>
              <div className="rounded-xl bg-secondary/30 p-4 text-sm leading-relaxed text-foreground border border-border">
                {result.analysis}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="relative overflow-hidden rounded-2xl gradient-border p-6">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-ai/10 blur-3xl" />
            <div className="relative">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-ai text-ai-foreground shadow-ai-glow pulse-ai">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">Actionable Suggestions</h3>
                  <p className="text-xs text-muted-foreground">Ranked by impact on match score</p>
                </div>
              </div>
              <ol className="space-y-3">
                {result.suggestions.map((imp, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.08 }}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-ai text-xs font-bold text-ai-foreground">{i + 1}</span>
                    <span className="text-sm text-foreground">{imp}</span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}



