import Link from "next/link";
import { SHOP_THREAD, SPACE_THREAD } from "@/lib/tlds";

const linkClass = "cursor-pointer text-base text-slate-600 transition-colors duration-200 hover:text-slate-900";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl border-t border-slate-200 px-6 py-8">
      <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
        <Link href="/privacy" className={linkClass}>
          Privacy
        </Link>
        <Link href="/terms" className={linkClass}>
          Terms
        </Link>
        <a href={SHOP_THREAD} className={linkClass} target="_blank" rel="noreferrer">
          .shop thread on HN
        </a>
        <a href={SPACE_THREAD} className={linkClass} target="_blank" rel="noreferrer">
          .space thread on HN
        </a>
      </nav>
    </footer>
  );
}
