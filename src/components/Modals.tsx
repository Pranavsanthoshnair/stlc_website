"use client";

import { useState, useEffect } from "react";

interface ModalsProps {
  isRegisterOpen: boolean;
  isExpoOpen: boolean;
  onCloseRegister: () => void;
  onCloseExpo: () => void;
}

type College = "SJCET" | "Non-SJCET";
type Year = "1st" | "2nd" | "3rd" | "4th";
type RegStep = "select" | "instructions";

// ─── SJCET 1st-Year Instructions ─────────────────────────────────────────────
// TODO: Replace the placeholder content below with the actual SYNORA 2026
// event-specific rules, eligibility criteria, fees, and deadlines before
// going to production.
const SJCET_FIRST_YEAR_INSTRUCTIONS = [
  {
    heading: "Guidelines for first year SJCETstudents",
    body: "First-year students of SJCET must obtain permission from their respective HODs to attend SYNORA, as 30 and 31 October are working days.Students must ensure that they meet the required attendance percentage to be eligible to attend the event. Obtaining permission from the HOD is the student's own responsibility.Please note: If you register for the event but your HOD does not permit you to attend, the registration fee will not be refunded.",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const SNAPTICKS_URL = "https://discover.snaptiqz.com/event/synora";

function redirectToSnapticks() {
  window.open(SNAPTICKS_URL, "_blank", "noopener,noreferrer");
}

export default function Modals({
  isRegisterOpen,
  isExpoOpen,
  onCloseRegister,
  onCloseExpo,
}: ModalsProps) {
  // ── Registration modal state ──────────────────────────────────────────────
  const [regStep, setRegStep] = useState<RegStep>("select");
  const [college, setCollege] = useState<College | null>(null);
  const [year, setYear] = useState<Year | null>(null);
  const [agreed, setAgreed] = useState(false);

  // Reset all state when the modal is closed
  useEffect(() => {
    if (!isRegisterOpen) {
      setRegStep("select");
      setCollege(null);
      setYear(null);
      setAgreed(false);
    }
  }, [isRegisterOpen]);

  // ── Routing logic ─────────────────────────────────────────────────────────
  function handleContinue() {
    if (!college || !year) return;
    // Path A: SJCET + 1st Year → instructions step
    if (college === "SJCET" && year === "1st") {
      setRegStep("instructions");
    } else {
      // Path B: every other combination → direct SnapTicks redirect
      redirectToSnapticks();
    }
  }

  function handleFinalRegister() {
    if (!agreed) return;
    redirectToSnapticks();
  }

  // ── Project Expo modal state ──────────────────────────────────────────────
  const [expoSubmitted, setExpoSubmitted] = useState(false);
  const [expoForm, setExpoForm] = useState({
    teamLead: "",
    email: "",
    projectTitle: "",
    category: "Hardware & IoT",
  });

  const handleExpoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExpoSubmitted(true);
  };

  const canContinue = college !== null && year !== null;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          REGISTRATION MODAL
      ════════════════════════════════════════════════════════════════════ */}
      {isRegisterOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Registration modal"
        >
          <div className="relative w-full max-w-sm sm:max-w-md bg-[#1F0E05] rounded-3xl shadow-2xl border-2 border-[#B85D2A]/30 max-h-[calc(100dvh-2rem)] overflow-y-auto">

            {/* ── STEP 1: SELECTION ── */}
            {regStep === "select" && (
              <div className="p-5 sm:p-8">
                {/* Close Button */}
                <button
                  onClick={onCloseRegister}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6F0] flex items-center justify-center text-sm transition-colors cursor-pointer z-10"
                  aria-label="Close registration modal"
                >
                  ✕
                </button>

                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#B85D2A]/20 border border-[#B85D2A]/30 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#E8C5A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>

                {/* Badge */}
                <div className="flex justify-center mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-[#B85D2A]/20 text-[#E8C5A8] border border-[#B85D2A]/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    SYNORA 2026 · Registration
                  </span>
                </div>

                <h3 className="font-heading font-black text-xl sm:text-2xl text-[#FAF6F0] uppercase tracking-tight text-center leading-tight mb-1">
                  Register for
                </h3>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-[#E8C5A8] uppercase tracking-tight text-center leading-tight mb-3">
                  SYNORA 2026
                </h3>
                <p className="text-xs sm:text-sm text-[#A88C78] text-center leading-relaxed mb-5">
                  Select your college and year of study to get started.
                </p>


                {/* ── Field A: College ── */}
                <div
                  className="mb-4"
                  role="group"
                  aria-labelledby="college-group-label"
                >
                  <p
                    id="college-group-label"
                    className="text-[10px] text-[#E8C5A8]/60 font-mono uppercase tracking-widest mb-2 text-center"
                  >
                    College
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(["SJCET", "Non-SJCET"] as College[]).map((c) => {
                      const selected = college === c;
                      return (
                        <button
                          key={c}
                          onClick={() => setCollege(c)}
                          aria-pressed={selected}
                          className={`relative rounded-2xl border-2 px-3 py-3.5 flex flex-col items-center gap-1 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C5A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F0E05] ${
                            selected
                              ? "border-[#B85D2A] bg-[#B85D2A]/15 shadow-[0_0_16px_rgba(184,93,42,0.3)]"
                              : "border-[#B85D2A]/25 bg-[#3E1C0D]/60 hover:border-[#B85D2A]/60 hover:bg-[#B85D2A]/10"
                          }`}
                        >
                          {/* Selected dot indicator */}
                          <span
                            className={`absolute top-2 right-2 w-2 h-2 rounded-full transition-colors ${
                              selected ? "bg-[#E8C5A8]" : "bg-white/10"
                            }`}
                          />
                          <svg
                            className={`w-5 h-5 transition-colors ${selected ? "text-[#E8C5A8]" : "text-[#A88C78]"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span
                            className={`font-heading font-black text-xs uppercase tracking-wide transition-colors ${
                              selected ? "text-[#FAF6F0]" : "text-[#A88C78]"
                            }`}
                          >
                            {c}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── Field B: Year of Study ── */}
                <div
                  className="mb-5"
                  role="group"
                  aria-labelledby="year-group-label"
                >
                  <p
                    id="year-group-label"
                    className="text-[10px] text-[#E8C5A8]/60 font-mono uppercase tracking-widest mb-2 text-center"
                  >
                    Year of Study
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {(["1st", "2nd", "3rd", "4th"] as Year[]).map((y) => {
                      const selected = year === y;
                      return (
                        <button
                          key={y}
                          onClick={() => setYear(y)}
                          aria-pressed={selected}
                          className={`rounded-xl border-2 py-2.5 text-xs font-heading font-black uppercase tracking-wide transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C5A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F0E05] ${
                            selected
                              ? "border-[#B85D2A] bg-[#B85D2A]/15 text-[#FAF6F0] shadow-[0_0_12px_rgba(184,93,42,0.25)]"
                              : "border-[#B85D2A]/25 bg-[#3E1C0D]/60 text-[#A88C78] hover:border-[#B85D2A]/60 hover:text-[#FAF6F0] hover:bg-[#B85D2A]/10"
                          }`}
                        >
                          {y}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  onClick={handleContinue}
                  disabled={!canContinue}
                  aria-disabled={!canContinue}
                  className={`w-full font-heading font-black py-2.5 sm:py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider border-2 transition-all ${
                    canContinue
                      ? "bg-[#E8C5A8] hover:bg-[#DDB896] text-[#2B1408] border-[#2B1408] active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(232,197,168,0.2)]"
                      : "bg-[#E8C5A8]/20 text-[#A88C78] border-[#A88C78]/20 cursor-not-allowed"
                  }`}
                >
                  Continue →
                </button>

                {/* Event detail chip */}
                <p className="mt-4 text-center text-[10px] text-[#A88C78]/60 font-mono uppercase tracking-wider">
                  Oct 30–31, 2026 · SJCET Palai, Kottayam
                </p>
              </div>
            )}

            {/* ── STEP 2: INSTRUCTIONS (SJCET + 1st Year only) ── */}
            {regStep === "instructions" && (
              <div className="p-5 sm:p-8">
                {/* Close Button */}
                <button
                  onClick={onCloseRegister}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6F0] flex items-center justify-center text-sm transition-colors cursor-pointer z-10"
                  aria-label="Close registration modal"
                >
                  ✕
                </button>

                {/* Back Button */}
                <button
                  onClick={() => {
                    setRegStep("select");
                    setAgreed(false);
                  }}
                  className="flex items-center gap-1.5 text-[#A88C78] hover:text-[#E8C5A8] text-xs font-semibold transition-colors mb-5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C5A8] rounded"
                  aria-label="Back to college and year selection"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                {/* Badge */}
                <div className="flex justify-center mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-[#B85D2A]/20 text-[#E8C5A8] border border-[#B85D2A]/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    SJCET · 1st Year
                  </span>
                </div>

                <h3 className="font-heading font-black text-xl sm:text-2xl text-[#FAF6F0] uppercase tracking-tight text-center leading-tight mb-1">
                  Before You
                </h3>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-[#E8C5A8] uppercase tracking-tight text-center leading-tight mb-3">
                  Register
                </h3>
                <p className="text-xs text-[#A88C78] text-center leading-relaxed mb-5">
                  Please read the following instructions carefully before proceeding.
                </p>

                {/* Instructions List */}
                <div className="space-y-2 mb-5">
                  {SJCET_FIRST_YEAR_INSTRUCTIONS.map((item, idx) => (
                    <div
                      key={item.heading}
                      className="flex gap-3 bg-[#2B1408] rounded-xl border border-[#B85D2A]/20 px-3.5 py-3 hover:border-[#B85D2A]/40 transition-colors"
                    >
                      {/* Number badge */}
                      <span className="shrink-0 w-5 h-5 rounded-full bg-[#B85D2A]/25 border border-[#B85D2A]/40 text-[#E8C5A8] text-[10px] font-mono font-bold flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-[9px] text-[#E8C5A8]/50 font-mono uppercase tracking-widest mb-0.5">
                          {item.heading}
                        </p>
                        <p className="text-xs text-[#FAF6F0]/90 leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>


                {/* Agreement Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer mb-4 group">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                    }}
                    className="mt-0.5 w-4 h-4 shrink-0 rounded border-[#B85D2A]/50 bg-[#3E1C0D] text-[#B85D2A] accent-[#B85D2A] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C5A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F0E05]"
                    aria-required="true"
                  />
                  <span className="text-xs text-[#A88C78] group-hover:text-[#FAF6F0]/80 transition-colors leading-relaxed">
                    I have read and agree to the above instructions and the applicable terms and conditions.
                  </span>
                </label>

                {/* Final Register Button */}
                <button
                  onClick={handleFinalRegister}
                  disabled={!agreed}
                  aria-disabled={!agreed}
                  className={`w-full font-heading font-black py-2.5 sm:py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider border-2 transition-all ${
                    agreed
                      ? "bg-[#E8C5A8] hover:bg-[#DDB896] text-[#2B1408] border-[#2B1408] active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(232,197,168,0.2)]"
                      : "bg-[#E8C5A8]/20 text-[#A88C78] border-[#A88C78]/20 cursor-not-allowed"
                  }`}
                >
                  Continue →
                </button>

                <p className="mt-4 text-center text-[10px] text-[#A88C78]/60 font-mono uppercase tracking-wider">
                  Oct 30–31, 2026 · SJCET Palai, Kottayam
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          PROJECT EXPO MODAL  — unchanged
      ════════════════════════════════════════════════════════════════════ */}
      {isExpoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm sm:max-w-md bg-[#1F0E05] rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl border-2 border-[#B85D2A]/30 text-center max-h-[calc(100dvh-2rem)] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={onCloseExpo}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6F0] flex items-center justify-center text-sm transition-colors cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Icon */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#B85D2A]/20 border border-[#B85D2A]/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#E8C5A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#B85D2A]/20 text-[#E8C5A8] border border-[#B85D2A]/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4">
              SYNORA 2026 · Project Expo
            </div>

            <h3 className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-[#FAF6F0] uppercase tracking-tight leading-tight mb-3">
              Registrations<br />Opening Soon
            </h3>

            <p className="text-xs sm:text-sm text-[#A88C78] leading-relaxed mb-5 sm:mb-6">
              Project Expo registration for SYNORA 2026 will open shortly. Review the guidelines and stay tuned for the submission portal announcement.
            </p>

            <div className="bg-[#3E1C0D] rounded-2xl px-4 py-3 sm:px-5 sm:py-4 border border-[#B85D2A]/20 mb-5 sm:mb-6 text-left space-y-1">
              <p className="text-[10px] text-[#E8C5A8]/50 font-mono uppercase tracking-widest">Competition Details</p>
              <p className="text-xs text-[#FAF6F0] font-semibold">SYNORA 2026 · Hardware Project Expo</p>
              <p className="text-xs text-[#A88C78]">Total Prize Pool: ₹15,000/- · SJCET Palai</p>
            </div>

            <div className="space-y-3">
              <a
                href="https://drive.google.com/file/d/1tEGeEfOEEJVMwRdlByApqYHThNH9IbQh/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block bg-transparent hover:bg-white/5 text-[#E8C5A8] border border-[#B85D2A]/40 font-heading font-bold py-2 sm:py-2.5 rounded-full text-xs uppercase tracking-wider transition-colors"
              >
                View Expo Guidance ↗
              </a>
              <button
                onClick={onCloseExpo}
                className="w-full bg-[#E8C5A8] hover:bg-[#DDB896] text-[#2B1408] font-heading font-black py-2.5 sm:py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider border-2 border-[#2B1408] active:scale-95 transition-all cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suppress unused state warning for expo form (kept for future use) */}
      {expoSubmitted && expoForm && null}
    </>
  );
}
