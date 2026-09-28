import { Suspense } from "react";
import { DemoPlayer } from "@/components/DemoPlayer";
import { Footer } from "@/components/Footer";
import { LogoStrip } from "@/components/LogoStrip";
import { SignupForm } from "@/components/SignupForm";
import { SHOP_THREAD } from "@/lib/tlds";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 15% 10%, rgba(37,99,235,0.14) 0%, rgba(37,99,235,0) 70%), radial-gradient(50% 45% at 90% 80%, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0) 70%)",
          }}
        />
        <div className="mx-auto w-full max-w-5xl px-6 pb-12 pt-20 sm:pt-28">
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
            When a client&apos;s .shop store goes dark, know within minutes whether every .shop store went dark with it.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-slate-600 sm:text-lg">
            For agencies and WooCommerce hosts with client stores on .shop, .space, .club and .store: stop flipping DNS between Cloudflare and Namecheap for three hours when the fault is inside the registry zone.
          </p>
          <div className="mt-8 max-w-2xl">
            <Suspense fallback={null}>
              <SignupForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section aria-label="Product demo" className="mx-auto w-full max-w-5xl px-6 pb-6 pt-4">
        <div className="overflow-hidden rounded-2xl border border-white/40 bg-white/60 p-2 shadow-[0_8px_32px_rgba(37,99,235,0.10)] backdrop-blur-xl">
          <div className="overflow-hidden rounded-xl">
            <DemoPlayer />
          </div>
        </div>
        <p className="mt-3 text-base text-slate-500">
          Simulation. The real .shop fault ran 16:11 to 21:54 UTC on Sept 24, 2026, per GMO Registry&apos;s note in the{" "}
          <a href={SHOP_THREAD} className="cursor-pointer underline transition-colors duration-200 hover:text-slate-900" target="_blank" rel="noreferrer">
            HN thread
          </a>
          . The quote is mehphp&apos;s comment in that thread.
        </p>
      </section>

      <LogoStrip />
      <Footer />
    </main>
  );
}
