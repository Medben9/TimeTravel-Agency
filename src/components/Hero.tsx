import { useState } from 'react';
import { Compass, MessageCircle } from 'lucide-react';

type HeroProps = {
  onOpenChat: () => void;
};

function Hero({ onOpenChat }: HeroProps) {
  const [showVideo, setShowVideo] = useState(true);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <div className="hero-animated-bg absolute inset-0" />
      {showVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setShowVideo(false)}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        >
          <source src="/assets/destinations/Time%20Travel%20Agency.mp4" type="video/mp4" />
        </video>
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-300/10 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl fade-in">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300/80">TimeTravel Agency</p>
          <h1 className="font-serif text-4xl font-bold leading-tight text-slate-50 sm:text-5xl lg:text-6xl">
            Travel Beyond Time
          </h1>
          <p className="max-w-xl text-lg text-slate-300">Luxury time travel platform</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <a
              href="#destinations"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-amber-300"
            >
              <Compass size={16} />
              Explore Destinations
            </a>
            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-amber-300/60 px-6 py-3 text-sm font-semibold text-amber-200 transition duration-200 hover:bg-amber-300/10"
            >
              <MessageCircle size={16} />
              Talk to AI Guide
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
