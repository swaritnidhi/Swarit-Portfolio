
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
        setError(data.error || "Incorrect password. Try again.");
        return;
      }

      window.location.href = "/";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b12] px-5 py-12 text-white">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-violet-500/10 blur-[130px]" />

      <div className="relative w-full max-w-2xl">
        <header className="mb-16 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight text-white/80">
            PORTFOLIO
          </span>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-[10px] font-medium tracking-widest text-emerald-300">
              UPGRADING
            </span>
          </div>
        </header>

        <section className="rounded-[28px] border border-white/[0.09] bg-white/[0.035] p-7 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-12">
          <div className="mb-9 flex items-center gap-2">
            <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-[10px] font-semibold tracking-wider text-blue-300">
              A LITTLE UPDATE
            </span>
            <span className="text-xs text-white/30">·</span>
            <span className="text-xs text-white/40">Better things ahead</span>
          </div>

          <div className="mb-8">
            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-blue-400/20 to-violet-500/20 text-3xl">
              ✨
            </div>

            <h1 className="text-4xl font-semibold leading-[1.12] tracking-tight sm:text-6xl">
              Making things
              <br />
              <span className="bg-gradient-to-r from-blue-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
                a little better.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/50 sm:text-base">
              This site is taking a short break while we work on something
              new. A few improvements, some fresh ideas, and a little
              behind-the-scenes magic.
            </p>
          </div>

          <div className="mb-9 rounded-2xl border border-white/[0.07] bg-black/20 p-4">
            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="text-white/60">Current status</span>
              <span className="text-blue-300">In progress</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-violet-400" />
            </div>

            <p className="mt-3 text-[11px] text-white/30">
              Good things take a little time. Thanks for your patience.
            </p>
          </div>

          <div className="border-t border-white/[0.08] pt-7">
            <p className="mb-3 text-xs font-medium tracking-wide text-white/60">
              HAVE PRIVATE ACCESS?
            </p>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter preview password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/10"
              />

              {error && (
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#080b12] transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Checking access..." : "Open private preview"}
                {!loading && <span aria-hidden="true">↗</span>}
              </button>
            </form>
          </div>
        </section>

        <footer className="mt-7 flex flex-col items-center justify-between gap-3 text-[11px] text-white/25 sm:flex-row">
          <span>© {new Date().getFullYear()} · Thanks for stopping by.</span>
          <span>Built with care, updated with purpose.</span>
        </footer>
      </div>
    </main>
  );
}
