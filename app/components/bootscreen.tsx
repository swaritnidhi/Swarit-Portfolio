
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
    const timers: number[] = [];

    bootMessages.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          setVisibleLines(index + 1);
          setProgress((index + 1) * 25);
        }, 500 + index * 700)
      );
    });

    const finish = window.setTimeout(() => {
      onCompleteRef.current();
    }, 3900);

    return () => {
      timers.forEach(window.clearTimeout);
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

        {/* Terminal messages */}
        <div className="boot-terminal">
          {bootMessages.slice(0, visibleLines).map((message, index) => (
            <div className="boot-line" key={message}>
              <span className="boot-prompt">&gt;</span> {message}
              {index === visibleLines - 1 &&
                visibleLines !== bootMessages.length && (
                  <span className="boot-cursor" />
                )}
            </div>
          ))}

          {visibleLines === bootMessages.length && (
            <div className="boot-success">SYSTEM READY</div>
          )}
        </div>

        {/* Dedicated progress section */}
        <div className="boot-progress-section">
          <div className="boot-progress-info">
            <span>INITIALIZING SYSTEM</span>
            <span>{progress}%</span>
          </div>

          <div
            className="boot-progress-track"
            role="progressbar"
            aria-label="System initialization"
            aria-valuemin={0}
            aria-valueMax={100}
            aria-valuenow={progress}
          >
            <div
              className="boot-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="boot-status">
            <span className="boot-status-dot" />
            <span>
              {progress === 100 ? "SYSTEM READY" : "PLEASE WAIT..."}
            </span>
          </div>
        </div>
      </div>

      <div className="boot-footer">
        PERSONAL SYSTEM <span>·</span> 2026
      </div>
    </div>
  );
}
