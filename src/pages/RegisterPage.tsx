import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, Building2, Phone } from "lucide-react";

const RegisterPage = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", orgName: "", email: "", phone: "", password: "", confirmPassword: ""
  });

  const isRecruiter = role === "recruiter";
  const roleLabel = isRecruiter ? "Recruiter" : "Candidate";

  const update = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { alert("Passwords do not match!"); return; }
    navigate(isRecruiter ? "/recruiter/dashboard" : "/candidate/dashboard");
  };

  const inputClass = "w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-4 w-full max-w-md">
        <div className="rounded-2xl bg-card p-8 shadow-card">
          <button onClick={() => navigate("/")} className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="mb-1 font-display text-2xl font-bold text-foreground">{roleLabel} Registration</h1>
          <p className="mb-8 text-sm text-muted-foreground">Create your account to get started.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field icon={<User />} label="Full Name" type="text" placeholder="John Doe" value={form.fullName} onChange={v => update("fullName", v)} />
            
            {isRecruiter && (
              <Field icon={<Building2 />} label="Organization Name" type="text" placeholder="Acme Corp" value={form.orgName} onChange={v => update("orgName", v)} required />
            )}
            
            <Field icon={<Mail />} label={isRecruiter ? "Official Email" : "Email"} type="email" placeholder="you@example.com" value={form.email} onChange={v => update("email", v)} />
            
            {!isRecruiter && (
              <Field icon={<Phone />} label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={v => update("phone", v)} />
            )}
            
            <Field icon={<Lock />} label="Password" type="password" placeholder="••••••••" value={form.password} onChange={v => update("password", v)} />
            <Field icon={<Lock />} label="Confirm Password" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={v => update("confirmPassword", v)} />

            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground shadow-hero-glow transition-shadow hover:shadow-lg">
              Create Account
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

const Field = ({ icon, label, type, placeholder, value, onChange, required = true }: {
  icon: React.ReactNode; label: string; type: string; placeholder: string; value: string; onChange: (v: string) => void; required?: boolean;
}) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      <input type={type} required={required} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20" />
    </div>
  </div>
);

export default RegisterPage;
