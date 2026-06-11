import React, { useState } from "react";
import PreferenceForm from "./components/PreferenceForm";
import ResultsPanel from "./components/ResultsPanel";
import { getRecommendations } from "./utils/api";

const STEPS = { FORM: "form", RESULTS: "results" };

export default function App() {
  const [step, setStep] = useState(STEPS.FORM);
  const [results, setResults] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubmit = async (prefs) => {
    setLoading(true);
    setError(null);
    setPreferences(prefs);
    setSidebarOpen(false);
    try {
      const data = await getRecommendations(prefs);
      setResults(data);
      setStep(STEPS.RESULTS);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to fetch recommendations. Is the backend running?";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(STEPS.FORM);
    setResults(null);
    setError(null);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-navy">
      {/* Nav */}
      <nav className="border-b border-brand-navy-lighter sticky top-0 z-20 bg-brand-navy/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center shrink-0">
              <span className="text-brand-navy font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-white text-lg">CarFindr</span>
          </button>
          <span className="text-xs text-brand-slate hidden sm:block">AI-powered car recommendations</span>
          {step === STEPS.RESULTS && (
            <div className="flex items-center gap-3">
              {/* Mobile: adjust button */}
              <button
                onClick={() => setSidebarOpen(o => !o)}
                className="lg:hidden text-sm border border-brand-navy-lighter text-slate-300 px-3 py-1.5 rounded-lg hover:border-brand-slate transition-colors"
              >
                ⚙️ Adjust
              </button>
              <button onClick={handleReset} className="text-sm text-brand-teal hover:underline">
                ← New search
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm animate-fade-in">
            ⚠️ {error}
          </div>
        )}

        {step === STEPS.FORM ? (
          /* ── FORM PAGE ── */
          <div className="max-w-2xl mx-auto animate-fade-in">
            {/* Hero */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-xs bg-brand-teal/10 text-brand-teal border border-brand-teal/20 px-3 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse" />
                Smart car matching engine
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Find Your{" "}
                <span className="text-brand-teal">Perfect Car</span>
              </h1>
              <p className="text-brand-slate mt-3 text-base max-w-md mx-auto">
                Tell us your needs — we'll rank the best options with match scores and honest explanations.
              </p>
            </div>

            <div className="card p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-6">Your preferences</h2>
              <PreferenceForm onSubmit={handleSubmit} loading={loading} compact={false} />
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: "🚗", label: "20+ Cars", sub: "in database" },
                { icon: "🎯", label: "6 Factors", sub: "scored & ranked" },
                { icon: "⚡", label: "Instant", sub: "results" },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="card py-3 px-2 text-center">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-xs font-semibold text-white">{label}</div>
                  <div className="text-xs text-brand-slate">{sub}</div>
                </div>
              ))}
            </div>
          </div>

        ) : (
          /* ── RESULTS PAGE ── */
          <div className="flex gap-6 items-start animate-fade-in">

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-72 shrink-0 sticky top-20">
              <div className="card p-4">
                <p className="text-xs font-semibold text-brand-slate uppercase tracking-wider mb-4">Adjust Preferences</p>
                <PreferenceForm onSubmit={handleSubmit} loading={loading} compact={true} />
              </div>
            </aside>

            {/* Mobile sidebar drawer */}
            {sidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-30 flex">
                <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                <div className="relative ml-auto w-80 max-w-[90vw] bg-brand-navy-light h-full overflow-y-auto p-5 border-l border-brand-navy-lighter">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-white">Adjust Preferences</p>
                    <button onClick={() => setSidebarOpen(false)} className="text-brand-slate hover:text-white text-xl leading-none">×</button>
                  </div>
                  <PreferenceForm onSubmit={handleSubmit} loading={loading} compact={true} />
                </div>
              </div>
            )}

            {/* Results */}
            <div className="flex-1 min-w-0">
              <ResultsPanel
                data={results}
                preferences={preferences}
                onReset={handleReset}
                onAdjust={() => setSidebarOpen(true)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
