import { FormEvent, useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, SendHorizontal, X } from 'lucide-react';
import { requestMistralReply } from '../services/mistral';
import { Destination } from '../types/destination';

type ChatbotProps = {
  isOpen: boolean;
  onToggle: () => void;
  destinations: Destination[];
};

type Message = {
  role: 'bot' | 'user';
  text: string;
};

const quickChips = [
  'Paris 1889',
  'Cretaceous',
  'Florence 1504',
  'What are your safety protocols?',
  'How much does each destination cost?',
];

function getFallbackReply(input: string, destinations: Destination[]) {
  const message = input.toLowerCase();
  const paris = destinations.find((destination) => destination.id === 'paris-1889');
  const cretaceous = destinations.find((destination) => destination.id === 'cretaceous');
  const florence = destinations.find((destination) => destination.id === 'florence-1504');

  if (message.includes('price') || message.includes('prix') || message.includes('cost')) {
    return `Our curated departures start at ${paris?.startingPrice}, ${cretaceous?.startingPrice}, and ${florence?.startingPrice} depending on itinerary depth.`;
  }

  if (message.includes('safety') || message.includes('secur') || message.includes('safe')) {
    return 'All itineraries follow guided temporal corridors, monitored return windows, and on-site specialist supervision for every traveler.';
  }

  if (message.includes('faq') || message.includes('question')) {
    return 'Common questions include pricing range, safety protocols, recommended destination by interests, and ideal travel periods for each era.';
  }

  if (message.includes('choose') || message.includes('which') || message.includes('recommend')) {
    return 'For culture and elegance choose Paris 1889, for prehistoric adventure choose Cretaceous, and for art plus architecture choose Florence 1504.';
  }

  if (message.includes('paris')) {
    return `${paris?.title} is ideal for Belle Epoque elegance, major landmarks, and private cultural tours.`;
  }

  if (message.includes('cretaceous')) {
    return `${cretaceous?.title} expeditions are fully guided with secure observation protocols and premium support.`;
  }

  if (message.includes('florence')) {
    return `${florence?.title} is best for Renaissance art, architecture, and atelier-level historical immersion.`;
  }

  return 'I can guide you through destinations, pricing ranges, safety FAQ, booking windows, and preparation advice.';
}

function Chatbot({ isOpen, onToggle, destinations }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Welcome traveler. Ask about destinations, pricing, or which era suits you best.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusNote, setStatusNote] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const mistralApiKey = import.meta.env.VITE_MISTRAL_API_KEY;
  const mistralModel = import.meta.env.VITE_MISTRAL_MODEL || 'mistral-small-latest';

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();

    if (!trimmed || isLoading) {
      return false;
    }

    const userMessage: Message = { role: 'user', text: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setStatusNote('');
    setIsLoading(true);

    try {
      let reply = getFallbackReply(trimmed, destinations);

      if (mistralApiKey) {
        const history: Array<{ role: 'user' | 'assistant'; content: string }> = nextMessages
          .slice(-8)
          .map((message) => ({
            role: message.role === 'user' ? 'user' : 'assistant',
            content: message.text,
          }));

        reply = await requestMistralReply({
          apiKey: mistralApiKey,
          model: mistralModel,
          userInput: trimmed,
          history,
          destinations,
        });
      } else {
        setStatusNote('Running in local fallback mode. Add VITE_MISTRAL_API_KEY to enable AI responses.');
      }

      setMessages((current) => [...current, { role: 'bot', text: reply }]);
    } catch {
      setStatusNote('Mistral is unavailable right now. Fallback response used.');
      setMessages((current) => [...current, { role: 'bot', text: getFallbackReply(trimmed, destinations) }]);
    } finally {
      setIsLoading(false);
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sent = await sendMessage(input);

    if (sent) {
      setInput('');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? 'Close AI Guide' : 'Open AI Guide'}
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-slate-950 shadow-xl shadow-amber-500/20 transition duration-200 hover:scale-105 hover:bg-amber-300"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {isOpen ? (
        <section className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/95 shadow-2xl shadow-slate-950/80 backdrop-blur">
          <header className="border-b border-slate-700/70 bg-slate-950/90 px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="inline-flex items-center gap-2 font-semibold text-slate-100">
                <Bot size={16} />
                AI Guide
              </h3>
              <button
                type="button"
                onClick={onToggle}
                aria-label="Close panel"
                className="rounded-md p-1 text-slate-300 transition duration-200 hover:bg-slate-800 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {mistralApiKey ? `Connected to ${mistralModel}` : 'Local mode (set Mistral key to activate AI)'}
            </p>
          </header>

          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  message.role === 'user'
                    ? 'ml-auto bg-amber-300 text-slate-950'
                    : 'bg-slate-800 text-slate-100'
                }`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-700/70 px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => void sendMessage(chip)}
                  disabled={isLoading}
                  className="rounded-full border border-slate-600 px-3 py-1 text-xs text-slate-200 transition duration-200 hover:border-amber-300 hover:text-amber-200"
                >
                  {chip}
                </button>
              ))}
            </div>

            {statusNote ? <p className="mb-2 text-xs text-amber-200/90">{statusNote}</p> : null}

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about destinations, prices, or era advice"
                disabled={isLoading}
                className="flex-1 rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition duration-200 focus:border-amber-300"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-amber-300"
              >
                {isLoading ? '...' : <SendHorizontal size={15} />}
              </button>
            </form>
          </div>
        </section>
      ) : null}
    </>
  );
}

export default Chatbot;
