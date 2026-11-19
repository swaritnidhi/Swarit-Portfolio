
"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;

        const value =
          scrollable > 0
            ? (window.scrollY / scrollable) * 100
            : 0;

        setProgress(Math.min(100, Math.max(0, value)));
      });
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="website-scroll-progress"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div className="website-scroll-progress-track">
        <div
          className="website-scroll-progress-fill"
          style={{ width: `${progress}%` }}
        />

        <img
    src="/avatar-run.gif"
          alt=""
          aria-hidden="true"
          className="website-scroll-avatar"
          style={{ left: `${progress}%` }}
        />
      </div>
    </div>
  );
}
