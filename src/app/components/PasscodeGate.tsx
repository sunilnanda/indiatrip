"use client";

import { useState, useEffect, useRef } from "react";

const PASSCODE = "3624";

export default function PasscodeGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("unlocked") === "true") {
      setUnlocked(true);
    }
    setChecked(true);
  }, []);

  useEffect(() => {
    if (checked && !unlocked) {
      inputsRef.current[0]?.focus();
    }
  }, [checked, unlocked]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const digit = value.slice(-1);
    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);
    setError(false);

    if (digit && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }

    if (digit && index === 3) {
      const entered = newCode.join("");
      if (entered === PASSCODE) {
        sessionStorage.setItem("unlocked", "true");
        setUnlocked(true);
      } else {
        setError(true);
        setTimeout(() => {
          setCode(["", "", "", ""]);
          inputsRef.current[0]?.focus();
        }, 500);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  if (!checked) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1e3a5f] to-[#0f1f33] px-4">
      <div className="bg-white/[0.07] backdrop-blur-xl rounded-3xl p-8 sm:p-12 text-center border border-white/10 shadow-2xl w-full max-w-sm">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-white text-xl sm:text-2xl font-semibold mb-2">
          India Trip Planner
        </h1>
        <p className="text-white/50 text-sm mb-8">
          Enter passcode to continue
        </p>
        <div className="flex gap-3 justify-center" role="group" aria-label="Passcode input">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputsRef.current[i] = el; }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`Digit ${i + 1}`}
              className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl sm:text-3xl font-bold rounded-xl bg-white/[0.08] text-white outline-none transition-all caret-white/50 ${
                error
                  ? "border-2 border-red-500 focus:ring-2 focus:ring-red-500/30"
                  : digit
                    ? "border-2 border-white/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    : "border-2 border-white/15 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              }`}
            />
          ))}
        </div>
        {error && (
          <p className="text-red-400 text-sm mt-4 animate-shake" role="alert">
            Incorrect passcode
          </p>
        )}
      </div>
    </div>
  );
}
