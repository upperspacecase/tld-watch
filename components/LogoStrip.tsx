const LOGOS = [
  { name: "Cloudflare", className: "font-bold tracking-tight" },
  { name: "Namecheap", className: "font-semibold" },
  { name: "WooCommerce", className: "font-extrabold tracking-tighter" },
  { name: "UptimeRobot", className: "font-medium tracking-wide" },
  { name: "GMO Registry", className: "font-bold uppercase tracking-widest text-[0.85em]" },
  { name: "Hacker News", className: "font-black" },
];

export function LogoStrip() {
  return (
    <section aria-label="Tools involved in past TLD outages" className="mx-auto w-full max-w-5xl px-6 py-14 sm:py-16">
      <p className="text-base text-slate-500">
        The tools agencies were switching between while .space (Sept 2025) and .shop (Sept 24, 2026) were failing inside the registry.
      </p>
      <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 text-xl text-slate-400 sm:text-2xl">
        {LOGOS.map((logo) => (
          <li key={logo.name} className={logo.className}>
            {logo.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
