import React, { useState, useEffect, useRef } from 'react';
import {
  TRAILERS,
  RADIO_STATIONS,
  LEONIDA_LOCATIONS,
  MEDIA_ASSETS,
  STORE_PRODUCTS,
  type NewswireArticle,
} from '../data/gtaData';
import {
  EDITIONS,
  validatePreorderInput,
  calculateOrderBreakdown,
  validatePropagandaSignup,
  validateDeveloperProfile,
  type EditionId,
  type PlatformId,
  type FormatId,
  type DeveloperProfile,
} from '../utils/preorderLogic';
import { ViLogoSvg, Ps5BadgeSvg, XboxBadgeSvg, RockstarStarSvg } from './RockstarIcons';

export type ActiveModal =
  | { type: 'none' }
  | { type: 'trailer'; trailerId: 'launch' | 'extended' | 'trailer2' | 'trailer1' }
  | { type: 'preorder'; initialEdition?: EditionId }
  | { type: 'radio' }
  | { type: 'leonida' }
  | { type: 'media' }
  | { type: 'store'; initialCategory?: 'Merchandise' | 'Collector’s Box' }
  | { type: 'article'; article: NewswireArticle }
  | { type: 'propaganda' }
  | { type: 'nav' }
  | { type: 'developer' };

interface StoredReservation {
  id: string;
  fullName: string;
  email: string;
  edition: EditionId;
  platform: PlatformId;
  format: FormatId;
  region: string;
  confirmationCode: string;
  totalUsd: number;
  createdAt: string;
}

interface InteractiveModalsProps {
  activeModal: ActiveModal;
  onClose: () => void;
  onSelectModal: (modal: ActiveModal) => void;
  trailerViews: Record<string, number>;
  onRecordTrailerView: (id: string) => void;
  radioPlays: Record<string, number>;
  onRecordRadioPlay: (stationId: string) => void;
  reservations: StoredReservation[];
  onReservationCreated: (record: StoredReservation) => void;
  onPropagandaSubscribed: (newTotal: number) => void;
  developerProfile: DeveloperProfile;
  onUpdateDeveloperProfile: (profile: DeveloperProfile) => void;
}

export const InteractiveModals: React.FC<InteractiveModalsProps> = ({
  activeModal,
  onClose,
  onSelectModal,
  trailerViews,
  onRecordTrailerView,
  radioPlays,
  onRecordRadioPlay,
  reservations,
  onReservationCreated,
  onPropagandaSubscribed,
  developerProfile,
  onUpdateDeveloperProfile,
}) => {
  // Trailer Modal State
  const [selectedTrailerId, setSelectedTrailerId] = useState<'launch' | 'extended' | 'trailer2' | 'trailer1'>('launch');
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(true);
  const [trailerProgress, setTrailerProgress] = useState(18);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);

  // Pre-Order Form State
  const [edition, setEdition] = useState<EditionId>('ultimate');
  const [platform, setPlatform] = useState<PlatformId>('ps5');
  const [format, setFormat] = useState<FormatId>('digital');
  const [region, setRegion] = useState('US');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [ageVerified, setAgeVerified] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittingPreorder, setSubmittingPreorder] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<StoredReservation | null>(null);

  // Radio Synth State
  const [selectedStationId, setSelectedStationId] = useState(RADIO_STATIONS[0].id);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [albumSaved, setAlbumSaved] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const radioIntervalRef = useRef<number | null>(null);

  // Leonida Explorer State
  const [selectedLocationId, setSelectedLocationId] = useState(LEONIDA_LOCATIONS[0].id);

  // Media Lightbox State
  const [mediaFilter, setMediaFilter] = useState<'All' | 'Key Art' | 'Screenshots' | 'Wallpapers'>('All');
  const [selectedMediaId, setSelectedMediaId] = useState(MEDIA_ASSETS[0].id);

  // Store State
  const [storeNotification, setStoreNotification] = useState<string | null>(null);

  // Propaganda State
  const [propEmail, setPropEmail] = useState('');
  const [propBirthYear, setPropBirthYear] = useState('1996');
  const [propError, setPropError] = useState<string | null>(null);
  const [propSuccess, setPropSuccess] = useState(false);

  // Developer Profile State
  const [devName, setDevName] = useState(developerProfile.name);
  const [devRole, setDevRole] = useState(developerProfile.role);
  const [devEmail, setDevEmail] = useState(developerProfile.email);
  const [devRenderUrl, setDevRenderUrl] = useState(developerProfile.renderUrl);
  const [devError, setDevError] = useState<string | null>(null);
  const [devSaved, setDevSaved] = useState(false);

  useEffect(() => {
    setDevName(developerProfile.name);
    setDevRole(developerProfile.role);
    setDevEmail(developerProfile.email);
    setDevRenderUrl(developerProfile.renderUrl);
  }, [developerProfile]);

  useEffect(() => {
    if (activeModal.type === 'trailer') {
      setSelectedTrailerId(activeModal.trailerId);
      setIsPlayingTrailer(true);
      setTrailerProgress(12);
      setActiveChapterIdx(0);
      onRecordTrailerView(activeModal.trailerId);
    } else if (activeModal.type === 'preorder') {
      if (activeModal.initialEdition) {
        setEdition(activeModal.initialEdition);
      }
      setConfirmedOrder(null);
      setFormErrors({});
    } else if (activeModal.type === 'developer') {
      setDevSaved(false);
      setDevError(null);
    }
  }, [activeModal]);

  // Trailer progress timer when playing
  useEffect(() => {
    if (activeModal.type !== 'trailer' || !isPlayingTrailer) return;
    const timer = window.setInterval(() => {
      setTrailerProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 350);
    return () => window.clearInterval(timer);
  }, [activeModal.type, isPlayingTrailer]);

  // Cleanup Web Audio when closing Radio modal
  useEffect(() => {
    if (activeModal.type !== 'radio') {
      stopRadioAudio();
    }
    return () => stopRadioAudio();
  }, [activeModal.type]);

  const stopRadioAudio = () => {
    setIsRadioPlaying(false);
    if (radioIntervalRef.current) {
      window.clearInterval(radioIntervalRef.current);
      radioIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  };

  const toggleRadioAudio = (station = RADIO_STATIONS.find((s) => s.id === selectedStationId)!) => {
    if (isRadioPlaying) {
      stopRadioAudio();
      return;
    }
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      setIsRadioPlaying(true);
      onRecordRadioPlay(station.id);

      let step = 0;
      const notes = [1, 1.25, 1.5, 1.33, 1.125, 1.5, 1.25, 0.875];
      const playBeat = () => {
        if (!audioCtxRef.current) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = station.id === 'flash_fm' ? 'sawtooth' : station.id === 'calle_ocho' ? 'triangle' : 'square';
        osc.frequency.setValueAtTime(station.baseFreq * notes[step % notes.length], now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
        step += 1;
      };
      playBeat();
      const intervalMs = Math.round((60 / station.bpm) * 500);
      radioIntervalRef.current = window.setInterval(playBeat, intervalMs);
    } catch {
      setIsRadioPlaying(true);
    }
  };

  const handlePreorderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = {
      fullName,
      email,
      edition,
      platform,
      format,
      region,
      ageVerified,
    };

    const check = validatePreorderInput(input);
    if (!check.valid) {
      setFormErrors(check.errors as Record<string, string>);
      return;
    }

    setFormErrors({});
    setSubmittingPreorder(true);
    try {
      const res = await fetch('/api/preorders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormErrors(data.errors || { email: data.error || 'Reservation failed' });
      } else {
        setConfirmedOrder(data.preorder);
        onReservationCreated(data.preorder);
      }
    } catch {
      setFormErrors({ email: 'Network error while connecting to Rockstar Store.' });
    } finally {
      setSubmittingPreorder(false);
    }
  };

  const handlePropagandaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = validatePropagandaSignup(propEmail, propBirthYear);
    if (!check.valid) {
      setPropError(check.error || 'Invalid signup details.');
      return;
    }
    setPropError(null);
    try {
      const res = await fetch('/api/propaganda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: propEmail, birthYear: propBirthYear }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPropError(data.error || 'Could not subscribe.');
        return;
      }
      setPropSuccess(true);
      onPropagandaSubscribed(data.propagandaCount);
    } catch {
      setPropError('Connection error.');
    }
  };

  if (activeModal.type === 'none') return null;

  const breakdown = calculateOrderBreakdown(edition, format, region);
  const currentTrailer = TRAILERS.find((t) => t.id === selectedTrailerId) || TRAILERS[0];
  const currentStation = RADIO_STATIONS.find((s) => s.id === selectedStationId) || RADIO_STATIONS[0];
  const currentLocation = LEONIDA_LOCATIONS.find((l) => l.id === selectedLocationId) || LEONIDA_LOCATIONS[0];
  const filteredMedia =
    mediaFilter === 'All' ? MEDIA_ASSETS : MEDIA_ASSETS.filter((m) => m.category === mediaFilter);
  const activeMedia = MEDIA_ASSETS.find((m) => m.id === selectedMediaId) || filteredMedia[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Rockstar Games Interactive Overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-3 sm:p-6 overflow-y-auto"
    >
      {/* Full-Screen Navigation Menu Drawer */}
      {activeModal.type === 'nav' && (
        <div className="relative w-full max-w-4xl bg-[#151426] border border-white/15 rounded-3xl p-6 sm:p-12 text-white shadow-2xl my-auto">
          <div className="flex items-center justify-between pb-8 border-b border-white/10">
            <div className="flex items-center gap-4">
              <ViLogoSvg className="w-11 h-8 text-[#ffb8c9]" />
              <span className="font-display font-bold text-xl tracking-wider uppercase text-white">
                Grand Theft Auto VI — Official Portal
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Navigation Menu"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Close ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#fbd08c]">
                Watch &amp; Explore
              </p>
              <div className="flex flex-col items-start gap-3">
                <button
                  type="button"
                  onClick={() => onSelectModal({ type: 'trailer', trailerId: 'launch' })}
                  className="font-display font-bold text-3xl sm:text-4xl uppercase hover:text-[#ffb8c9] transition-colors cursor-pointer"
                >
                  01. Launch Trailer
                </button>
                <button
                  type="button"
                  onClick={() => onSelectModal({ type: 'preorder', initialEdition: 'ultimate' })}
                  className="font-display font-bold text-3xl sm:text-4xl uppercase hover:text-[#e8f878] transition-colors cursor-pointer"
                >
                  02. Pre-Order &amp; Editions
                </button>
                <button
                  type="button"
                  onClick={() => onSelectModal({ type: 'radio' })}
                  className="font-display font-bold text-3xl sm:text-4xl uppercase hover:text-[#fbd08c] transition-colors cursor-pointer"
                >
                  03. In-Game Radio &amp; Music
                </button>
                <button
                  type="button"
                  onClick={() => onSelectModal({ type: 'leonida' })}
                  className="font-display font-bold text-3xl sm:text-4xl uppercase hover:text-[#ffb8c9] transition-colors cursor-pointer"
                >
                  04. Only in Leonida
                </button>
                <button
                  type="button"
                  onClick={() => onSelectModal({ type: 'media' })}
                  className="font-display font-bold text-3xl sm:text-4xl uppercase hover:text-[#fbd08c] transition-colors cursor-pointer"
                >
                  05. Media &amp; 4K Artwork
                </button>
              </div>
            </div>

            <div className="space-y-5 bg-[#1d1c33] rounded-2xl p-6 border border-white/10">
              <p className="text-xs font-bold uppercase tracking-widest text-[#e8f878]">
                Release Overview
              </p>
              <h3 className="font-display font-bold text-2xl uppercase text-white">
                Coming November 19, 2026
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                Reserve the Ultimate Edition or Standard Edition today to unlock the Vintage Vice
                City Pack on PlayStation 5 and Xbox Series X|S.
              </p>
              <div className="flex items-center gap-6 text-white/80 pt-2">
                <Ps5BadgeSvg className="h-4 w-auto" />
                <XboxBadgeSvg className="h-4 w-auto" />
              </div>
              <button
                type="button"
                onClick={() => onSelectModal({ type: 'preorder', initialEdition: 'ultimate' })}
                className="w-full py-3.5 rounded-full bg-[#ffb8c9] hover:bg-white text-[#11101d] font-bold text-sm transition-colors cursor-pointer"
              >
                Pre-Order Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cinema Trailer Player Modal */}
      {activeModal.type === 'trailer' && (
        <div className="relative w-full max-w-5xl bg-[#141324] border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-auto">
          <div className="flex items-center justify-between px-6 py-4 bg-[#1b1a30] border-b border-white/10">
            <div className="flex items-center gap-3">
              <ViLogoSvg className="w-8 h-6 text-[#ffb8c9]" />
              <span className="font-display font-bold text-lg tracking-wider uppercase text-white">
                {currentTrailer.title}
              </span>
              <span className="text-xs text-white/60">· {currentTrailer.releaseDate}</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Trailer Modal"
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
            >
              Close ×
            </button>
          </div>

          {/* Interactive Video Cinema Stage */}
          <div className="relative aspect-video w-full bg-black overflow-hidden">
            <img
              src={currentTrailer.thumbnail}
              alt={currentTrailer.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-1000 ${
                isPlayingTrailer ? 'scale-105' : 'scale-100 opacity-80'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40" />

            {/* Top right 4K HDR capture notice */}
            <div className="absolute top-4 right-4 text-xs font-mono text-white/80 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/15 tabular-nums">
              4K 60FPS CAPTURED ON PS5 · {(trailerViews[currentTrailer.id] || 84290410).toLocaleString()} VIEWS
            </div>

            {/* Center Play/Pause Toggle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <button
                type="button"
                onClick={() => setIsPlayingTrailer((p) => !p)}
                aria-label={isPlayingTrailer ? 'Pause Trailer' : 'Play Trailer'}
                className="w-20 h-20 rounded-full bg-white/95 hover:bg-white text-[#11101d] flex items-center justify-center shadow-2xl transition-transform hover:scale-105 cursor-pointer"
              >
                {isPlayingTrailer ? (
                  <span className="font-extrabold text-xl tracking-widest">❚❚</span>
                ) : (
                  <span className="font-extrabold text-2xl translate-x-0.5">▶</span>
                )}
              </button>
              <p className="mt-4 font-display font-bold text-2xl sm:text-3xl tracking-widest uppercase text-white drop-shadow">
                {currentTrailer.chapters[activeChapterIdx]?.label || currentTrailer.title}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[#fbd08c] font-medium">
                ♪ Featured Track: {currentTrailer.musicTrack}
              </p>
            </div>

            {/* Scrubber & Chapters Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black to-transparent space-y-3">
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-[#ffb8c9] transition-all duration-300"
                  style={{ width: `${trailerProgress}%` }}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/80">
                <div className="flex flex-wrap items-center gap-2">
                  {currentTrailer.chapters.map((chap, idx) => (
                    <button
                      key={chap.label}
                      type="button"
                      onClick={() => {
                        setActiveChapterIdx(idx);
                        setTrailerProgress((idx + 1) * 24);
                        setIsPlayingTrailer(true);
                      }}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                        activeChapterIdx === idx
                          ? 'bg-[#ffb8c9] text-[#11101d]'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {chap.time} · {chap.label}
                    </button>
                  ))}
                </div>
                <span className="font-mono tabular-nums">{currentTrailer.duration}</span>
              </div>
            </div>
          </div>

          {/* Trailer Details & Switcher Tabs */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#141324]">
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-bold text-lg text-white">{currentTrailer.description}</h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-white/75">
                {currentTrailer.highlights.map((h) => (
                  <li key={h}>• {h}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#fbd08c]">
                Switch Official Video
              </p>
              <div className="grid grid-cols-2 gap-2">
                {TRAILERS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setSelectedTrailerId(t.id);
                      setActiveChapterIdx(0);
                      setTrailerProgress(15);
                      onRecordTrailerView(t.id);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedTrailerId === t.id
                        ? 'border-[#ffb8c9] bg-[#25223d] text-white'
                        : 'border-white/10 bg-[#1b1a30] text-white/70 hover:text-white'
                    }`}
                  >
                    <span className="block font-display font-bold text-xs uppercase truncate">
                      {t.title}
                    </span>
                    <span className="block text-[10px] text-white/50 tabular-nums">{t.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pre-Order & Edition Selector Modal */}
      {activeModal.type === 'preorder' && (
        <div className="relative w-full max-w-4xl bg-[#151426] border border-white/15 rounded-3xl p-6 sm:p-10 text-white shadow-2xl my-auto">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#ffb8c9]">
                Official Rockstar Store Reservation
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-white mt-1">
                Pre-Order Grand Theft Auto VI
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Pre-Order Modal"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Close ×
            </button>
          </div>

          {confirmedOrder ? (
            <div className="py-8 space-y-6">
              <div className="p-6 rounded-2xl bg-[#1f2c28] border border-[#e8f878]/40 space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#e8f878]">
                  Reservation Confirmed · November 19, 2026 Launch Allocation
                </span>
                <h3 className="font-display font-bold text-3xl uppercase text-white">
                  Confirmation Code: {confirmedOrder.confirmationCode}
                </h3>
                <p className="text-sm text-white/85">
                  Thank you, <strong>{confirmedOrder.fullName}</strong>. Your reservation for{' '}
                  <strong>{EDITIONS[confirmedOrder.edition].name}</strong> (
                  {confirmedOrder.platform === 'ps5' ? 'PlayStation 5' : 'Xbox Series X|S'} ·{' '}
                  {confirmedOrder.format.toUpperCase()}) has been registered to{' '}
                  <strong>{confirmedOrder.email}</strong>.
                </p>
                <p className="text-xs text-[#fbd08c] font-mono tabular-nums">
                  Total Reserved: ${confirmedOrder.totalUsd.toFixed(2)} USD (Includes Vintage Vice City Pack Bonus)
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setConfirmedOrder(null)}
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Reserve Another Copy
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-[#e8f878] hover:bg-white text-[#11101d] text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Return to Vice City Showcase
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePreorderSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
              {/* Left Column: Edition & Platform Selection */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/75 mb-3">
                    1. Select Edition
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(['standard', 'ultimate', 'collectors'] as EditionId[]).map((edKey) => {
                      const info = EDITIONS[edKey];
                      const active = edition === edKey;
                      return (
                        <button
                          key={edKey}
                          type="button"
                          onClick={() => setEdition(edKey)}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            active
                              ? 'border-[#e8f878] bg-[#24223d] shadow-lg'
                              : 'border-white/10 bg-[#1b1a30] hover:border-white/30'
                          }`}
                        >
                          <div>
                            <span className="block font-display font-bold text-lg uppercase text-white">
                              {info.name}
                            </span>
                            {info.badge && (
                              <span className="mt-1 inline-block text-[10px] font-extrabold tracking-wider uppercase text-[#e8f878]">
                                {info.badge}
                              </span>
                            )}
                          </div>
                          <span className="mt-3 block font-mono font-bold text-base text-[#ffb8c9] tabular-nums">
                            ${info.priceUsd.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Included Bonuses Box */}
                <div className="p-4 rounded-2xl bg-[#1b1a30] border border-white/10 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#fbd08c]">
                    Included in {EDITIONS[edition].name}:
                  </p>
                  <ul className="space-y-1 text-xs text-white/85">
                    {EDITIONS[edition].bonuses.map((item) => (
                      <li key={item}>✓ {item}</li>
                    ))}
                  </ul>
                </div>

                {/* Platform & Format Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-white/75 mb-2">
                      2. Select Platform
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setPlatform('ps5')}
                        className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase cursor-pointer transition-colors ${
                          platform === 'ps5'
                            ? 'border-[#ffb8c9] bg-[#ffb8c9] text-[#11101d]'
                            : 'border-white/15 bg-[#1b1a30] text-white'
                        }`}
                      >
                        PlayStation 5
                      </button>
                      <button
                        type="button"
                        onClick={() => setPlatform('xbox')}
                        className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase cursor-pointer transition-colors ${
                          platform === 'xbox'
                            ? 'border-[#ffb8c9] bg-[#ffb8c9] text-[#11101d]'
                            : 'border-white/15 bg-[#1b1a30] text-white'
                        }`}
                      >
                        Xbox Series X|S
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-white/75 mb-2">
                      3. Format
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setFormat('digital')}
                        className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase cursor-pointer transition-colors ${
                          format === 'digital'
                            ? 'border-[#e8f878] bg-[#e8f878] text-[#11101d]'
                            : 'border-white/15 bg-[#1b1a30] text-white'
                        }`}
                      >
                        Digital Code
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormat('physical')}
                        className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase cursor-pointer transition-colors ${
                          format === 'physical'
                            ? 'border-[#e8f878] bg-[#e8f878] text-[#11101d]'
                            : 'border-white/15 bg-[#1b1a30] text-white'
                        }`}
                      >
                        Physical Disc
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Customer Inputs & Order Summary */}
              <div className="lg:col-span-5 space-y-4 bg-[#1b1a30] p-6 rounded-2xl border border-white/10">
                <div>
                  <label htmlFor="preorder-fullname" className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="preorder-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jason Duval"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121120] border border-white/15 text-sm text-white focus:outline-none focus:border-[#ffb8c9]"
                  />
                  {formErrors.fullName && (
                    <p className="mt-1 text-xs text-[#ff799d] font-medium">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="preorder-email" className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                    Rockstar Account Email
                  </label>
                  <input
                    id="preorder-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jason@vicecity.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121120] border border-white/15 text-sm text-white focus:outline-none focus:border-[#ffb8c9]"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-[#ff799d] font-medium">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="preorder-region" className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                    Store Region
                  </label>
                  <select
                    id="preorder-region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#121120] border border-white/15 text-sm text-white focus:outline-none focus:border-[#ffb8c9]"
                  >
                    <option value="US">United States (USD)</option>
                    <option value="EU">Europe / UK (USD Eq.)</option>
                    <option value="LATAM">Latin America (USD)</option>
                  </select>
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-white/80">
                    <input
                      type="checkbox"
                      checked={ageVerified}
                      onChange={(e) => setAgeVerified(e.target.checked)}
                      className="mt-0.5 rounded accent-[#ffb8c9]"
                    />
                    <span>
                      I confirm I am 17 years of age or older (ESRB Mature 17+) and agree to the
                      Rockstar Store Pre-Order Terms.
                    </span>
                  </label>
                  {formErrors.ageVerified && (
                    <p className="mt-1 text-xs text-[#ff799d] font-medium">{formErrors.ageVerified}</p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs tabular-nums">
                  <div className="flex justify-between text-white/70">
                    <span>{EDITIONS[edition].name}</span>
                    <span>${breakdown.basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping ({format})</span>
                    <span>{breakdown.shipping === 0 ? 'FREE' : `$${breakdown.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Estimated Tax ({region})</span>
                    <span>${breakdown.estimatedTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-white pt-1.5 border-t border-white/10">
                    <span>Total Due at Launch</span>
                    <span className="text-[#e8f878]">${breakdown.total.toFixed(2)} USD</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submittingPreorder}
                  className="w-full py-3.5 rounded-full bg-[#ffb8c9] hover:bg-white text-[#11101d] font-extrabold text-sm tracking-tight transition-colors cursor-pointer disabled:opacity-50"
                >
                  {submittingPreorder ? 'Registering Pre-Order...' : 'Complete Pre-Order Reservation'}
                </button>

                {reservations.length > 0 && (
                  <div className="pt-2 text-[11px] text-white/55 tabular-nums">
                    Latest reservation: {reservations[0].confirmationCode} ({reservations[0].platform.toUpperCase()})
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      )}

      {/* In-Game Radio & Music Tuner Modal */}
      {activeModal.type === 'radio' && (
        <div className="relative w-full max-w-4xl bg-[#151426] border border-white/15 rounded-3xl p-6 sm:p-10 text-white shadow-2xl my-auto">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#fbd08c]">
                Leonida FM Broadcast Network
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-white mt-1">
                In-Game Radio &amp; Music Preview
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Radio Modal"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Close ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
            {/* Station Selector Dial */}
            <div className="md:col-span-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white/70">
                Select Leonida Station
              </p>
              {RADIO_STATIONS.map((st) => {
                const active = st.id === selectedStationId;
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => {
                      setSelectedStationId(st.id);
                      if (isRadioPlaying) {
                        stopRadioAudio();
                      }
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'border-[#fbd08c] bg-[#25223e]'
                        : 'border-white/10 bg-[#1b1a30] hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-lg uppercase text-white">
                        {st.name}
                      </span>
                      <span className="font-mono text-xs text-[#fbd08c] tabular-nums">
                        {st.frequency}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mt-1">{st.genre}</p>
                  </button>
                );
              })}
            </div>

            {/* Active Station Deck & Tracklist */}
            <div className="md:col-span-7 bg-[#1b1a30] rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#ffb8c9] tabular-nums">
                    HOSTED BY {currentStation.host.toUpperCase()} · {(radioPlays[currentStation.id] || 150000).toLocaleString()} LISTENS
                  </span>
                  <span className="text-xs font-mono text-[#e8f878] tabular-nums">
                    {currentStation.bpm} BPM
                  </span>
                </div>
                <h3 className="font-display font-bold text-3xl uppercase text-white">
                  {currentStation.name}
                </h3>
                <p className="text-sm text-white/80">{currentStation.tagline}</p>

                {/* Live Audio Preview Button */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleRadioAudio(currentStation)}
                    className="px-6 py-3 rounded-full bg-[#fbd08c] hover:bg-white text-[#11101d] font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {isRadioPlaying ? '■ Stop Station Broadcast' : '▶ Tune In Live Synth Preview'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlbumSaved((s) => !s)}
                    className="px-5 py-3 rounded-full border border-white/20 hover:border-white text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
                  >
                    {albumSaved ? '✓ GTAVI: The Album Pre-Saved' : '+ Pre-Save GTAVI: The Album'}
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <p className="text-xs font-bold uppercase tracking-wider text-white/70">
                  Featured Station Rotation
                </p>
                {currentStation.tracks.map((tr, i) => (
                  <div
                    key={tr.title}
                    className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#131222] text-xs"
                  >
                    <div>
                      <span className="text-white/50 font-mono mr-2 tabular-nums">0{i + 1}</span>
                      <strong className="text-white">{tr.title}</strong>
                      <span className="text-white/70"> — {tr.artist}</span>
                    </div>
                    <span className="text-white/50 font-mono tabular-nums">{tr.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Only in Leonida World Dossier Modal */}
      {activeModal.type === 'leonida' && (
        <div className="relative w-full max-w-4xl bg-[#151426] border border-white/15 rounded-3xl p-6 sm:p-10 text-white shadow-2xl my-auto">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#ffb8c9]">
                People &amp; Places · State of Leonida
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-white mt-1">
                Only in Leonida
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Leonida Modal"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Close ×
            </button>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2 pt-6 pb-4">
            {LEONIDA_LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => setSelectedLocationId(loc.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedLocationId === loc.id
                    ? 'bg-[#fbd08c] text-[#11101d]'
                    : 'bg-[#1b1a30] text-white/75 hover:text-white'
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#1b1a30] rounded-2xl overflow-hidden border border-white/10">
            <div className="md:col-span-6 h-64 md:h-full">
              <img
                src={currentLocation.image}
                alt={currentLocation.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-6 p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#fbd08c]">
                {currentLocation.region}
              </span>
              <h3 className="font-display font-bold text-3xl uppercase text-white">
                {currentLocation.name}
              </h3>
              <p className="text-sm font-semibold text-[#ffb8c9]">{currentLocation.tagline}</p>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {currentLocation.description}
              </p>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-white/70">Key Points of Interest:</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#e8f878]">
                  {currentLocation.landmarks.map((lm) => (
                    <span key={lm}>• {lm}</span>
                  ))}
                </div>
              </div>
              <p className="text-xs italic text-white/70 pt-2 border-t border-white/10">
                “{currentLocation.protagonistNote}”
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Media & Artwork Lightbox Modal */}
      {activeModal.type === 'media' && (
        <div className="relative w-full max-w-5xl bg-[#151426] border border-white/15 rounded-3xl p-6 sm:p-10 text-white shadow-2xl my-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#fbd08c]">
                Official Downloads
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-white mt-1">
                Media &amp; 4K Artwork
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {(['All', 'Key Art', 'Screenshots', 'Wallpapers'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setMediaFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    mediaFilter === cat
                      ? 'bg-[#fbd08c] text-[#11101d]'
                      : 'bg-white/10 text-white/80 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Media Modal"
                className="ml-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close ×
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
            <div className="lg:col-span-8 space-y-3">
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10">
                <img
                  src={activeMedia.src}
                  alt={activeMedia.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#1b1a30] p-4 rounded-2xl">
                <div>
                  <h3 className="font-bold text-base text-white">{activeMedia.title}</h3>
                  <p className="text-xs text-white/70">
                    {activeMedia.category} · {activeMedia.resolution}
                  </p>
                </div>
                <a
                  href={activeMedia.src}
                  download={`${activeMedia.id}.jpg`}
                  className="px-5 py-2.5 rounded-full bg-[#e8f878] hover:bg-white text-[#11101d] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Download 4K Asset ↓
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3 max-h-[440px] overflow-y-auto pr-1">
              {filteredMedia.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedMediaId(item.id)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    activeMedia.id === item.id
                      ? 'border-[#fbd08c] bg-[#25233f]'
                      : 'border-white/10 bg-[#1b1a30] hover:border-white/30'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-12 object-cover rounded-lg shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-white truncate">{item.title}</p>
                    <p className="text-[11px] text-white/60">{item.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Rockstar Store Modal */}
      {activeModal.type === 'store' && (
        <div className="relative w-full max-w-4xl bg-[#151426] border border-white/15 rounded-3xl p-6 sm:p-10 text-white shadow-2xl my-auto">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#fbd08c]">
                Rockstar Games Official Store
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-white mt-1">
                The Grand Theft Auto VI Collection
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Store Modal"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Close ×
            </button>
          </div>

          {storeNotification && (
            <div className="mt-4 p-4 rounded-xl bg-[#1f2c28] border border-[#e8f878] text-xs font-bold text-[#e8f878] flex items-center justify-between">
              <span>✓ {storeNotification}</span>
              <button
                type="button"
                onClick={() => onSelectModal({ type: 'preorder', initialEdition: 'collectors' })}
                className="underline text-white cursor-pointer"
              >
                Proceed to Checkout →
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {STORE_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#1b1a30] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-black">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#fbd08c]">
                      {prod.category}
                    </span>
                    <h3 className="font-display font-bold text-2xl uppercase text-white">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-white/75">{prod.subtitle}</p>
                    <ul className="space-y-1 text-xs text-white/80 pt-2">
                      {prod.specs.map((s) => (
                        <li key={s}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0 flex items-center justify-between">
                  <span className="font-mono font-bold text-lg text-[#e8f878] tabular-nums">
                    ${prod.priceUsd.toFixed(2)} USD
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setStoreNotification(
                        `Added "${prod.name}" ($${prod.priceUsd.toFixed(2)}) to your Rockstar Store bag.`
                      )
                    }
                    className="px-5 py-2.5 rounded-full bg-[#fbd08c] hover:bg-white text-[#11101d] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Add to Rockstar Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Newswire Article Reader Modal */}
      {activeModal.type === 'article' && (
        <div className="relative w-full max-w-3xl bg-[#151426] border border-white/15 rounded-3xl overflow-hidden text-white shadow-2xl my-auto">
          <div className="relative aspect-[16/9] w-full bg-black">
            <img
              src={activeModal.article.image}
              alt={activeModal.article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151426] via-transparent to-black/50" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Article Modal"
              className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/70 hover:bg-black text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
            >
              Close ×
            </button>
          </div>
          <div className="p-6 sm:p-10 space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#fbd08c] font-semibold">
              <span>{activeModal.article.category}</span>
              <span>·</span>
              <span>{activeModal.article.date}</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase text-white">
              {activeModal.article.title}
            </h2>
            <p className="text-base font-semibold text-white/90 leading-relaxed">
              {activeModal.article.summary}
            </p>
            {activeModal.article.content.map((para) => (
              <p key={para} className="text-sm text-white/75 leading-relaxed">
                {para}
              </p>
            ))}
            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onSelectModal({ type: 'preorder', initialEdition: 'ultimate' })}
                className="px-6 py-3 rounded-full bg-[#ffb8c9] hover:bg-white text-[#11101d] font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Pre-Order Grand Theft Auto VI
              </button>
              <button
                type="button"
                onClick={() => onSelectModal({ type: 'trailer', trailerId: 'launch' })}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Watch Launch Trailer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rockstar Propaganda Newsletter Modal */}
      {activeModal.type === 'propaganda' && (
        <div className="relative w-full max-w-lg bg-[#151426] border border-white/15 rounded-3xl p-6 sm:p-10 text-white shadow-2xl my-auto">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <RockstarStarSvg className="w-6 h-6 text-[#ffb8c9]" />
              <h2 className="font-display font-bold text-2xl uppercase text-white">
                Get Rockstar Propaganda
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Propaganda Modal"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold uppercase cursor-pointer"
            >
              Close ×
            </button>
          </div>

          {propSuccess ? (
            <div className="py-8 space-y-4 text-center">
              <p className="text-lg font-bold text-[#e8f878]">
                ✓ You are subscribed to Rockstar Propaganda!
              </p>
              <p className="text-xs text-white/75">
                Dispatches for Grand Theft Auto VI, Vice City events, and exclusive Rockstar Store
                drops will be sent to <strong>{propEmail}</strong>.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-[#ffb8c9] text-[#11101d] font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handlePropagandaSubmit} noValidate className="space-y-4 pt-6">
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Get the latest game announcements, updates on special events and offers, and much
                more from Rockstar Games.
              </p>
              <div>
                <label htmlFor="prop-email" className="block text-xs font-bold uppercase text-white/80 mb-1.5">
                  Email Address
                </label>
                <input
                  id="prop-email"
                  type="email"
                  value={propEmail}
                  onChange={(e) => setPropEmail(e.target.value)}
                  placeholder="lucia@vicecity.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121120] border border-white/15 text-sm text-white focus:outline-none focus:border-[#ffb8c9]"
                />
              </div>
              <div>
                <label htmlFor="prop-year" className="block text-xs font-bold uppercase text-white/80 mb-1.5">
                  Birth Year (ESRB Mature 17+ Verification)
                </label>
                <input
                  id="prop-year"
                  type="number"
                  value={propBirthYear}
                  onChange={(e) => setPropBirthYear(e.target.value)}
                  placeholder="1998"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121120] border border-white/15 text-sm text-white focus:outline-none focus:border-[#ffb8c9]"
                />
              </div>
              {propError && <p className="text-xs text-[#ff799d] font-medium">{propError}</p>}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#ffb8c9] hover:bg-white text-[#11101d] font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Subscribe Now
              </button>
            </form>
          )}
        </div>
      )}

      {/* Full-Stack Developer Credits & Signature Customization Modal */}
      {activeModal.type === 'developer' && (
        <div className="relative w-full max-w-2xl bg-[#151426] border border-[#ffb8c9]/30 rounded-3xl p-6 sm:p-10 text-white shadow-2xl my-auto space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3.5">
              <ViLogoSvg className="w-10 h-7 text-[#ffb8c9]" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#fbd08c]">
                  Full-Stack Engineering Credits
                </p>
                <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase text-white">
                  Desarrollado por {developerProfile.name}
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Developer Credits"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold uppercase cursor-pointer"
            >
              Close ×
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#1c1a33] rounded-2xl p-5 border border-white/10">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                Autor / Desarrollador
              </p>
              <p className="font-bold text-lg text-[#ffb8c9] mt-0.5">{developerProfile.name}</p>
              <p className="text-xs text-white/75">{developerProfile.role}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
                Producción en Render
              </p>
              <a
                href={developerProfile.renderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-sm text-[#e8f878] hover:underline break-all block mt-1"
              >
                {developerProfile.renderUrl}
              </a>
              <p className="text-xs text-white/60 mt-0.5">{developerProfile.email}</p>
            </div>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const check = validateDeveloperProfile({
                name: devName,
                role: devRole,
                email: devEmail,
                renderUrl: devRenderUrl,
              });
              if (!check.valid || !check.sanitized) {
                setDevError(check.error || 'Datos inválidos.');
                return;
              }
              setDevError(null);
              onUpdateDeveloperProfile(check.sanitized);
              setDevSaved(true);
            }}
            noValidate
            className="space-y-4 pt-2"
          >
            <p className="text-xs sm:text-sm text-white/80 font-medium">
              Personaliza cómo aparece tu nombre y firma en toda la página (se guarda en el servidor y en tu navegador):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dev-name" className="block text-xs font-bold uppercase text-white/80 mb-1.5">
                  Tu Nombre / Firma
                </label>
                <input
                  id="dev-name"
                  type="text"
                  value={devName}
                  onChange={(e) => {
                    setDevName(e.target.value);
                    setDevSaved(false);
                  }}
                  placeholder="Martin Calvo Ruiz"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121120] border border-white/15 text-sm text-white focus:outline-none focus:border-[#ffb8c9]"
                />
              </div>
              <div>
                <label htmlFor="dev-role" className="block text-xs font-bold uppercase text-white/80 mb-1.5">
                  Rol / Especialidad
                </label>
                <input
                  id="dev-role"
                  type="text"
                  value={devRole}
                  onChange={(e) => {
                    setDevRole(e.target.value);
                    setDevSaved(false);
                  }}
                  placeholder="Full-Stack Developer"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121120] border border-white/15 text-sm text-white focus:outline-none focus:border-[#ffb8c9]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dev-email" className="block text-xs font-bold uppercase text-white/80 mb-1.5">
                  Email de Contacto
                </label>
                <input
                  id="dev-email"
                  type="email"
                  value={devEmail}
                  onChange={(e) => {
                    setDevEmail(e.target.value);
                    setDevSaved(false);
                  }}
                  placeholder="tinchoccr@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121120] border border-white/15 text-sm text-white focus:outline-none focus:border-[#ffb8c9]"
                />
              </div>
              <div>
                <label htmlFor="dev-render" className="block text-xs font-bold uppercase text-white/80 mb-1.5">
                  URL de Producción (Render)
                </label>
                <input
                  id="dev-render"
                  type="url"
                  value={devRenderUrl}
                  onChange={(e) => {
                    setDevRenderUrl(e.target.value);
                    setDevSaved(false);
                  }}
                  placeholder="https://gtavi-clone.onrender.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121120] border border-white/15 text-sm text-white focus:outline-none focus:border-[#ffb8c9]"
                />
              </div>
            </div>

            {devError && <p className="text-xs text-[#ff799d] font-medium">{devError}</p>}
            {devSaved && (
              <p className="text-xs text-[#e8f878] font-bold">
                ✓ ¡Firma actualizada! Ahora toda la página muestra &ldquo;Desarrollado por {devName}&rdquo;.
              </p>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-[#ffb8c9] hover:bg-white text-[#11101d] font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Guardar Firma en la Web
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
