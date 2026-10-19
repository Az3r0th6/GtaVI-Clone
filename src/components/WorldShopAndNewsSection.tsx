import React from 'react';
import { ArrowRightSvg, RockstarStarSvg } from './RockstarIcons';
import { NEWSWIRE_ARTICLES, type NewswireArticle } from '../data/gtaData';
import type { DeveloperProfile } from '../utils/preorderLogic';

interface WorldShopAndNewsSectionProps {
  onOpenRadio: () => void;
  onOpenLeonida: () => void;
  onOpenMedia: () => void;
  onOpenStore: (category?: 'Merchandise' | 'Collector’s Box') => void;
  onOpenArticle: (article: NewswireArticle) => void;
  onOpenPropaganda: () => void;
  onOpenDeveloper: () => void;
  propagandaCount: number;
  developerProfile: DeveloperProfile;
}

export const WorldShopAndNewsSection: React.FC<WorldShopAndNewsSectionProps> = ({
  onOpenRadio,
  onOpenLeonida,
  onOpenMedia,
  onOpenStore,
  onOpenArticle,
  onOpenPropaganda,
  onOpenDeveloper,
  propagandaCount,
  developerProfile,
}) => {
  return (
    <div className="w-full bg-[#11101d]">
      {/* Full-Bleed Vice City Dusk Skyline Divider matching ref-sec7.png */}
      <section className="relative w-full h-[440px] sm:h-[640px] lg:h-[780px] overflow-hidden">
        <img
          src="/assets/vi/divider_skyline.jpg"
          alt="Vice City Skyline at Sunset"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#11101d]/70 via-transparent to-[#11101d]" />
      </section>

      {/* Vice City, USA. Narrative & 3 Stacked World Feature Cards matching ref-sec8.png & ref-sec9.png */}
      <section id="leonida" className="max-w-[1060px] mx-auto px-4 sm:px-8 pt-10 pb-20">
        {/* Gradient Story Copy Block */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight vice-gradient-text leading-none">
            Vice City, USA.
          </h2>
          <p className="mt-6 text-xl sm:text-2xl md:text-[28px] font-bold leading-[1.32] tracking-tight vice-gradient-text">
            Jason and Lucia have always known the deck is stacked against them. But when an easy
            score goes wrong, they find themselves on the darkest side of the sunniest place in
            America, in the middle of a criminal conspiracy stretching across the state of Leonida —
            forced to rely on each other more than ever if they want to make it out alive.
          </p>
        </div>

        {/* 3 Stacked Full-Width Feature Cards: Music, People & Places, Downloads */}
        <div className="space-y-9">
          {/* Card 1: MUSIC - IN-GAME RADIO AND MUSIC */}
          <div
            onClick={onOpenRadio}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenRadio();
              }
            }}
            aria-label="MUSIC In-Game Radio and Music Preview hand-picked stations from the biggest and widest-ranging selection of in-game radio yet, pre-order GTAVI: The Album, and more. Explore More"
            className="group relative w-full min-h-[360px] sm:min-h-[430px] rounded-[28px] overflow-hidden bg-[#241b35] shadow-2xl cursor-pointer flex items-end sm:items-center p-6 sm:p-12 lg:p-14 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbd08c]"
          >
            <img
              src="/assets/vi/music_card.jpg"
              alt="In-Game Radio and Music"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-right transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#161224]/90 via-[#161224]/45 to-transparent" />

            <div className="relative z-10 max-w-md space-y-3 text-left">
              <span className="font-display font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase text-white/90">
                MUSIC
              </span>
              <h3 className="font-display font-bold text-4xl sm:text-5xl leading-[0.96] uppercase text-[#fff2c6]">
                IN-GAME RADIO
                <span className="block">AND MUSIC</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium max-w-sm">
                Preview hand-picked stations from the biggest and widest-ranging selection of
                in-game radio yet, pre-order GTAVI: The Album, and more.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#fbd08c] group-hover:bg-white text-[#11101d] font-bold text-xs sm:text-sm transition-colors whitespace-nowrap">
                  <span>Explore More</span>
                  <ArrowRightSvg className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: PEOPLE & PLACES - ONLY IN LEONIDA */}
          <div
            onClick={onOpenLeonida}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLeonida();
              }
            }}
            aria-label="People & Places Only in Leonida Vice City, USA. The darkest side of the sunniest place in America. Explore More"
            className="group relative w-full min-h-[360px] sm:min-h-[430px] rounded-[28px] overflow-hidden bg-[#241b35] shadow-2xl cursor-pointer flex items-end sm:items-center p-6 sm:p-12 lg:p-14 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbd08c]"
          >
            <img
              src="/assets/vi/leonida_card.jpg"
              alt="Only in Leonida"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-right transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#161224]/90 via-[#161224]/45 to-transparent" />

            <div className="relative z-10 max-w-md space-y-3 text-left">
              <span className="font-display font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase text-white/90">
                PEOPLE &amp; PLACES
              </span>
              <h3 className="font-display font-bold text-4xl sm:text-5xl leading-[0.96] uppercase text-[#fff2c6]">
                ONLY IN LEONIDA
              </h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium max-w-sm">
                Vice City, USA. The darkest side of the sunniest place in America.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#fbd08c] group-hover:bg-white text-[#11101d] font-bold text-xs sm:text-sm transition-colors whitespace-nowrap">
                  <span>Explore More</span>
                  <ArrowRightSvg className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: DOWNLOADS - MEDIA & ARTWORK */}
          <div
            onClick={onOpenMedia}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenMedia();
              }
            }}
            aria-label="Downloads Media & Artwork Download and share official videos, screenshots, and more. See All"
            className="group relative w-full min-h-[360px] sm:min-h-[430px] rounded-[28px] overflow-hidden bg-[#172323] shadow-2xl cursor-pointer flex items-end sm:items-center p-6 sm:p-12 lg:p-14 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbd08c]"
          >
            <img
              src="/assets/vi/media_card.jpg"
              alt="Media & Artwork"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-right transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e1718]/90 via-[#0e1718]/45 to-transparent" />

            <div className="relative z-10 max-w-md space-y-3 text-left">
              <span className="font-display font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase text-white/90">
                DOWNLOADS
              </span>
              <h3 className="font-display font-bold text-4xl sm:text-5xl leading-[0.96] uppercase text-[#fff2c6]">
                MEDIA &amp; ARTWORK
              </h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium max-w-sm">
                Download and share official videos, screenshots, and more.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#fbd08c] group-hover:bg-white text-[#11101d] font-bold text-xs sm:text-sm transition-colors whitespace-nowrap">
                  <span>See All</span>
                  <ArrowRightSvg className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section matching ref-sec9.png */}
      <section id="shop" className="max-w-[1060px] mx-auto px-4 sm:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#fbd08c] tracking-tight">
            Shop
          </h2>
          <button
            type="button"
            onClick={() => onOpenStore()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-[#fbd08c] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>View All</span>
            <ArrowRightSvg className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {/* Shop Card 1: Merchandise */}
          <div
            onClick={() => onOpenStore('Merchandise')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenStore('Merchandise');
              }
            }}
            aria-label="Merchandise Premium apparel, collectibles, and more Shop Now"
            className="group relative aspect-[4/4.6] rounded-[28px] overflow-hidden bg-[#1d2242] shadow-2xl cursor-pointer flex flex-col justify-end p-7 sm:p-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbd08c]"
          >
            <img
              src="/assets/vi/merch_card.jpg"
              alt="Rockstar Store Merchandise"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11101d]/95 via-[#11101d]/35 to-transparent" />
            <div className="relative z-10 space-y-2.5 text-left">
              <span className="font-display font-semibold text-xs tracking-[0.16em] uppercase text-[#fbd08c]">
                MERCHANDISE
              </span>
              <h3 className="font-display font-bold text-3xl sm:text-4xl leading-none uppercase text-white">
                PREMIUM APPAREL, COLLECTIBLES, AND MORE
              </h3>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fbd08c] group-hover:bg-white text-[#11101d] font-bold text-xs sm:text-sm transition-colors whitespace-nowrap">
                  <span>Shop Now</span>
                  <ArrowRightSvg className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Shop Card 2: Collector's Box */}
          <div
            onClick={() => onOpenStore('Collector’s Box')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenStore('Collector’s Box');
              }
            }}
            aria-label="Collector’s Box The Vice City Collection Explore Now"
            className="group relative aspect-[4/4.6] rounded-[28px] overflow-hidden bg-[#24233b] shadow-2xl cursor-pointer flex flex-col justify-end p-7 sm:p-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbd08c]"
          >
            <img
              src="/assets/vi/collectors_card.png"
              alt="The Vice City Collection Collector's Box"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11101d]/95 via-[#11101d]/30 to-transparent" />
            <div className="relative z-10 space-y-2.5 text-left">
              <span className="font-display font-semibold text-xs tracking-[0.16em] uppercase text-[#fbd08c]">
                COLLECTOR’S BOX
              </span>
              <h3 className="font-display font-bold text-3xl sm:text-4xl leading-none uppercase text-white">
                THE VICE CITY COLLECTION
              </h3>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fbd08c] group-hover:bg-white text-[#11101d] font-bold text-xs sm:text-sm transition-colors whitespace-nowrap">
                  <span>Explore Now</span>
                  <ArrowRightSvg className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News Section matching ref-sec10.png */}
      <section id="newswire" className="max-w-[1060px] mx-auto px-4 sm:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#fbd08c] tracking-tight">
            Featured News
          </h2>
          <button
            type="button"
            onClick={() => onOpenArticle(NEWSWIRE_ARTICLES[0])}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-[#fbd08c] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>View all Newswire posts</span>
            <ArrowRightSvg className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWSWIRE_ARTICLES.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => onOpenArticle(post)}
              className="group bg-[#201f36] hover:bg-[#292844] rounded-2xl overflow-hidden text-left transition-all duration-200 flex flex-col shadow-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbd08c]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#161527]">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#fbd08c] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-white/60 font-medium">{post.date}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Official Footer matching ref-sec10.png */}
      <footer className="max-w-[960px] mx-auto px-4 sm:px-8 pt-20 pb-24 flex flex-col items-center text-center">
        {/* GTA VI Emblem */}
        <img
          src="/assets/vi/footer_vi.png"
          alt="Grand Theft Auto VI"
          referrerPolicy="no-referrer"
          className="w-36 sm:w-44 h-auto mb-14 select-none"
        />

        {/* GET ROCKSTAR PROPAGANDA Rounded Pill Bar */}
        <button
          type="button"
          onClick={onOpenPropaganda}
          className="group w-full max-w-[780px] rounded-full border border-white/15 hover:border-[#ffb8c9]/50 bg-[#141323]/90 hover:bg-[#1a182d] px-6 sm:px-10 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 text-center sm:text-left transition-all cursor-pointer mb-14"
        >
          <div className="flex items-center gap-3.5 shrink-0">
            <RockstarStarSvg className="w-6 h-6 text-white group-hover:text-[#ffb8c9] transition-colors" />
            <strong className="font-extrabold text-sm sm:text-base tracking-wide uppercase text-white whitespace-nowrap">
              GET ROCKSTAR PROPAGANDA
            </strong>
          </div>
          <div className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Get the latest game announcements, updates on special events and offers, and much more
            from Rockstar Games.
            <span className="block text-[11px] text-[#fbd08c] mt-1 font-semibold tabular-nums">
              Join {propagandaCount.toLocaleString()} subscribed Leonida insiders →
            </span>
          </div>
        </button>

        {/* Social Media Icons Row */}
        <nav aria-label="Rockstar Games Social Channels" className="flex items-center justify-center gap-6 sm:gap-8 mb-10 text-white/80">
          {[
            { name: 'X', label: 'X (Twitter)', path: 'M9.142 7.081 13.609 2H12.55L8.671 6.412 5.573 2H2l4.685 6.672L2 14h1.059l4.096-4.66L10.427 14H14zm-1.45 1.65-.475-.665L3.44 2.78h1.626l3.048 4.266.475.664 3.962 5.546h-1.626z' },
            { name: 'Instagram', label: 'Instagram', path: 'M8 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM8 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324z' },
            { name: 'YouTube', label: 'YouTube', path: 'M14.708 4.63a1.75 1.75 0 0 0-1.237-1.237C12.378 3.1 8 3.1 8 3.1s-4.378 0-5.47.293A1.75 1.75 0 0 0 1.293 4.63C1 5.722 1 8 1 8s0 2.278.293 3.37a1.75 1.75 0 0 0 1.237 1.237C3.622 12.9 8 12.9 8 12.9s4.378 0 5.47-.293a1.75 1.75 0 0 0 1.237-1.237C15 10.278 15 8 15 8s0-2.278-.293-3.37zM6.6 10.1V5.9L10.237 8z' },
            { name: 'TikTok', label: 'TikTok', path: 'M8.854 10.79c-.032.923-.763 1.665-1.651 1.665.895 0 1.62-.742 1.65-1.666V2.526h1.45a2.9 2.9 0 0 0 1.204 1.882c.428.29.945.466 1.493.466v2.064a4.56 4.56 0 0 1-2.741-.925v4.19c0 2.09-1.626 3.797-3.63 3.797a3.5 3.5 0 0 1-2.079-.688A3.86 3.86 0 0 1 3 10.202c0-2.09 1.626-3.797 3.63-3.797v1.619a1.5 1.5 0 0 0-.492-.08c-.913 0-1.657.775-1.657 1.733 0 .667.36 1.24.889 1.53.227.129.491.203.768.203.895 0 1.62-.742 1.651-1.666V2h1.973z' },
            { name: 'Facebook', label: 'Facebook', path: 'M14 8.022C14 4.696 11.313 2 8 2S2 4.696 2 8.022a6.02 6.02 0 0 0 4.55 5.845V9.862H5.314v-1.84h1.238v-.793c0-2.05.924-3 2.929-3 .38 0 1.036.075 1.304.15v1.668a8 8 0 0 0-.693-.022c-.984 0-1.364.374-1.364 1.346v.65h1.96l-.337 1.841H8.727V14A6.015 6.015 0 0 0 14 8.022' },
            { name: 'Twitch', label: 'Twitch', path: 'M5.143 2 3 4.143v7.714h2.571V14l2.143-2.143H9.43L13.286 8V2zm7.286 5.571-1.715 1.715H9l-1.5 1.5v-1.5H5.571V2.857h6.858z' },
          ].map((soc) => (
            <button
              key={soc.name}
              type="button"
              onClick={onOpenPropaganda}
              aria-label={soc.label}
              className="hover:text-white transition-colors cursor-pointer p-1.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16" aria-hidden="true">
                <path d={soc.path} />
              </svg>
            </button>
          ))}
        </nav>

        {/* Corporate & Legal Links Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] sm:text-xs text-white/60 mb-12">
          <a href="#top" className="hover:text-white transition-colors whitespace-nowrap">
            Corporate
          </a>
          <a href="#top" className="hover:text-white transition-colors whitespace-nowrap">
            Privacy
          </a>
          <button
            type="button"
            onClick={onOpenPropaganda}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Cookie Settings
          </button>
          <a href="#top" className="hover:text-white transition-colors whitespace-nowrap">
            Cookie Policy
          </a>
          <a href="#top" className="hover:text-white transition-colors whitespace-nowrap">
            Legal
          </a>
          <a href="#top" className="hover:text-white transition-colors whitespace-nowrap">
            Do Not Sell or Share My Personal Information
          </a>
        </div>

        {/* ESRB Mature 17+ Box matching ref-sec10.png */}
        <div className="flex items-start gap-4 text-left max-w-md border border-white/10 rounded-xl p-3.5 bg-[#151424]/60 mb-14">
          <img
            src="/assets/vi/esrb_mature.svg"
            alt="ESRB Mature 17+"
            referrerPolicy="no-referrer"
            className="w-12 h-auto shrink-0"
          />
          <div className="text-[11px] text-white/75 leading-snug space-y-2">
            <p>
              Blood and Gore, Intense Violence, Mature Humor, Nudity, Strong Language, Strong
              Sexual Content, Use of Drugs and Alcohol.
            </p>
            <hr className="border-white/15" />
            <p className="text-white/60">In-Game Purchases.</p>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-white/60 tracking-wide text-center">
          © 2026 Martin Calvo Ruiz. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};
