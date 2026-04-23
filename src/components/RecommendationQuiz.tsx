import { useMemo, useState } from 'react';
import { Destination } from '../types/destination';

type DestinationId = Destination['id'];

type QuizOption = {
  label: string;
  destinationId: DestinationId;
};

type QuizQuestion = {
  prompt: string;
  options: QuizOption[];
};

type RecommendationQuizProps = {
  destinations: Destination[];
};

const destinationOrder: DestinationId[] = ['paris-1889', 'cretaceous', 'florence-1504'];

const questions: QuizQuestion[] = [
  {
    prompt: 'Quel type d\'experience recherchez-vous ?',
    options: [
      { label: 'Culturelle et artistique', destinationId: 'florence-1504' },
      { label: 'Aventure et nature', destinationId: 'cretaceous' },
      { label: 'Elegance et raffinement', destinationId: 'paris-1889' },
    ],
  },
  {
    prompt: 'Votre periode preferee ?',
    options: [
      { label: 'Histoire moderne (XIXe-XXe)', destinationId: 'paris-1889' },
      { label: 'Temps anciens et origines', destinationId: 'cretaceous' },
      { label: 'Renaissance et classicisme', destinationId: 'florence-1504' },
    ],
  },
  {
    prompt: 'Vous preferez :',
    options: [
      { label: 'L\'effervescence urbaine', destinationId: 'paris-1889' },
      { label: 'La nature sauvage', destinationId: 'cretaceous' },
      { label: 'L\'art et l\'architecture', destinationId: 'florence-1504' },
    ],
  },
  {
    prompt: 'Votre activite ideale :',
    options: [
      { label: 'Visiter des monuments', destinationId: 'paris-1889' },
      { label: 'Observer la faune', destinationId: 'cretaceous' },
      { label: 'Explorer des ateliers et musees', destinationId: 'florence-1504' },
    ],
  },
];

function RecommendationQuiz({ destinations }: RecommendationQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<DestinationId, number>>({
    'paris-1889': 0,
    cretaceous: 0,
    'florence-1504': 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  const recommendedDestination = useMemo(() => {
    const winnerId = destinationOrder.reduce((best, candidate) => {
      return scores[candidate] > scores[best] ? candidate : best;
    }, destinationOrder[0]);

    return destinations.find((destination) => destination.id === winnerId) ?? destinations[0];
  }, [destinations, scores]);

  const handleAnswer = (destinationId: DestinationId) => {
    setScores((current) => ({
      ...current,
      [destinationId]: current[destinationId] + 1,
    }));

    if (currentQuestionIndex === questions.length - 1) {
      setIsComplete(true);
      return;
    }

    setCurrentQuestionIndex((current) => current + 1);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScores({
      'paris-1889': 0,
      cretaceous: 0,
      'florence-1504': 0,
    });
    setIsComplete(false);
  };

  return (
    <section id="quiz" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 sm:p-8">
        <h2 className="font-serif text-3xl font-semibold text-slate-50">Quiz de recommandation</h2>
        <p className="mt-2 text-slate-300">Repondez a 4 questions pour trouver votre epoque ideale.</p>

        {isComplete ? (
          <div className="mt-6 space-y-4">
            <h3 className="font-serif text-2xl text-amber-200">Destination recommandee: {recommendedDestination.title}</h3>
            <p className="text-slate-300">
              Selon vos preferences, {recommendedDestination.title} est le meilleur equilibre entre atmosphere,
              activites et niveau d\'immersion historique.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#booking"
                className="inline-flex rounded-md bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-amber-300"
              >
                Reserver cette destination
              </a>
              <button
                type="button"
                onClick={resetQuiz}
                className="inline-flex rounded-md border border-slate-500 px-5 py-2.5 text-sm font-semibold text-slate-200 transition duration-200 hover:border-slate-300"
              >
                Refaire le quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="text-sm uppercase tracking-wide text-amber-200/80">
              Question {currentQuestionIndex + 1} / {questions.length}
            </p>
            <h3 className="text-xl font-semibold text-slate-100">{questions[currentQuestionIndex].prompt}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {questions[currentQuestionIndex].options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleAnswer(option.destinationId)}
                  className="rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-left text-slate-100 transition duration-200 hover:border-amber-300 hover:text-amber-200"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecommendationQuiz;
