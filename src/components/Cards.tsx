import { Destination } from '../types/destination';

type CardsProps = {
  destinations: Destination[];
  onView: (destination: Destination) => void;
};

function Cards({ destinations, onView }: CardsProps) {
  return (
    <section id="destinations" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <h2 className="font-serif text-3xl font-semibold text-slate-50">Destinations</h2>
        <p className="text-slate-300">Choose a curated era to begin your premium journey.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <article
            key={destination.id}
            className="group rounded-2xl border border-slate-700/60 bg-slate-900/60 p-5 shadow-xl shadow-slate-950/30 transition duration-300 hover:-translate-y-1 hover:scale-[1.01]"
          >
            <div className="mb-4 overflow-hidden rounded-lg border border-slate-700/70 bg-slate-800/50">
              <img
                src={destination.image}
                alt={destination.title}
                loading="lazy"
                className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="font-serif text-xl font-semibold text-slate-100">{destination.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{destination.summary}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-amber-200/80">{destination.period}</p>
            <button
              type="button"
              onClick={() => onView(destination)}
              className="mt-5 inline-flex rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-amber-300"
            >
              View
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Cards;
