import { useState } from "react";

export function VideoDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="relative aspect-video rounded-xl overflow-hidden cursor-pointer" onClick={() => setIsOpen(true)}>
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <div className="rounded-full bg-white/90 p-4">
              <svg
                className="w-12 h-12 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 5v10l8-5-8-5z" />
              </svg>
            </div>
          </div>
          <img
            src="/placeholder-video.jpg"
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-4xl" onClick={e => e.stopPropagation()}>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/your-video-id"
                  title="Product Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
