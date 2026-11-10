"use client";

import { FormEvent, useState } from "react";

export default function MaintenancePage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/preview-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07090e] px-5 py-12 text-white">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-red-900/20 blur-[120px]" />

      <section className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-10">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-lg font-bold text-red-400">
              RD
            </div>
            <span className="text-sm font-semibold tracking-[0.2em] text-white/80">
              RED DRAGON
            </span>
          </div>

          <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-medium tracking-widest text-red-400">
            SYSTEM UPDATE
          </span>
        </div>

        <div className="mb-8">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-7 w-7 text-red-400"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3 4.5 6v5.2c0 4.7 3.2 8.2 7.5 9.8 4.3-1.6 7.5-5.1 7.5-9.8V6L12 3Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.5 12.2 11 13.7l3.8-4"
              />
            </svg>
          </div>

          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-red-400">
            TEMPORARILY OFFLINE
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Something
            <br />
            <span className="text-white/40">is evolving.</span>
          </h1>

          <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
            This portfolio is currently undergoing maintenance and upgrades.
            We&apos;ll be back online soon with something better.
          </p>
        </div>

        <div className="mb-8 h-px w-full bg-white/10" />

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="preview-password"
              className="mb-2 block text-xs font-medium tracking-wider text-white/60"
            >
              PRIVATE PREVIEW ACCESS
            </label>

            <input
              id="preview-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your access password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Verifying access..." : "Access private preview"}
            {!loading && <span aria-hidden="true">→</span>}
          </button>
        </form>

        <p className="mt-8 text-center text-[11px] tracking-wide text-white/25">
          © {new Date().getFullYear()} RED DRAGON · ALL RIGHTS RESERVED
        </p>
      </section>
    </main>
  );
}