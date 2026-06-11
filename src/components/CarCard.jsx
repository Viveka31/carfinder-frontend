import React, { useState } from "react";

const FUEL_ICONS = {
  petrol: "⛽", diesel: "🛢️", electric: "⚡", hybrid: "🔋", cng: "💨",
};
const BODY_ICONS = {
  hatchback: "🚗", sedan: "🚙", suv: "🛻", muv: "🚐", coupe: "🏎️",
};
const SCORE_COLOR = (s) => {
  if (s >= 80) return "text-emerald-400";
  if (s >= 65) return "text-brand-teal";
  if (s >= 50) return "text-yellow-400";
  return "text-slate-400";
};
const SCORE_RING = (s) => {
  if (s >= 80) return "stroke-emerald-400";
  if (s >= 65) return "stroke-brand-teal";
  if (s >= 50) return "stroke-yellow-400";
  return "stroke-slate-400";
};
const SCORE_LABEL = (s) => {
  if (s >= 80) return "Excellent match";
  if (s >= 65) return "Great match";
  if (s >= 50) return "Good match";
  return "Partial match";
};

function ScoreCircle({ score }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#2E3D56" strokeWidth="5" />
        <circle
          cx="40" cy="40" r={r} fill="none"
          strokeWidth="5"
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeLinecap="round"
          strokeDashoffset={circ / 4}
          className={`transition-all duration-700 ${SCORE_RING(score)}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-xl font-bold leading-none ${SCORE_COLOR(score)}`}>{score}</span>
        <span className="text-xs text-brand-slate">/ 100</span>
      </div>
    </div>
  );
}

function BreakdownBar({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-brand-slate w-20 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-brand-navy rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-teal rounded-full transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs text-slate-400 w-8 text-right">{value}</span>
    </div>
  );
}

export default function CarCard({ result, rank }) {
  const [expanded, setExpanded] = useState(false);
  const { car, score, breakdown, explanation } = result;

  const isTopPick = rank === 1;

  return (
    <div className={`card p-5 animate-slide-up transition-all duration-200 hover:border-brand-navy-lighter ${
      isTopPick ? "ring-1 ring-brand-teal/50 bg-gradient-to-br from-brand-navy-light to-brand-teal/5" : ""
    }`}>
      {/* Top badge */}
      {isTopPick && (
        <div className="inline-flex items-center gap-1.5 bg-brand-teal/20 text-brand-teal text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-brand-teal/30">
          ⭐ Top Pick for You
        </div>
      )}

      {/* Header row */}
      <div className="flex gap-4">
        {/* Car image */}
        <div className="w-28 h-20 rounded-xl overflow-hidden bg-brand-navy shrink-0 flex items-center justify-center">
          {car.imageUrl ? (
            <img
              src={car.imageUrl}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover"
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
            />
          ) : null}
          <div className="text-4xl hidden items-center justify-center w-full h-full">
            {BODY_ICONS[car.bodyType] || "🚗"}
          </div>
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-white text-base leading-tight">
                {car.make} {car.model}
              </h3>
              <p className="text-xs text-brand-slate mt-0.5">{car.variant} · {car.year}</p>
            </div>
            <div className="shrink-0">
              <ScoreCircle score={score} />
            </div>
          </div>

          {/* Pills row */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="bg-brand-navy text-brand-teal text-xs font-semibold px-2 py-0.5 rounded-md border border-brand-teal/30">
              ₹{car.price}L
            </span>
            <span className="bg-brand-navy text-slate-300 text-xs px-2 py-0.5 rounded-md border border-brand-navy-lighter capitalize">
              {FUEL_ICONS[car.fuelType]} {car.fuelType}
            </span>
            <span className="bg-brand-navy text-slate-300 text-xs px-2 py-0.5 rounded-md border border-brand-navy-lighter capitalize">
              {BODY_ICONS[car.bodyType]} {car.bodyType}
            </span>
            <span className="bg-brand-navy text-slate-300 text-xs px-2 py-0.5 rounded-md border border-brand-navy-lighter">
              👥 {car.seatingCapacity} seats
            </span>
          </div>
        </div>
      </div>

      {/* Score label */}
      <div className={`text-xs font-medium mt-3 ${SCORE_COLOR(score)}`}>
        {SCORE_LABEL(score)}
      </div>

      {/* Key specs row */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="bg-brand-navy rounded-lg p-2 text-center">
          <div className="text-brand-teal font-bold text-sm">
            {car.fuelType === "electric" ? `${car.specs.mileage}km` : `${car.specs.mileage}km/L`}
          </div>
          <div className="text-xs text-brand-slate mt-0.5">
            {car.fuelType === "electric" ? "Range" : "Mileage"}
          </div>
        </div>
        <div className="bg-brand-navy rounded-lg p-2 text-center">
          <div className="text-brand-teal font-bold text-sm">{car.specs.powerBhp} bhp</div>
          <div className="text-xs text-brand-slate mt-0.5">Power</div>
        </div>
        <div className="bg-brand-navy rounded-lg p-2 text-center">
          <div className="text-brand-teal font-bold text-sm">{"★".repeat(Math.round(car.ratings.safety))}</div>
          <div className="text-xs text-brand-slate mt-0.5">Safety</div>
        </div>
      </div>

      {/* Expand/collapse */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full mt-4 flex items-center justify-between text-sm text-brand-slate hover:text-white transition-colors py-2 border-t border-brand-navy-lighter"
      >
        <span>{expanded ? "Hide details" : "Why this car? + Score breakdown"}</span>
        <span className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>▾</span>
      </button>

      {expanded && (
        <div className="mt-3 space-y-4 animate-fade-in">
          {/* Score breakdown */}
          <div>
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-wider mb-2">Score Breakdown</p>
            <div className="space-y-2">
              <BreakdownBar label="Budget fit" value={breakdown.budget} />
              <BreakdownBar label="Safety" value={breakdown.safety} />
              <BreakdownBar label="Mileage" value={breakdown.mileage} />
              <BreakdownBar label="Comfort" value={breakdown.comfort} />
              <BreakdownBar label="Performance" value={breakdown.performance} />
            </div>
          </div>

          {/* Explanation */}
          <div>
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-wider mb-2">Why We Picked This</p>
            <ul className="space-y-1.5">
              {explanation.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-brand-teal mt-0.5 shrink-0">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlights */}
          {car.highlights?.length > 1 && (
            <div>
              <p className="text-xs font-semibold text-brand-slate uppercase tracking-wider mb-2">Highlights</p>
              <div className="flex flex-wrap gap-2">
                {car.highlights.map((h, i) => (
                  <span key={i} className="text-xs bg-brand-teal/10 text-brand-teal border border-brand-teal/20 px-2 py-1 rounded-lg">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
