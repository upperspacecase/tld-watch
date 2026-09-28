"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { TLDS, type Tld } from "@/lib/tlds";

function tldFromParam(value: string | null): Tld {
  const cleaned = (value ?? "").replace(/^\./, "").toLowerCase();
  return (TLDS as readonly string[]).includes(cleaned) ? (cleaned as Tld) : "shop";
}

export function SignupForm() {
  const params = useSearchParams();
  const [tld, setTld] = useState<Tld>(() => tldFromParam(params.get("tld")));
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState("sending");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, tld }),
    });
    if (!res.ok) {
      setState("error");
      return;
    }
    localStorage.setItem("tld_watch_signup", JSON.stringify({ email, tld }));
    setState("done");
  }

  if (state === "done") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-white/40 bg-white/60 p-6 shadow-[0_8px_32px_rgba(37,99,235,0.08)] backdrop-blur-xl"
      >
        <p className="text-base font-semibold">You are watching .{tld}.</p>
        <p className="mt-1 text-base text-slate-600">
          We will email {email} the minute the .{tld} canaries stop resolving from more than one vantage point.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/40 bg-white/60 p-4 shadow-[0_8px_32px_rgba(37,99,235,0.08)] backdrop-blur-xl sm:p-5"
    >
      <fieldset className="flex flex-wrap gap-2">
        <legend className="mb-2 text-base text-slate-600">Which TLD are your client stores on?</legend>
        {TLDS.map((t) => {
          const active = t === tld;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={active}
              onClick={() => setTld(t)}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-base font-medium transition-colors duration-200 ${
                active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white/70 text-slate-700 hover:border-slate-500"
              }`}
            >
              .{t}
            </button>
          );
        })}
      </fieldset>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@agency.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 sm:flex-1 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="h-12 cursor-pointer rounded-xl bg-accent px-6 text-base font-semibold text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70"
        >
          {state === "sending" ? "Saving" : "Start watching my TLDs"}
        </button>
      </div>

      {state === "error" && (
        <p role="alert" className="mt-3 text-base text-red-700">
          That did not save. Check the email address and try again.
        </p>
      )}
      <p className="mt-3 text-base text-slate-500">No account, no password, no site URL. Email plus one TLD.</p>
    </form>
  );
}
