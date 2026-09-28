import Link from "next/link";

export default function Terms() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight">Terms</h1>
      <p className="mt-6 text-base text-slate-600">
        tld_watch is an early prototype. Alerts are best effort and carry no uptime guarantee. You can stop receiving them by replying to any alert email.
      </p>
      <Link href="/" className="mt-8 inline-block cursor-pointer text-base underline">
        Back
      </Link>
    </main>
  );
}
