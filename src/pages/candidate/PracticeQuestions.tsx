import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Play, Send, ChevronRight, Code2, Terminal, Info, Settings, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import Editor, { OnMount } from "@monaco-editor/react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

interface Question {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
}

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PracticeQuestions() {
  // Fetch questions from API
  const { data: questions = [], isLoading: isQuestionsLoading, isError: isQuestionsError } = useQuery<Question[]>({
    queryKey: ["coding-questions"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/coding_questions`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch questions");
      return response.json();
    },
  });

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  
  const editorRef = useRef<any>(null);

  // Set initial question when data is loaded
  useEffect(() => {
    if (questions.length > 0 && !selectedQuestion) {
      setSelectedQuestion(questions[0]);
    }
  }, [questions]);

  // Handle template code when question or language changes
  useEffect(() => {
    if (selectedQuestion) {
      if (language === "python") setCode("# Write your solution here\n\ndef solution():\n    pass");
      else if (language === "java") setCode("// Write your solution here\n\nclass Solution {\n    public void solve() {\n        \n    }\n}");
      else if (language === "cpp") setCode("// Write your solution here\n\nclass Solution {\npublic:\n    void solve() {\n        \n    }\n};");
      else setCode("// Write your solution here\n\nfunction solution() {\n  \n}");
    }
  }, [selectedQuestion, language]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRunCode();
    });
  };

  const handleRunCode = async () => {
    if (!code.trim() || !selectedQuestion) return;
    
    setIsExecuting(true);
    setOutput("Compiling and running...\n");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/execute_code`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          question_id: selectedQuestion.id,
          language,
          code: btoa(code), // Sending as base64
        }),
      });

      if (!response.ok) throw new Error("Execution failed");
      
      const result = await response.json();
      setOutput(result.output || result.error || "No output returned.");
      
      if (result.success) {
        toast.success("Code executed successfully!");
      } else {
        toast.error("Execution error occurred.");
      }
    } catch (error) {
      setOutput("Error: Failed to connect to execution engine. Please ensure the backend is running.");
      toast.error("Execution failed");
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim() || !selectedQuestion) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/submit_solution`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          question_id: selectedQuestion.id,
          language,
          code: btoa(code),
        }),
      });

      if (!response.ok) throw new Error("Submission failed");
      
      const result = await response.json();
      toast.success(result.message || "Solution submitted successfully!");
      setOutput(prev => prev + "\n\n--- Submission Result ---\n" + (result.feedback || "Good job! Solution saved."));
    } catch (error) {
      toast.error("Failed to submit solution");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isQuestionsLoading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Loading coding challenges...</p>
        </div>
      </div>
    );
  }

  if (isQuestionsError || !questions) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-xl font-bold">Failed to Load Challenges</h2>
          <p className="text-muted-foreground">We couldn't reach the server. Please check if your backend API is running at {API_BASE_URL}.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Practice Coding</h1>
          <p className="text-muted-foreground">Sharpen your skills with AI-curated challenges.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Language:</span>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[140px] h-9 bg-card">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleRunCode} disabled={isExecuting || !selectedQuestion} variant="outline" className="gap-2 h-9">
            {isExecuting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            Run
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !selectedQuestion} className="gap-2 h-9 bg-gradient-primary border-none shadow-hero-glow">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Submit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left Sidebar - Questions List */}
        <div className="col-span-3 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
          {questions.map((q) => (
            <Card 
              key={q.id} 
              className={`cursor-pointer transition-all hover:border-primary/50 ${selectedQuestion?.id === q.id ? 'border-primary ring-1 ring-primary/20 bg-primary/5' : ''}`}
              onClick={() => setSelectedQuestion(q)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm leading-tight">{q.title}</h3>
                  <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${selectedQuestion?.id === q.id ? 'rotate-90' : ''}`} />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={q.difficulty === "Easy" ? "secondary" : q.difficulty === "Medium" ? "outline" : "destructive"} className="text-[10px] py-0 px-1.5">
                    {q.difficulty}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{q.category}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Middle - Description */}
        <div className="col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin">
          {selectedQuestion && (
            <Card className="flex-1 border-none shadow-none bg-transparent">
              <CardHeader className="px-0 pt-0">
                <div className="flex items-center gap-2 text-primary">
                  <Info className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Problem Description</span>
                </div>
                <CardTitle className="text-xl mt-1">{selectedQuestion.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{selectedQuestion.difficulty}</Badge>
                  <Badge variant="outline">{selectedQuestion.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div className="text-sm leading-relaxed text-foreground/80">
                  {selectedQuestion.description}
                </div>

                <div className="space-y-4">
                  {selectedQuestion.examples.map((ex, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="text-sm font-semibold">Example {i + 1}:</h4>
                      <div className="rounded-lg bg-muted/50 p-3 font-mono text-xs space-y-1 border border-border">
                        <div><span className="text-muted-foreground">Input:</span> {ex.input}</div>
                        <div><span className="text-muted-foreground">Output:</span> {ex.output}</div>
                        {ex.explanation && (
                          <div className="mt-2 italic text-muted-foreground"><span className="not-italic font-semibold">Explanation:</span> {ex.explanation}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right - Editor & Output */}
        <div className="col-span-5 flex flex-col gap-4">
          <div className="flex-1 flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-card">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">solution.{language === 'cpp' ? 'cpp' : language === 'python' ? 'py' : language === 'java' ? 'java' : 'js'}</span>
              </div>
              <div className="flex items-center gap-2">
                 <button onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')} className="p-1 hover:bg-muted rounded transition-colors" title="Toggle Theme">
                    <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                 </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language={language}
                theme={theme}
                value={code}
                onMount={handleEditorDidMount}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  automaticLayout: true,
                  padding: { top: 10 },
                }}
              />
            </div>
          </div>

          <div className="h-48 flex flex-col rounded-xl border border-border bg-zinc-950 overflow-hidden shadow-card">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
              <Terminal className="h-4 w-4 text-zinc-400" />
              <span className="text-xs font-medium text-zinc-400">Console Output</span>
            </div>
            <div className="flex-1 p-4 font-mono text-xs text-zinc-300 overflow-y-auto scrollbar-thin">
              {output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <div className="flex items-center gap-2 text-zinc-600 italic">
                  <CheckCircle2 className="h-3 w-3" />
                  Run your code to see the output here...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
