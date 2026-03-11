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

  // Don't render anything until we've checked sessionStorage
  if (!checked) return null;

  // Only render children after passcode is verified
  if (unlocked) return <>{children}</>;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1e3a5f 0%, #0f1f33 100%)",
      fontFamily: "var(--font-geist-sans), sans-serif",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        padding: "48px 40px",
        textAlign: "center",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
        <h1 style={{
          color: "#fff",
          fontSize: "24px",
          fontWeight: 600,
          margin: "0 0 8px 0",
        }}>
          India Trip Planner
        </h1>
        <p style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: "14px",
          margin: "0 0 32px 0",
        }}>
          Enter passcode to continue
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
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
              style={{
                width: "56px",
                height: "64px",
                textAlign: "center",
                fontSize: "28px",
                fontWeight: 700,
                border: `2px solid ${error ? "#ef4444" : digit ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"}`,
                borderRadius: "14px",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                outline: "none",
                transition: "all 0.2s",
                caretColor: "transparent",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = error ? "#ef4444" : "#60a5fa";
                e.target.style.boxShadow = `0 0 0 3px ${error ? "rgba(239,68,68,0.2)" : "rgba(96,165,250,0.2)"}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = digit ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)";
                e.target.style.boxShadow = "none";
              }}
            />
          ))}
        </div>
        {error && (
          <p style={{
            color: "#ef4444",
            fontSize: "14px",
            marginTop: "16px",
            animation: "shake 0.3s ease-in-out",
          }}>
            Incorrect passcode
          </p>
        )}
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
