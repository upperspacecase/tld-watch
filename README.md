# tld_watch

Hypothesis-testing landing page: a public per-TLD status page with canary-based outage alerts for agencies with client stores on new gTLDs.

## Run

```
npm install
npm run dev
```

Deep links preselect the TLD chip: `/?tld=shop`, `/?tld=space`, `/?tld=club`, `/?tld=store`.

## Sign-ups

`POST /api/subscribe` logs each sign-up as a JSON line (`event: "signup"`) to the server log, which Vercel keeps under the deployment's Logs tab. Set `SIGNUP_WEBHOOK_URL` to also forward each sign-up as JSON to a webhook.

## Demo video

The hero demo is a Remotion composition in `remotion/Demo.tsx`, embedded with `@remotion/player`. Preview it standalone with:

```
npx remotion studio remotion/index.ts
```
