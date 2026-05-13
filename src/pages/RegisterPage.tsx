import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, Building2, Phone, Loader2, Eye, EyeOff } from "lucide-react";
import { AuthBackground } from "@/components/AuthBackground";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api-config";

const RegisterPage = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", orgName: "", email: "", phone: "", password: "", confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isRecruiter = role === "recruiter";
  const roleLabel = isRecruiter ? "Recruiter" : "Candidate";

  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          // Mapping frontend role to API role if needed
          role: isRecruiter ? "hr" : "candidate",
          fullName: data.fullName,
          ...(isRecruiter ? { orgName: data.orgName } : { phone: data.phone }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Registration failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success("Account created successfully!");
      navigate(`/${role}/login`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });

  const update = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    registerMutation.mutate(form);
  };

  const inputClass = "w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-subtle">
      <AuthBackground />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 mx-4 w-full max-w-md">
        <div className="rounded-2xl glass-card p-8 shadow-card-hover">
          <button onClick={() => navigate("/")} className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="mb-1 font-display text-2xl font-bold text-foreground">{roleLabel} Registration</h1>
          <p className="mb-8 text-sm text-muted-foreground">Create your account to get started.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field icon={<User />} label="Full Name" type="text" placeholder="John Doe" value={form.fullName} onChange={v => update("fullName", v)} disabled={registerMutation.isPending} />
            
            {isRecruiter && (
              <Field icon={<Building2 />} label="Organization Name" type="text" placeholder="Acme Corp" value={form.orgName} onChange={v => update("orgName", v)} required disabled={registerMutation.isPending} />
            )}
            
            <Field icon={<Mail />} label={isRecruiter ? "Official Email" : "Email"} type="email" placeholder="you@example.com" value={form.email} onChange={v => update("email", v)} disabled={registerMutation.isPending} />
            
            {!isRecruiter && (
              <Field icon={<Phone />} label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={v => update("phone", v)} disabled={registerMutation.isPending} />
            )}
            
            <Field 
              icon={<Lock />} 
              label="Password" 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              value={form.password} 
              onChange={v => update("password", v)} 
              disabled={registerMutation.isPending}
              toggleVisibility={() => setShowPassword(!showPassword)}
              isPasswordVisible={showPassword}
              showToggle
            />
            <Field 
              icon={<Lock />} 
              label="Confirm Password" 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="••••••••" 
              value={form.confirmPassword} 
              onChange={v => update("confirmPassword", v)} 
              disabled={registerMutation.isPending}
              toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
              isPasswordVisible={showConfirmPassword}
              showToggle
            />

            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              type="submit" 
              disabled={registerMutation.isPending}
              className="btn-gradient w-full rounded-xl py-3.5 font-semibold text-primary-foreground shadow-hero-glow flex items-center justify-center gap-2"
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => navigate(`/${role}/login`)} className="font-medium text-primary hover:underline">Sign In</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Field = ({ icon, label, type, placeholder, value, onChange, required = true, disabled = false, showToggle = false, toggleVisibility, isPasswordVisible }: {
  icon: React.ReactNode; label: string; type: string; placeholder: string; value: string; onChange: (v: string) => void; required?: boolean; disabled?: boolean;
  showToggle?: boolean; toggleVisibility?: () => void; isPasswordVisible?: boolean;
}) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      <input 
        type={type} 
        required={required} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-xl border border-input bg-background py-3 pl-10 ${showToggle ? "pr-12" : "pr-4"} text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:opacity-50 disabled:cursor-not-allowed`} />
      
      {showToggle && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground focus:outline-none"
        >
          {isPasswordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      )}
    </div>
  </div>
);

export default RegisterPage;
