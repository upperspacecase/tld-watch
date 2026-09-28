import Link from "next/link";

export default function Privacy() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-tight">Privacy</h1>
      <p className="mt-6 text-base text-slate-600">
        The sign-up form collects one email address and the TLD you chose. That is used to send you outage alerts for that TLD and nothing else. It is not sold or shared.
      </p>
      <Link href="/" className="mt-8 inline-block cursor-pointer text-base underline">
        Back
      </Link>
    </main>
  );
}
