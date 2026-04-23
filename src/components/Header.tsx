import { Clock3 } from 'lucide-react';

const navItems = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'AI Guide', href: '#ai-guide' },
  { label: 'Book', href: '#booking' },
];

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-amber-400/20 bg-slate-950/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="inline-flex items-center gap-2 font-serif text-xl font-semibold tracking-wide text-amber-300">
          <Clock3 size={20} />
          TimeTravel Agency
        </a>
        <nav>
          <ul className="flex items-center gap-4 sm:gap-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-slate-200 transition-colors duration-200 hover:text-amber-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
