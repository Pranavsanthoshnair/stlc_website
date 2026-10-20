"use client";

import { useState } from "react";

interface ModalsProps {
  isRegisterOpen: boolean;
  isExpoOpen: boolean;
  onCloseRegister: () => void;
  onCloseExpo: () => void;
}

// Configure the exact event-specific SnapTicks URL in
// NEXT_PUBLIC_SNAPTICKS_REGISTRATION_URL before deploying.
const SNAPTICKS_REGISTRATION_URL = process.env.NEXT_PUBLIC_SNAPTICKS_REGISTRATION_URL;

// The instructions are shown only to first-year students from SJCET.
// Confirm these event-specific rules with the organisers before publishing.
const FRESHER_INSTRUCTIONS = [
  {
    title: "Complete your registration carefully",
    description:
      "Use your own active email address and phone number. Enter your details accurately on SnapTicks.",
  },
  {
    title: "Choose the correct participant details",
    description:
      "Select the appropriate event options and verify your information before submitting the form.",
  },
  {
    title: "Follow event communication",
    description:
      "Keep an eye on your registered email and phone for updates, announcements, and further instructions from the organisers.",
  },
];

export default function Modals({
  isRegisterOpen,
  isExpoOpen,
  onCloseRegister,
  onCloseExpo,
}: ModalsProps) {
  const [registrationStep, setRegistrationStep] = useState<"eligibility" | "instructions">("eligibility");
  const [college, setCollege] = useState<"sjcet" | "non-sjcet" | "">("");
  const [year, setYear] = useState<"1st" | "2nd" | "3rd" | "4th" | "">("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [expoSubmitted, setExpoSubmitted] = useState(false);
  const [expoForm, setExpoForm] = useState({
    teamLead: "",
    email: "",
    projectTitle: "",
    category: "Hardware & IoT",
  });

  const resetRegistration = () => {
    setRegistrationStep("eligibility");
    setCollege("");
    setYear("");
    setAcceptedTerms(false);
    setRegistrationError("");
    onCloseRegister();
  };

  const redirectToSnapTicks = () => {
    if (!SNAPTICKS_REGISTRATION_URL) {
      setRegistrationError(
        "Registration is not configured yet. Please contact the SYNORA organisers for the SnapTicks link."
      );
      return;
    }

    try {
      const destination = new URL(SNAPTICKS_REGISTRATION_URL);
      if (destination.protocol !== "https:" && destination.protocol !== "http:") {
        throw new Error("Unsupported URL protocol");
      }
      window.location.assign(destination.toString());
    } catch {
      setRegistrationError(
        "The SnapTicks registration link appears to be invalid. Please contact the SYNORA organisers."
      );
    }
  };

  const continueRegistration = () => {
    if (!college || !year) return;
    setRegistrationError("");

    if (college === "sjcet" && year === "1st") {
      setRegistrationStep("instructions");
      return;
    }

    redirectToSnapTicks();
  };

  const acceptAndRegister = () => {
    if (!acceptedTerms) return;
    setRegistrationError("");
    redirectToSnapTicks();
  };

  const handleExpoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExpoSubmitted(true);
  };

  return (
    <>
      {/* REGISTRATION MODAL */}
      {isRegisterOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) resetRegistration();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-modal-title"
            className="relative w-full max-w-sm sm:max-w-md bg-[#1F0E05] rounded-3xl p-5 sm:p-8 md:p-9 shadow-2xl border-2 border-[#B85D2A]/30 text-center max-h-[calc(100dvh-2rem)] overflow-y-auto"
          >
            <button
              onClick={resetRegistration}
              type="button"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6F0] flex items-center justify-center text-sm transition-colors cursor-pointer"
              aria-label="Close registration"
            >
              ✕
            </button>

            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#B85D2A]/20 border border-[#B85D2A]/30 flex items-center justify-center mx-auto mb-4">
              {registrationStep === "eligibility" ? (
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#E8C5A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#E8C5A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5-1a8 8 0 11-16 0 8 8 0 0116 0z" />
                </svg>
              )}
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#B85D2A]/20 text-[#E8C5A8] border border-[#B85D2A]/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 sm:mb-4">
              SYNORA 2026 · Registration
            </div>

            {registrationStep === "eligibility" ? (
              <>
                <h3 id="registration-modal-title" className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-[#FAF6F0] uppercase tracking-tight leading-tight mb-2">
                  Let&apos;s Get You Registered
                </h3>
                <p className="text-xs sm:text-sm text-[#A88C78] leading-relaxed mb-6">
                  Tell us a little about yourself so we can guide you to the right registration process.
                </p>

                <div className="space-y-5 text-left">
                  <fieldset>
                    <legend className="text-xs font-bold uppercase tracking-wider text-[#E8C5A8] mb-2.5">
                      Which college are you from?
                    </legend>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        aria-pressed={college === "sjcet"}
                        onClick={() => setCollege("sjcet")}
                        className={`rounded-xl border px-3 py-3 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C5A8] ${college === "sjcet" ? "border-[#E8C5A8] bg-[#E8C5A8]/15 text-[#FAF6F0] shadow-[0_0_0_1px_#E8C5A8]" : "border-[#B85D2A]/30 bg-[#3E1C0D]/60 text-[#A88C78] hover:border-[#E8C5A8]/60 hover:text-[#FAF6F0]"}`}
                      >
                        <span className="block text-base">SJCET</span>
                        <span className="block text-[10px] font-medium opacity-70 mt-1">St. Joseph&apos;s College</span>
                      </button>
                      <button
                        type="button"
                        aria-pressed={college === "non-sjcet"}
                        onClick={() => setCollege("non-sjcet")}
                        className={`rounded-xl border px-3 py-3 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C5A8] ${college === "non-sjcet" ? "border-[#E8C5A8] bg-[#E8C5A8]/15 text-[#FAF6F0] shadow-[0_0_0_1px_#E8C5A8]" : "border-[#B85D2A]/30 bg-[#3E1C0D]/60 text-[#A88C78] hover:border-[#E8C5A8]/60 hover:text-[#FAF6F0]"}`}
                      >
                        <span className="block text-base">Non-SJCET</span>
                        <span className="block text-[10px] font-medium opacity-70 mt-1">All other colleges</span>
                      </button>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-xs font-bold uppercase tracking-wider text-[#E8C5A8] mb-2.5">
                      Year of study
                    </legend>
                    <div className="grid grid-cols-4 gap-2">
                      {(["1st", "2nd", "3rd", "4th"] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={year === option}
                          onClick={() => setYear(option)}
                          className={`rounded-xl border px-2 py-3 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C5A8] ${year === option ? "border-[#E8C5A8] bg-[#E8C5A8]/15 text-[#FAF6F0] shadow-[0_0_0_1px_#E8C5A8]" : "border-[#B85D2A]/30 bg-[#3E1C0D]/60 text-[#A88C78] hover:border-[#E8C5A8]/60 hover:text-[#FAF6F0]"}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="bg-[#3E1C0D] rounded-2xl px-4 py-3 border border-[#B85D2A]/20 mt-5 mb-5 text-left space-y-1">
                  <p className="text-[10px] text-[#E8C5A8]/60 font-mono uppercase tracking-widest">Event Details</p>
                  <p className="text-xs text-[#FAF6F0] font-semibold">SYNORA 2026 · 2-Day Residential Conference</p>
                  <p className="text-xs text-[#A88C78]">SJCET Palai, Kottayam, Kerala</p>
                </div>

                {registrationError && (
                  <p role="alert" className="mt-3 text-xs leading-relaxed text-[#FFA366]">
                    {registrationError}
                  </p>
                )}
                <button
                  type="button"
                  disabled={!college || !year}
                  onClick={continueRegistration}
                  className="w-full bg-[#E8C5A8] hover:bg-[#DDB896] disabled:bg-[#6F5747] disabled:text-[#D0BFB1] disabled:cursor-not-allowed text-[#2B1408] font-heading font-black py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider border-2 border-[#2B1408] active:scale-[.98] transition-all cursor-pointer"
                >
                  Continue to Registration <span aria-hidden="true">→</span>
                </button>
                <p className="text-[10px] text-[#A88C78]/80 mt-3">
                  Your selection determines whether extra first-year instructions are required.
                </p>
              </>
            ) : (
              <>
                <h3 id="registration-modal-title" className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-[#FAF6F0] uppercase tracking-tight leading-tight mb-2">
                  Before You Register
                </h3>
                <p className="text-xs sm:text-sm text-[#A88C78] leading-relaxed mb-5">
                  A few important things to review before continuing to SnapTicks.
                </p>

                <div className="space-y-3 text-left mb-5">
                  {FRESHER_INSTRUCTIONS.map((instruction, index) => (
                    <div key={instruction.title} className="flex gap-3 rounded-xl border border-[#B85D2A]/20 bg-[#3E1C0D]/70 p-3.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#B85D2A]/20 text-[11px] font-black text-[#E8C5A8]">
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-[#FAF6F0]">{instruction.title}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-[#A88C78]">{instruction.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <label className="flex items-start gap-3 rounded-xl border border-[#B85D2A]/30 bg-[#3E1C0D]/60 p-3.5 text-left cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) => setAcceptedTerms(event.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#E8C5A8] cursor-pointer"
                  />
                  <span className="text-xs leading-relaxed text-[#E8C5A8]">
                    I have read and understood the instructions above and agree to follow the registration requirements and event guidelines.
                  </span>
                </label>

                {registrationError && (
                  <p role="alert" className="mt-3 text-xs leading-relaxed text-[#FFA366]">
                    {registrationError}
                  </p>
                )}
                <button
                  type="button"
                  disabled={!acceptedTerms}
                  onClick={acceptAndRegister}
                  className="mt-5 w-full bg-[#E8C5A8] hover:bg-[#DDB896] disabled:bg-[#6F5747] disabled:text-[#D0BFB1] disabled:cursor-not-allowed text-[#2B1408] font-heading font-black py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider border-2 border-[#2B1408] active:scale-[.98] transition-all cursor-pointer"
                >
                  Agree &amp; Continue <span aria-hidden="true">→</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRegistrationStep("eligibility");
                    setAcceptedTerms(false);
                  }}
                  className="mt-3 w-full py-2 text-xs font-bold uppercase tracking-wider text-[#A88C78] hover:text-[#FAF6F0] transition-colors"
                >
                  Back
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* PROJECT EXPO MODAL */}
      {isExpoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm sm:max-w-md bg-[#1F0E05] rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl border-2 border-[#B85D2A]/30 text-center max-h-[calc(100dvh-2rem)] overflow-y-auto">
            <button
              onClick={onCloseExpo}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6F0] flex items-center justify-center text-sm transition-colors cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#B85D2A]/20 border border-[#B85D2A]/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#E8C5A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

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
    </>
  );
}
