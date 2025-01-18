import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Transform Your Business with Our Solutions
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl">
            Empower your business with cutting-edge solutions that drive growth and innovation. Join thousands of satisfied customers who have transformed their operations with our platform.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="#pricing"
              className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get Started
            </Link>
            <Link
              href="#features"
              className="text-lg font-semibold leading-6 text-white hover:text-indigo-300"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#4f46e5,#0ea5e9)]">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:24px_24px]"></div>
      </div>
    </section>
  );
}
