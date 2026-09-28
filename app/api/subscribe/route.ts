import { TLDS, type Tld } from "@/lib/tlds";

export async function POST(req: Request) {
  const body = (await req.json()) as { email?: unknown; tld?: unknown };
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const tld = body.tld as Tld;

  if (!email.includes("@") || !TLDS.includes(tld)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const record = { event: "signup", email, tld, at: new Date().toISOString() };
  console.log(JSON.stringify(record));

  const webhook = process.env.SIGNUP_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(record),
    });
  }

  return Response.json({ ok: true });
}
