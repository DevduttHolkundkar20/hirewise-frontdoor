import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const feedback = [
  { type: "good", text: "Strong technical skills section" },
  { type: "good", text: "Quantified achievements in experience" },
  { type: "warn", text: "Add more keywords for ATS optimization" },
  { type: "warn", text: "Projects section could include tech stack details" },
  { type: "good", text: "Clean, professional formatting" },
];

export default function ResumeAnalyzer() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Resume Analyzer</h1>

      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-card p-10 text-muted-foreground hover:border-primary/50 transition-colors shadow-card">
        <Upload className="h-10 w-10" />
        <span className="font-medium">Upload your resume for AI analysis</span>
        <span className="text-xs">PDF, DOCX supported</span>
        <input type="file" className="hidden" />
      </label>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-sm font-semibold text-foreground">Resume Score</h3>
          <span className="font-display text-2xl font-bold text-primary">82/100</span>
        </div>
        <Progress value={82} className="h-2 mb-6" />

        <h3 className="font-display text-sm font-semibold text-foreground mb-3">AI Feedback</h3>
        <div className="space-y-2">
          {feedback.map((f, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg bg-secondary/50 px-3 py-2">
              {f.type === "good" ? <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />}
              <span className="text-sm text-foreground">{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
