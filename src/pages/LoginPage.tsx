import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { AuthBackground } from "@/components/AuthBackground";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const LoginPage = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const roleLabel = role === "recruiter" ? "Recruiter" : "Candidate";

  const loginMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success("Logged in successfully!");
      // Store token or user data if necessary
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      navigate(`/${role}/dashboard`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Invalid email or password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password, role: role === "recruiter" ? "hr" : "candidate" });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-subtle">
      <AuthBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-4 w-full max-w-md"
      >
        <div className="rounded-2xl glass-card p-8 shadow-card-hover">
          <button
            onClick={() => navigate("/")}
            className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            disabled={loginMutation.isPending}
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
                  disabled={loginMutation.isPending}
                  className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loginMutation.isPending}
                  className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loginMutation.isPending}
              className="btn-gradient w-full rounded-xl py-3.5 font-semibold text-primary-foreground shadow-hero-glow flex items-center justify-center gap-2"
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={() => navigate(`/${role}/register`)}
              className="font-medium text-primary hover:underline"
              disabled={loginMutation.isPending}
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
