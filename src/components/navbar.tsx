import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 h-14 bg-white/75 backdrop-blur-lg z-30 w-full border-b border-slate-200 dark:bg-gray-950/75 dark:border-slate-800">
      <div className="container h-full">
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">YourBrand</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
