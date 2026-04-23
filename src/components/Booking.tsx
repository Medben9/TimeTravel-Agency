import { FormEvent, useState } from 'react';
import { CalendarCheck2 } from 'lucide-react';

type BookingProps = {
  destinations: string[];
};

type BookingFormState = {
  name: string;
  email: string;
  destination: string;
  startDate: string;
  endDate: string;
};

type BookingFeedback = {
  kind: 'success' | 'error';
  message: string;
};

function Booking({ destinations }: BookingProps) {
  const initialState: BookingFormState = {
    name: '',
    email: '',
    destination: destinations[0],
    startDate: '',
    endDate: '',
  };

  const [formState, setFormState] = useState<BookingFormState>(initialState);
  const [feedback, setFeedback] = useState<BookingFeedback | null>(null);

  const updateField = (field: keyof BookingFormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const hasInvalidDateRange =
    Boolean(formState.startDate) && Boolean(formState.endDate) && formState.endDate < formState.startDate;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (hasInvalidDateRange) {
      setFeedback({ kind: 'error', message: 'End date must be on or after the start date.' });
      return;
    }

    setFeedback({
      kind: 'success',
      message: `Booking request sent for ${formState.name || 'guest'} to ${formState.destination} (${formState.startDate} to ${formState.endDate}).`,
    });
    setFormState(initialState);
  };

  return (
    <section id="booking" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 sm:p-8">
        <h2 className="inline-flex items-center gap-2 font-serif text-3xl font-semibold text-slate-50">
          <CalendarCheck2 size={26} className="text-amber-300" />
          Book
        </h2>
        <p className="mt-2 text-slate-300">Reserve your place in history.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formState.name}
              onChange={(event) => updateField('name', event.target.value)}
              required
              className="w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 outline-none transition duration-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formState.email}
              onChange={(event) => updateField('email', event.target.value)}
              required
              className="w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 outline-none transition duration-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
            />
          </div>

          <div>
            <label htmlFor="destination" className="mb-2 block text-sm font-medium text-slate-200">
              Destination
            </label>
            <select
              id="destination"
              value={formState.destination}
              onChange={(event) => updateField('destination', event.target.value)}
              className="w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 outline-none transition duration-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
            >
              {destinations.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="start-date" className="mb-2 block text-sm font-medium text-slate-200">
                Start date
              </label>
              <input
                id="start-date"
                type="date"
                value={formState.startDate}
                onChange={(event) => updateField('startDate', event.target.value)}
                required
                className="w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 outline-none transition duration-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
              />
            </div>

            <div>
              <label htmlFor="end-date" className="mb-2 block text-sm font-medium text-slate-200">
                End date
              </label>
              <input
                id="end-date"
                type="date"
                value={formState.endDate}
                min={formState.startDate || undefined}
                onChange={(event) => updateField('endDate', event.target.value)}
                required
                className="w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 outline-none transition duration-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
              />
            </div>
          </div>

          {hasInvalidDateRange ? <p className="text-sm text-rose-300">End date must follow start date.</p> : null}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-amber-300"
          >
            <CalendarCheck2 size={16} />
            Submit
          </button>
        </form>

        {feedback ? (
          <p className={`mt-4 text-sm ${feedback.kind === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>
            {feedback.message}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export default Booking;
