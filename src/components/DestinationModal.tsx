import { CalendarRange, MapPin } from 'lucide-react';
import { Destination } from '../types/destination';

type DestinationModalProps = {
  destination: Destination;
  onClose: () => void;
  onBook: () => void;
};

function DestinationModal({ destination, onClose, onBook }: DestinationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-slate-950/70 fade-in">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl font-semibold text-slate-50">{destination.title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-600 px-2 py-1 text-sm text-slate-300 transition duration-200 hover:border-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>

        <img
          src={destination.image}
          alt={destination.title}
          loading="lazy"
          className="mt-4 h-40 w-full rounded-lg border border-slate-700 object-cover"
        />

        <p className="mt-4 text-slate-300">{destination.description}</p>

        <div className="mt-3 space-y-1 text-sm">
          <p className="inline-flex items-center gap-2 text-amber-200/90">
            <MapPin size={16} />
            {destination.period}
          </p>
          <p className="inline-flex items-center gap-2 text-slate-300">
            <CalendarRange size={16} />
            Starting from {destination.startingPrice}
          </p>
        </div>

        <button
          type="button"
          onClick={onBook}
          className="mt-6 rounded-md bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-amber-300"
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default DestinationModal;
