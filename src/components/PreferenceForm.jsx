import React, { useState } from "react";

const USAGE_OPTIONS = [
  { value: "daily-city", label: "Daily City", desc: "Short commutes, traffic", icon: "🏙️" },
  { value: "highway", label: "Long Highway", desc: "Intercity & outstation", icon: "🛣️" },
  { value: "mixed", label: "Mixed Use", desc: "City and highway both", icon: "🔄" },
  { value: "adventure", label: "Adventure", desc: "Hills & rough terrain", icon: "⛰️" },
];

const FUEL_OPTIONS = [
  { value: "any", label: "No preference" },
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric (EV)" },
  { value: "eco", label: "Eco (EV/Hybrid/CNG)" },
];

const PRIORITIES = [
  { key: "safety", label: "Safety", icon: "🛡️", desc: "NCAP, airbags, ADAS" },
  { key: "mileage", label: "Mileage", icon: "⛽", desc: "Fuel efficiency" },
  { key: "comfort", label: "Comfort", icon: "🛋️", desc: "Ride & cabin space" },
  { key: "performance", label: "Performance", icon: "🏎️", desc: "Power & handling" },
];

const DEFAULT_FORM = {
  budget: 15,
  dailyUsage: "mixed",
  familySize: 4,
  fuelPreference: "any",
  priorities: { safety: 3, mileage: 3, comfort: 3, performance: 3 },
};

// compact prop = true when rendered in the sidebar (narrower space)
export default function PreferenceForm({ onSubmit, loading, compact = false }) {
  const [form, setForm] = useState(DEFAULT_FORM);

  const handlePriority = (key, value) => {
    setForm(f => ({ ...f, priorities: { ...f.priorities, [key]: value } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Budget */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-brand-slate">Budget</label>
          <span className="text-brand-teal font-bold text-base">₹{form.budget}L</span>
        </div>
        <input
          type="range"
          min="3" max="60" step="0.5"
          value={form.budget}
          onChange={e => setForm(f => ({ ...f, budget: parseFloat(e.target.value) }))}
          className="w-full accent-brand-teal cursor-pointer"
        />
        <div className="flex justify-between text-xs text-brand-slate mt-1">
          <span>₹3L</span><span>₹60L</span>
        </div>
      </div>

      {/* Daily Usage — stacked list in compact, 2-col grid in full */}
      <div>
        <label className="text-sm font-medium text-brand-slate block mb-2">Primary Usage</label>
        <div className={compact ? "space-y-2" : "grid grid-cols-2 gap-3"}>
          {USAGE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm(f => ({ ...f, dailyUsage: opt.value }))}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 w-full ${
                form.dailyUsage === opt.value
                  ? "border-brand-teal bg-brand-teal/10 text-white"
                  : "border-brand-navy-lighter hover:border-brand-slate text-slate-300"
              }`}
            >
              <span className="text-xl shrink-0">{opt.icon}</span>
              <div className="min-w-0">
                <div className="font-semibold text-sm leading-tight">{opt.label}</div>
                <div className="text-xs text-brand-slate mt-0.5 leading-tight">{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Family Size */}
      <div>
        <label className="text-sm font-medium text-brand-slate block mb-2">Family Size</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setForm(f => ({ ...f, familySize: Math.max(1, f.familySize - 1) }))}
            className="w-9 h-9 shrink-0 rounded-lg border border-brand-navy-lighter hover:border-brand-teal hover:text-brand-teal text-slate-300 font-bold text-lg transition-colors flex items-center justify-center"
          >−</button>
          <div className="flex-1 text-center bg-brand-navy rounded-lg py-2">
            <span className="text-2xl font-bold text-white">{form.familySize}</span>
            <span className="text-xs text-brand-slate ml-1">{form.familySize === 1 ? "person" : "people"}</span>
          </div>
          <button
            type="button"
            onClick={() => setForm(f => ({ ...f, familySize: Math.min(8, f.familySize + 1) }))}
            className="w-9 h-9 shrink-0 rounded-lg border border-brand-navy-lighter hover:border-brand-teal hover:text-brand-teal text-slate-300 font-bold text-lg transition-colors flex items-center justify-center"
          >+</button>
        </div>
      </div>

      {/* Fuel Preference */}
      <div>
        <label className="text-sm font-medium text-brand-slate block mb-2">Fuel Preference</label>
        <select
          value={form.fuelPreference}
          onChange={e => setForm(f => ({ ...f, fuelPreference: e.target.value }))}
          className="input-field text-sm"
        >
          {FUEL_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Priorities */}
      <div>
        <label className="text-sm font-medium text-brand-slate block mb-1">What matters most?</label>
        <p className="text-xs text-brand-slate mb-3">Rate 1 (low) → 5 (must-have)</p>
        <div className="space-y-3">
          {PRIORITIES.map(({ key, label, icon, desc }) => (
            <div key={key}>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-sm">{icon}</span>
                <span className="text-sm font-medium text-white">{label}</span>
                <span className="text-xs text-brand-slate">— {desc}</span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => handlePriority(key, v)}
                    className={`flex-1 h-8 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      form.priorities[key] >= v
                        ? "bg-brand-teal text-brand-navy"
                        : "bg-brand-navy border border-brand-navy-lighter text-brand-slate hover:border-brand-slate"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-brand-navy border-t-transparent rounded-full animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <span>🔍</span>
            {compact ? "Update Results" : "Find My Perfect Car"}
          </>
        )}
      </button>
    </form>
  );
}
