import React from "react";
import CarCard from "./CarCard";

export default function ResultsPanel({ data, preferences, onReset, onAdjust }) {
  if (!data) return null;

  const { results, totalSearched, matchedCount, message } = data;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="text-xl font-bold text-white">Your Shortlist</h2>
          <p className="text-xs text-brand-slate mt-1">
            {results.length > 0
              ? `${results.length} cars matched · from ${totalSearched} in database`
              : `Searched ${totalSearched} cars — no matches`}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {/* Mobile adjust — desktop has sidebar */}
          <button
            onClick={onAdjust}
            className="lg:hidden btn-secondary text-xs py-1.5 px-3"
          >
            ⚙️ Adjust
          </button>
          <button onClick={onReset} className="btn-secondary text-xs py-1.5 px-3">
            ← New search
          </button>
        </div>
      </div>

      {/* Active preferences summary */}
      <div className="flex flex-wrap gap-1.5 mb-5 p-3 bg-brand-navy-light rounded-xl border border-brand-navy-lighter">
        <span className="text-xs text-brand-slate self-center mr-1">Showing for:</span>
        <span className="text-xs bg-brand-navy px-2 py-0.5 rounded text-slate-300">₹{preferences.budget}L</span>
        <span className="text-xs bg-brand-navy px-2 py-0.5 rounded text-slate-300">👥 {preferences.familySize}</span>
        <span className="text-xs bg-brand-navy px-2 py-0.5 rounded text-slate-300 capitalize">
          {preferences.fuelPreference === "any" ? "Any fuel" : preferences.fuelPreference}
        </span>
        <span className="text-xs bg-brand-navy px-2 py-0.5 rounded text-slate-300 capitalize">
          {preferences.dailyUsage.replace("-", " ")}
        </span>
        {Object.entries(preferences.priorities)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 2)
          .map(([k, v]) => (
            <span key={k} className="text-xs bg-brand-teal/10 text-brand-teal border border-brand-teal/20 px-2 py-0.5 rounded capitalize">
              {k} ×{v}
            </span>
          ))}
      </div>

      {/* No results */}
      {results.length === 0 && (
        <div className="text-center py-16 card">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-white mb-2">No matches found</h3>
          <p className="text-brand-slate text-sm max-w-sm mx-auto">{message}</p>
          <button onClick={onReset} className="btn-primary mt-6 text-sm">
            Try Different Preferences
          </button>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          {results.map(result => (
            <CarCard key={result.car.id} result={result} rank={result.rank} />
          ))}
          <p className="text-center text-xs text-brand-slate pt-4 pb-2">
            Scores reflect your stated priorities. Always test drive your top picks.
          </p>
        </div>
      )}
    </div>
  );
}
