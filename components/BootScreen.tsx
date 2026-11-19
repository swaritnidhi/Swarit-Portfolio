
"use client";

import { useEffect, useRef, useState } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

const bootMessages = [
  "Initializing personal system...",
  "Loading creative modules...",
  "Preparing portfolio interface...",
  "All systems operational.",
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timers = bootMessages.map((_, index) =>
      window.setTimeout(() => {
        setVisibleLines(index + 1);
      }, 450 + index * 650)
    );

    const progressTimer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 1, 100));
    }, 30);

    const finish = window.setTimeout(() => {
      onCompleteRef.current();
    }, 3500);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearInterval(progressTimer);
      window.clearTimeout(finish);
    };
  }, []);

  return (
    <div className="boot-screen">
      <div className="boot-logo">
        SWARIT <span>NI</span>DHI
      </div>

      <div className="boot-window">
        <div className="boot-header">
          <div className="boot-dots">
            <span />
            <span />
            <span />
          </div>

          <span className="boot-title">SWARIT.OS</span>
          <span className="boot-version">SYSTEM v1.0</span>
        </div>

        <div className="boot-terminal" aria-live="polite">
          {bootMessages.slice(0, visibleLines).map((message, index) => (
            <div className="boot-line" key={message}>
              <span className="boot-prompt">&gt;</span> {message}
              {index === visibleLines - 1 && progress < 100 && (
                <span className="boot-cursor" />
              )}
            </div>
          ))}

          {visibleLines === bootMessages.length && (
            <div className="boot-success">SYSTEM READY</div>
          )}
        </div>

        <div className="boot-progress-section">
          <div className="boot-progress-info">
            <span>INITIALIZING SYSTEM</span>
            <span>{progress}%</span>
          </div>

          <div
            className="boot-progress-track"
            role="progressbar"
            aria-label="Portfolio loading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="boot-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="boot-status">
            <span className="boot-status-dot" />
            {progress === 100 ? "ALL SYSTEMS OPERATIONAL" : "PLEASE WAIT..."}
          </div>
        </div>
      </div>

    
<div className="boot-footer">
  PERSONAL SYSTEM · 2026
</div>

    </div>
  );
}
