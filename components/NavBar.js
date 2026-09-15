'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/live-tv', label: 'Live TV' },
  { href: '/sports', label: 'Sports' },
  { href: '/news', label: 'News' },
  { href: '/bangladesh', label: 'Bangladesh' },
  { href: '/india', label: 'India' },
  { href: '/international', label: 'International' },
  { href: '/kids', label: 'Cartoon/Kids' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/search', label: 'Search' }
];

export default function NavBar() {

  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-nex-border bg-nex-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3">
        <Link href="/" className="shrink-0">
          <Logo size={28} />
        </Link>

        <nav
          className="flex flex-1 gap-1 overflow-x-auto scrollbar-none"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => {

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={0}
                aria-current={active ? 'page' : undefined}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-nex-red
                  ${active
                    ? 'bg-nex-panel2 text-nex-text'
                    : 'text-nex-muted hover:text-nex-text hover:bg-nex-panel'}`}
              >
                {item.label}
              </Link>
            );

          })}
        </nav>
      </div>
    </header>
  );

}
