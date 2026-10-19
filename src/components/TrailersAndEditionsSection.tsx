import React from 'react';
import { PlayCircleSvg, ArrowRightSvg } from './RockstarIcons';

interface TrailersAndEditionsSectionProps {
  onOpenTrailer: (trailerId: 'launch' | 'extended' | 'trailer2' | 'trailer1') => void;
  onOpenPreorder: (edition: 'standard' | 'ultimate' | 'collectors') => void;
}

export const TrailersAndEditionsSection: React.FC<TrailersAndEditionsSectionProps> = ({
  onOpenTrailer,
  onOpenPreorder,
}) => {
  return (
    <div id="trailers" className="w-full bg-[#11101d]">
      {/* Full-Bleed Watch Launch Trailer Hero Showcase matching ref-sec3.png */}
      <section className="relative w-full overflow-hidden">
        <button
          type="button"
          onClick={() => onOpenTrailer('launch')}
          aria-label="Watch Launch Trailer"
          className="group relative block w-full min-h-[540px] sm:min-h-[720px] lg:min-h-[860px] overflow-hidden cursor-pointer text-center focus:outline-none"
        >
          <img
            src="/assets/vi/featured_launch.jpg"
            alt="Watch Launch Trailer - Jason and Lucia in Vice City"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          {/* Subtle top & bottom gradient scrims */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#11101d]/40 via-transparent to-[#11101d]" />

          {/* Top Title Lockup: WATCH / LAUNCH TRAILER */}
          <div className="absolute top-12 sm:top-20 inset-x-0 z-10 px-4 flex flex-col items-center pointer-events-none">
            <span className="font-display font-bold text-sm sm:text-base tracking-[0.18em] uppercase text-[#ffe4ec]/90">
              WATCH
            </span>
            <h2 className="mt-2 font-display font-bold text-4xl sm:text-6xl md:text-7xl tracking-[0.16em] uppercase text-white drop-shadow-md">
              LAUNCH TRAILER
            </h2>
          </div>

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover:scale-110">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-[#9e6374] translate-x-0.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7 5.5v13l11-6.5-11-6.5z" />
              </svg>
            </div>
          </div>
        </button>

        {/* 3-Column Secondary Trailers Row matching ref-sec4.png */}
        <div className="relative z-20 max-w-[1180px] mx-auto px-4 sm:px-8 -mt-16 sm:-mt-28 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: An Extended Look */}
            <button
              type="button"
              onClick={() => onOpenTrailer('extended')}
              aria-label="Watch An Extended Look"
              className="group relative aspect-[3/3.8] w-full rounded-2xl overflow-hidden bg-[#1b192e] shadow-2xl cursor-pointer text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbd08c]"
            >
              <img
                src="/assets/vi/extended_look.jpg"
                alt="An Extended Look"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11101d]/90 via-[#11101d]/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircleSvg className="w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-200 group-hover:scale-110 shadow-xl rounded-full" />
              </div>
              <div className="absolute bottom-7 inset-x-4 flex flex-col items-center">
                <span className="font-display text-xs tracking-[0.16em] uppercase text-white/90">
                  WATCH
                </span>
                <h3 className="mt-1 font-display font-bold text-2xl sm:text-3xl tracking-wider uppercase text-[#fff2c6]">
                  AN EXTENDED LOOK
                </h3>
              </div>
            </button>

            {/* Card 2: Trailer 2 */}
            <button
              type="button"
              onClick={() => onOpenTrailer('trailer2')}
              aria-label="Watch Trailer 2"
              className="group relative aspect-[3/3.8] w-full rounded-2xl overflow-hidden bg-[#1b192e] shadow-2xl cursor-pointer text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbd08c]"
            >
              <img
                src="/assets/vi/trailer_2.jpg"
                alt="Trailer 2"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11101d]/90 via-[#11101d]/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircleSvg className="w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-200 group-hover:scale-110 shadow-xl rounded-full" />
              </div>
              <div className="absolute bottom-7 inset-x-4 flex flex-col items-center">
                <span className="font-display text-xs tracking-[0.16em] uppercase text-white/90">
                  WATCH
                </span>
                <h3 className="mt-1 font-display font-bold text-2xl sm:text-3xl tracking-wider uppercase text-[#fff2c6]">
                  TRAILER 2
                </h3>
              </div>
            </button>

            {/* Card 3: Trailer 1 */}
            <button
              type="button"
              onClick={() => onOpenTrailer('trailer1')}
              aria-label="Watch Trailer 1"
              className="group relative aspect-[3/3.8] w-full rounded-2xl overflow-hidden bg-[#1b192e] shadow-2xl cursor-pointer text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbd08c]"
            >
              <img
                src="/assets/vi/trailer_1.jpg"
                alt="Trailer 1"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11101d]/90 via-[#11101d]/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircleSvg className="w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-200 group-hover:scale-110 shadow-xl rounded-full" />
              </div>
              <div className="absolute bottom-7 inset-x-4 flex flex-col items-center">
                <span className="font-display text-xs tracking-[0.16em] uppercase text-white/90">
                  WATCH
                </span>
                <h3 className="mt-1 font-display font-bold text-2xl sm:text-3xl tracking-wider uppercase text-[#fff2c6]">
                  TRAILER 1
                </h3>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Full-Bleed Divider: Jason & Lucia on Classic Green Sports Car matching ref-sec5.png */}
      <section className="relative w-full h-[460px] sm:h-[680px] lg:h-[820px] overflow-hidden">
        <img
          src="/assets/vi/divider_car.jpg"
          alt="Jason and Lucia on a classic convertible in Vice Beach"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#11101d] via-transparent to-[#11101d]" />
      </section>

      {/* Editions & Pre-Order Bonuses Cards matching ref-sec6.png */}
      <section id="editions" className="relative z-10 max-w-[1180px] mx-auto px-4 sm:px-8 py-14 space-y-10">
        {/* Card 1: Ultimate Edition */}
        <div
          onClick={() => onOpenPreorder('ultimate')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenPreorder('ultimate');
            }
          }}
          aria-label="Ultimate Edition - An exclusive collection of items threaded across all aspects of Jason and Lucia’s story. Learn More"
          className="group relative w-full min-h-[380px] sm:min-h-[450px] rounded-[28px] overflow-hidden bg-[#2b1932] shadow-2xl cursor-pointer flex items-center justify-end p-6 sm:p-12 lg:p-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8f878]"
        >
          <img
            src="/assets/vi/ultimate_edition.jpg"
            alt="Grand Theft Auto VI Ultimate Edition"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-left transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1c1326]/55 to-[#161224]/95 md: via-[#1c1326]/30" />

          <div className="relative z-10 w-full md:w-[46%] text-left space-y-4">
            <h3 className="font-display font-bold text-4xl sm:text-5xl lg:text-[54px] leading-[0.96] uppercase text-[#fff5cc] tracking-wide">
              ULTIMATE EDITION
            </h3>
            <p className="text-sm sm:text-base text-white/90 max-w-md leading-relaxed font-medium">
              An exclusive collection of items threaded across all aspects of Jason and Lucia’s story.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#e8f878] group-hover:bg-white text-[#11101d] font-bold text-xs sm:text-sm transition-colors whitespace-nowrap">
                <span>Learn More</span>
                <ArrowRightSvg className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Pre-Order Bonuses - Vintage Vice City Pack */}
        <div
          onClick={() => onOpenPreorder('standard')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenPreorder('standard');
            }
          }}
          aria-label="Pre-order Bonuses Vintage Vice City Pack Pre-order to get unique benefits that flash back to when the neon burned brightest. Learn More"
          className="group relative w-full min-h-[380px] sm:min-h-[450px] rounded-[28px] overflow-hidden bg-[#191d32] shadow-2xl cursor-pointer flex items-center justify-end p-6 sm:p-12 lg:p-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8f878]"
        >
          <img
            src="/assets/vi/vintage_pack.jpg"
            alt="Vintage Vice City Pack - Ocean View Hotel"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-left transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#121828]/50 to-[#111625]/95" />

          <div className="relative z-10 w-full md:w-[46%] text-left space-y-3">
            <span className="font-display font-semibold text-xs sm:text-sm tracking-[0.14em] uppercase text-[#b8f2e6]">
              PRE-ORDER BONUSES
            </span>
            <h3 className="font-display font-bold text-4xl sm:text-5xl lg:text-[54px] leading-[0.96] uppercase text-[#fff5cc] tracking-wide">
              VINTAGE
              <span className="block">VICE CITY PACK</span>
            </h3>
            <p className="text-sm sm:text-base text-white/90 max-w-md leading-relaxed font-medium">
              Pre-order to get unique benefits that flash back to when the neon burned brightest.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#e8f878] group-hover:bg-white text-[#11101d] font-bold text-xs sm:text-sm transition-colors whitespace-nowrap">
                <span>Learn More</span>
                <ArrowRightSvg className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
