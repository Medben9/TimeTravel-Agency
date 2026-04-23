import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Booking from './components/Booking';
import Cards from './components/Cards';
import Chatbot from './components/Chatbot';
import DestinationModal from './components/DestinationModal';
import Header from './components/Header';
import Hero from './components/Hero';
import RecommendationQuiz from './components/RecommendationQuiz';
import { DESTINATIONS } from './data/destinations';
import { Destination } from './types/destination';

function App() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const hasMistralKey = Boolean(import.meta.env.VITE_MISTRAL_API_KEY);

  const closeModal = () => setSelectedDestination(null);

  const handleBookFromModal = () => {
    closeModal();
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.08),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.08),transparent_35%)]" />

      <Header />

      <main>
        <Hero onOpenChat={() => setChatOpen(true)} />

        <section id="agency" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 sm:p-8">
            <h2 className="font-serif text-3xl font-semibold text-slate-50">About TimeTravel Agency</h2>
            <p className="mt-3 text-slate-300">
              TimeTravel Agency curates luxury temporal journeys with private guidance, secure transfer
              protocols, and concierge-grade service across iconic eras.
            </p>
            <a
              href="#destinations"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-amber-300"
            >
              <Sparkles size={16} />
              See Destinations
            </a>
          </div>
        </section>

        <Cards destinations={DESTINATIONS} onView={setSelectedDestination} />

        <RecommendationQuiz destinations={DESTINATIONS} />

        <section id="ai-guide" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-6">
            <h2 className="font-serif text-3xl font-semibold text-slate-50">AI Guide</h2>
            <p className="mt-2 text-slate-300">
              Open the floating AI Guide for destination recommendations, pricing guidance, and FAQ support.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              {hasMistralKey
                ? 'Mistral API detected: live AI replies enabled.'
                : 'No Mistral key detected: local fallback mode active until env vars are set.'}
            </p>
          </div>
        </section>

        <Booking destinations={DESTINATIONS.map((destination) => destination.title)} />
      </main>

      <footer className="mx-auto w-full max-w-6xl px-4 pb-10 pt-2 text-sm text-slate-400 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-800/70 bg-slate-900/40 px-4 py-3">
          TimeTravel Agency. Fictional educational project. All itineraries are simulated experiences.
        </div>
      </footer>

      <Chatbot
        isOpen={chatOpen}
        onToggle={() => setChatOpen((current) => !current)}
        destinations={DESTINATIONS}
      />

      {selectedDestination ? (
        <DestinationModal
          destination={selectedDestination}
          onClose={closeModal}
          onBook={handleBookFromModal}
        />
      ) : null}
    </div>
  );
}

export default App;
