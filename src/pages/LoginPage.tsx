import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roleLabel = role === "recruiter" ? "Recruiter" : "Candidate";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    alert(`Logged in as ${roleLabel}: ${email}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-4 w-full max-w-md"
      >
        <div className="rounded-2xl bg-card p-8 shadow-card">
          <button
            onClick={() => navigate("/")}
            className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <h1 className="mb-1 font-display text-2xl font-bold text-foreground">
            {roleLabel} Login
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Welcome back! Sign in to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground shadow-hero-glow transition-shadow hover:shadow-lg"
            >
              Sign In
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={() => navigate(`/${role}/register`)}
              className="font-medium text-primary hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
