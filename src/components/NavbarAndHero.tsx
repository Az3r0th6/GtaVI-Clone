import React from 'react';
import { ViLogoSvg, ScrollChevronSvg, Ps5BadgeSvg, XboxBadgeSvg } from './RockstarIcons';

interface NavbarAndHeroProps {
  onOpenTrailer: (trailerId: 'launch' | 'extended' | 'trailer2' | 'trailer1') => void;
  onOpenPreorder: (edition?: 'standard' | 'ultimate' | 'collectors') => void;
  onOpenNavMenu: () => void;
  onOpenDeveloper: () => void;
  reservationCount: number;
  developerName: string;
}

export const NavbarAndHero: React.FC<NavbarAndHeroProps> = ({
  onOpenTrailer,
  onOpenPreorder,
  onOpenNavMenu,
  onOpenDeveloper,
  reservationCount,
  developerName,
}) => {
  return (
    <div className="relative w-full bg-[#11101d]">
      {/* Top Launch Trailer Announcement Banner matching rockstargames.com/VI */}
      <button
        type="button"
        onClick={() => onOpenTrailer('launch')}
        aria-label="Watch Grand Theft Auto 6 Launch Trailer"
        className="group relative w-full h-11 sm:h-12 vice-banner-gradient overflow-hidden flex items-center justify-center px-4 cursor-pointer border-b border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb0c4]"
      >
        {/* Tropical Palm Leaf Silhouettes Left & Right */}
        <svg
          className="absolute left-0 top-0 h-full w-20 sm:w-56 text-[#4a2545]/50 pointer-events-none select-none object-cover"
          viewBox="0 0 260 60"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 0 C50 8, 95 25, 130 60 C85 38, 45 28, 0 32 Z" />
          <path d="M20 0 C75 4, 130 18, 175 55 C125 32, 70 18, 10 15 Z" />
          <path d="M60 0 C110 2, 165 12, 220 42 C160 22, 105 10, 50 6 Z" />
        </svg>
        <svg
          className="absolute right-0 top-0 h-full w-20 sm:w-56 text-[#4a2545]/50 pointer-events-none select-none object-cover scale-x-[-1]"
          viewBox="0 0 260 60"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M0 0 C50 8, 95 25, 130 60 C85 38, 45 28, 0 32 Z" />
          <path d="M20 0 C75 4, 130 18, 175 55 C125 32, 70 18, 10 15 Z" />
          <path d="M60 0 C110 2, 165 12, 220 42 C160 22, 105 10, 50 6 Z" />
        </svg>

        <div className="relative z-10 flex items-center gap-3 text-[#2a182c] font-extrabold text-[11px] sm:text-xs tracking-[0.22em] uppercase whitespace-nowrap">
          <span>LAUNCH TRAILER</span>
          <span className="opacity-60">·</span>
          <span className="underline decoration-[#2a182c]/40 group-hover:decoration-[#2a182c] underline-offset-4 transition-all">
            NOW PLAYING
          </span>
          {/* Bird silhouette matching reference banner */}
          <svg className="hidden sm:block w-5 h-4 text-[#4a2545]/80 ml-2" viewBox="0 0 24 16" fill="currentColor" aria-hidden="true">
            <path d="M2 9 C6 4, 10 4, 12 7 C14 3, 19 1, 23 3 C19 5, 16 8, 14 11 C10 9, 6 9, 2 9 Z" />
          </svg>
        </div>
      </button>

      {/* Sticky 3-Zone Top Header Bar matching rockstargames.com/VI */}
      <header className="sticky top-0 z-40 w-full px-6 sm:px-10 py-5 flex items-center justify-between gap-8 pointer-events-none">
        {/* Zone 1: Brand Wordmark VI */}
        <a
          href="#top"
          aria-label="Homepage"
          className="pointer-events-auto text-white hover:text-[#ffb0c4] transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb0c4] rounded"
        >
          <ViLogoSvg className="w-9 h-7 sm:w-11 sm:h-8" />
        </a>

        {/* Zone 2: Concise Single-Line Section Links (Desktop quick-jump) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-white/75 pointer-events-auto bg-[#11101d]/70 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10"
        >
          <a href="#trailers" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Trailers
          </a>
          <a href="#editions" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Editions
          </a>
          <a href="#leonida" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Vice City
          </a>
          <a href="#shop" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Shop
          </a>
          <a href="#newswire" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Newswire
          </a>
        </nav>

        {/* Zone 3: Primary CTA + Menu Drawer Trigger */}
        <div className="pointer-events-auto flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={() => onOpenPreorder('ultimate')}
            className="px-5 py-2.5 rounded-full bg-[#ffb8c9] hover:bg-white text-[#11101d] font-bold text-xs sm:text-sm tracking-tight transition-all duration-150 shadow-lg shadow-black/30 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Pre-Order Now
          </button>
          <button
            type="button"
            onClick={onOpenNavMenu}
            aria-label="Expand Navigation Menu"
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white hover:text-[#ffb8c9] transition-colors cursor-pointer rounded-full bg-[#11101d]/60 backdrop-blur-md border border-white/10"
          >
            <span className="w-5 h-[2.5px] bg-current block rounded-full" />
            <span className="w-5 h-[2.5px] bg-current block rounded-full" />
          </button>
        </div>
      </header>

      {/* Main Hero Mosaic & Emblem Container */}
      <section
        id="top"
        className="relative max-w-[1220px] mx-auto px-4 sm:px-8 pt-2 pb-12 flex flex-col items-center justify-between min-h-[calc(100vh-110px)]"
      >
        {/* Center Mosaic & Grand Theft Auto VI Emblem */}
        <div className="relative w-full max-w-[960px] mx-auto my-auto flex items-center justify-center">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden rounded-sm shadow-2xl shadow-black/80">
            <img
              src="/assets/vi/poster_full.jpg"
              alt="Grand Theft Auto VI"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center select-none"
            />
          </div>
        </div>

        {/* Hero Bottom Bar: Release Date | Pre-Order CTA | Console Logos */}
        <div className="w-full max-w-[960px] mx-auto mt-8 pt-2 grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-center md:text-left">
          {/* Left: Coming November 19, 2026 */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="font-display font-bold text-lg sm:text-xl md:text-[22px] leading-tight tracking-wide uppercase text-white">
              COMING
              <span className="block">NOVEMBER 19, 2026</span>
            </h1>
          </div>

          {/* Center: Pre-Order Now Pill Button */}
          <div className="flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => onOpenPreorder('ultimate')}
              className="px-8 py-3.5 rounded-full bg-[#ffd2de] hover:bg-white text-[#11101d] font-bold text-sm sm:text-base tracking-tight transition-all duration-150 shadow-[0_0_35px_rgba(255,184,201,0.35)] hover:scale-[1.02] whitespace-nowrap shrink-0 cursor-pointer"
            >
              Pre-Order Now
            </button>
            {reservationCount > 2 && (
              <span className="mt-2 text-[11px] text-[#ffb8c9] font-medium tabular-nums">
                {reservationCount.toLocaleString()} Active Reservations
              </span>
            )}
          </div>

          {/* Right: PlayStation 5 & Xbox Series X|S */}
          <div className="flex items-center justify-center md:justify-end gap-6 text-white/90">
            <Ps5BadgeSvg className="h-4 sm:h-[18px] w-auto" />
            <XboxBadgeSvg className="h-4 sm:h-[18px] w-auto" />
          </div>
        </div>

        {/* Scroll Down Chevron */}
        <a
          href="#trailers"
          aria-label="Scroll for more content"
          className="mt-8 text-[#ffb8c9]/80 hover:text-white transition-colors animate-float-chevron cursor-pointer"
        >
          <ScrollChevronSvg className="w-8 h-3.5" />
        </a>
      </section>
    </div>
  );
};
