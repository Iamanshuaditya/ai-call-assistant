export function Testimonials() {
  const testimonials = [
    {
      content: "This platform has completely transformed how we operate. The efficiency gains are remarkable.",
      author: "Sarah Johnson",
      role: "CEO, TechCorp",
    },
    {
      content: "The best investment we've made for our business. Customer support is outstanding.",
      author: "Michael Chen",
      role: "CTO, InnovateLabs",
    },
    {
      content: "Incredible value for money. We've seen a 300% ROI since implementing this solution.",
      author: "Emily Rodriguez",
      role: "Operations Director, GrowthCo",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
          What Our Customers Say
        </h2>
        <div className="flex flex-nowrap overflow-hidden">
          <div className="animate-marquee flex">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="flex-none w-96 p-6 mx-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <p className="font-semibold dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
