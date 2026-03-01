import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InterviewPrep() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Interview Preparation</h1>

      <Tabs defaultValue="technical" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
          <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
        </TabsList>

        <TabsContent value="technical"><TechnicalTab /></TabsContent>
        <TabsContent value="coding"><CodingTab /></TabsContent>
        <TabsContent value="behavioral"><BehavioralTab /></TabsContent>
      </Tabs>
    </div>
  );
}

function TechnicalTab() {
  const [role, setRole] = useState("frontend");
  const [difficulty, setDifficulty] = useState("medium");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState<number | null>(null);

  const questions: Record<string, string[]> = {
    frontend: ["Explain the Virtual DOM in React.", "What is the difference between CSS Grid and Flexbox?", "How does React reconciliation work?"],
    backend: ["Explain REST vs GraphQL.", "What are database indexes?", "Describe microservices architecture."],
    fullstack: ["How do you handle authentication in a full-stack app?", "Explain the CAP theorem.", "What is server-side rendering?"],
  };

  const generate = () => { setQuestion(questions[role][Math.floor(Math.random() * 3)]); setAnswer(""); setScore(null); };
  const evaluate = () => setScore(Math.floor(Math.random() * 30) + 70);

  const inputClass = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Role</label>
          <select className={inputClass} value={role} onChange={e => setRole(e.target.value)}>
            <option value="frontend">Frontend</option><option value="backend">Backend</option><option value="fullstack">Full Stack</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Difficulty</label>
          <select className={inputClass} value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <button onClick={generate} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Generate Question</button>
      {question && (
        <>
          <div className="rounded-lg bg-secondary/50 p-4"><p className="text-sm font-medium text-foreground">{question}</p></div>
          <textarea className={inputClass + " min-h-[120px]"} placeholder="Type your answer..." value={answer} onChange={e => setAnswer(e.target.value)} />
          <button onClick={evaluate} className="rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90">Evaluate</button>
          {score !== null && (
            <div className="rounded-lg bg-primary/5 p-4 text-center">
              <p className="text-sm text-muted-foreground">AI Score</p>
              <p className="font-display text-3xl font-bold text-primary">{score}/100</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function CodingTab() {
  const [lang, setLang] = useState("python");
  const [code, setCode] = useState("# Write your solution here\n");
  const [output, setOutput] = useState("");

  const inputClass = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Language</label>
        <select className={inputClass} value={lang} onChange={e => setLang(e.target.value)}>
          {["python", "cpp", "java", "rust", "javascript"].map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Code Editor</label>
        <textarea className={inputClass + " min-h-[200px] font-mono text-xs"} value={code} onChange={e => setCode(e.target.value)} />
      </div>
      <button onClick={() => setOutput("✓ All test cases passed (3/3)\nExecution time: 45ms\nMemory: 12.4 MB")} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
        Run Code
      </button>
      {output && (
        <div className="rounded-lg bg-foreground/5 p-4">
          <p className="mb-1 text-xs font-medium text-muted-foreground">Output</p>
          <pre className="whitespace-pre-wrap font-mono text-xs text-foreground">{output}</pre>
        </div>
      )}
    </div>
  );
}

function BehavioralTab() {
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState<number | null>(null);

  const questions = [
    "Tell me about a time you handled a conflict with a teammate.",
    "Describe a situation where you had to meet a tight deadline.",
    "How do you prioritize tasks when everything seems urgent?",
    "Tell me about a time you failed and what you learned.",
  ];

  const inputClass = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
      <div className="rounded-lg bg-secondary/50 p-4">
        <p className="text-xs text-muted-foreground mb-1">Question {qIndex + 1} of {questions.length}</p>
        <p className="text-sm font-medium text-foreground">{questions[qIndex]}</p>
      </div>
      <textarea className={inputClass + " min-h-[150px]"} placeholder="Type your answer..." value={answer} onChange={e => setAnswer(e.target.value)} />
      <div className="flex gap-3">
        <button onClick={() => { setScore(Math.floor(Math.random() * 25) + 75); }} className="rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90">Get Feedback</button>
        <button onClick={() => { setQIndex((qIndex + 1) % questions.length); setAnswer(""); setScore(null); }} className="rounded-xl border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">Next Question</button>
      </div>
      {score !== null && (
        <div className="rounded-lg bg-primary/5 p-4 text-center">
          <p className="text-sm text-muted-foreground">AI Feedback Score</p>
          <p className="font-display text-3xl font-bold text-primary">{score}/100</p>
        </div>
      )}
    </div>
  );
}
