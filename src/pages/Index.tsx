import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, User, X, Sparkles } from "lucide-react";

type AuthMode = "login" | "register" | null;

const RoleModal = ({ mode, onClose }: { mode: AuthMode; onClose: () => void }) => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: "recruiter" | "candidate") => {
    navigate(`/${role}/${mode}`);
  };

  return (
    <AnimatePresence>
      {mode && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md mx-4 rounded-2xl glass-card p-8 shadow-card-hover"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="mb-2 text-center font-display text-2xl font-bold text-foreground">
              {mode === "login" ? "Log In" : "Create Account"}
            </h2>
            <p className="mb-8 text-center text-sm text-muted-foreground">
              Select your role to continue
            </p>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect("recruiter")}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-card-hover"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Briefcase className="h-6 w-6" />
                </div>
                <span className="font-display text-sm font-semibold text-foreground">Recruiter</span>
                <span className="text-xs text-muted-foreground">Hire top talent</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect("candidate")}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-card-hover"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <User className="h-6 w-6" />
                </div>
                <span className="font-display text-sm font-semibold text-foreground">Candidate</span>
                <span className="text-xs text-muted-foreground">Ace interviews</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Index = () => {
  const [authMode, setAuthMode] = useState<AuthMode>(null);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-subtle">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-4 w-full max-w-lg text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-hero shadow-hero-glow"
        >
          <Sparkles className="h-8 w-8 text-primary-foreground" />
        </motion.div>

        <h1 className="mb-2 font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          HireWise AI
        </h1>

        <p className="mx-auto mb-10 max-w-md text-lg text-muted-foreground">
          Intelligent Hiring. Smarter Preparation.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setAuthMode("login")}
            className="btn-gradient w-full rounded-xl px-8 py-3.5 font-semibold text-primary-foreground shadow-hero-glow sm:w-auto"
          >
            Login
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setAuthMode("register")}
            className="w-full rounded-xl border border-border glass-card px-8 py-3.5 font-semibold text-foreground shadow-card transition-all hover:shadow-card-hover sm:w-auto"
          >
            Register
          </motion.button>
        </div>
      </motion.div>

      <RoleModal mode={authMode} onClose={() => setAuthMode(null)} />
    </div>
  );
};

export default Index;
