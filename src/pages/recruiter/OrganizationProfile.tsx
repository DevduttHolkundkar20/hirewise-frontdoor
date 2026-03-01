import { useState } from "react";

export default function OrganizationProfile() {
  const [form, setForm] = useState({
    name: "Acme Technologies", industry: "Software Development",
    website: "https://acme.tech", description: "Leading AI-powered enterprise solutions provider.",
    size: "201-500",
  });

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const inputClass = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Organization Profile</h1>
      <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-5">
        {[
          { label: "Organization Name", key: "name", placeholder: "Company name" },
          { label: "Industry", key: "industry", placeholder: "e.g. Software Development" },
          { label: "Website", key: "website", placeholder: "https://..." },
        ].map(f => (
          <div key={f.key}>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{f.label}</label>
            <input className={inputClass} value={(form as any)[f.key]} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder} />
          </div>
        ))}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
          <textarea className={inputClass + " min-h-[100px]"} value={form.description} onChange={e => update("description", e.target.value)} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Company Size</label>
          <select className={inputClass} value={form.size} onChange={e => update("size", e.target.value)}>
            {["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <button className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground shadow-hero-glow hover:shadow-lg transition-shadow">
          Save Changes
        </button>
      </div>
    </div>
  );
}
