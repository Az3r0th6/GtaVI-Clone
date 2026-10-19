/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { NavbarAndHero } from './components/NavbarAndHero';
import { TrailersAndEditionsSection } from './components/TrailersAndEditionsSection';
import { WorldShopAndNewsSection } from './components/WorldShopAndNewsSection';
import { InteractiveModals, type ActiveModal } from './components/InteractiveModals';
import {
  parseRouteToModal,
  modalToPathname,
  DEFAULT_DEVELOPER_PROFILE,
  type DeveloperProfile,
} from './utils/preorderLogic';

const DEV_STORAGE_KEY = 'rsg_vi_developer_profile_v2';

export default function App() {
  const [activeModal, setActiveModalState] = useState<ActiveModal>(() => {
    if (typeof window === 'undefined') return { type: 'none' };
    const parsed = parseRouteToModal(window.location.pathname);
    if (parsed.type === 'trailer') {
      return { type: 'trailer', trailerId: parsed.trailerId || 'launch' };
    }
    if (parsed.type === 'preorder') {
      return { type: 'preorder', initialEdition: parsed.initialEdition || 'ultimate' };
    }
    if (
      parsed.type === 'radio' ||
      parsed.type === 'leonida' ||
      parsed.type === 'media' ||
      parsed.type === 'store' ||
      parsed.type === 'propaganda' ||
      parsed.type === 'developer'
    ) {
      return { type: parsed.type };
    }
    return { type: 'none' };
  });

  const [developerProfile, setDeveloperProfile] = useState<DeveloperProfile>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryDev = params.get('dev') || params.get('autor');
      if (queryDev && queryDev.trim().length >= 2) {
        const custom = { ...DEFAULT_DEVELOPER_PROFILE, name: queryDev.trim() };
        try {
          window.localStorage.setItem(DEV_STORAGE_KEY, JSON.stringify(custom));
        } catch {}
        return custom;
      }
      try {
        const saved = window.localStorage.getItem(DEV_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed.name === 'string' && parsed.name.trim().length >= 2) {
            return { ...DEFAULT_DEVELOPER_PROFILE, ...parsed };
          }
        }
      } catch {}
    }
    const envName = (import.meta as any).env?.VITE_DEVELOPER_NAME;
    if (envName && String(envName).trim().length >= 2) {
      return { ...DEFAULT_DEVELOPER_PROFILE, name: String(envName).trim() };
    }
    return DEFAULT_DEVELOPER_PROFILE;
  });

  const [trailerViews, setTrailerViews] = useState<Record<string, number>>({
    launch: 84290410,
    extended: 51920185,
    trailer2: 142850900,
    trailer1: 248910320,
  });
  const [radioPlays, setRadioPlays] = useState<Record<string, number>>({
    flash_fm: 194200,
    calle_ocho: 173850,
    vice_beach_underground: 158400,
    gator_country: 112300,
  });
  const [propagandaCount, setPropagandaCount] = useState<number>(1428501);
  const [reservations, setReservations] = useState<any[]>([]);

  const setActiveModal = useCallback((modal: ActiveModal) => {
    setActiveModalState(modal);
    if (typeof window !== 'undefined') {
      const targetPath = modalToPathname(modal as { type: string; trailerId?: string });
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const onPopState = () => {
        const parsed = parseRouteToModal(window.location.pathname);
        if (parsed.type === 'trailer') {
          setActiveModalState({ type: 'trailer', trailerId: parsed.trailerId || 'launch' });
        } else if (parsed.type === 'preorder') {
          setActiveModalState({ type: 'preorder', initialEdition: parsed.initialEdition || 'ultimate' });
        } else if (
          parsed.type === 'radio' ||
          parsed.type === 'leonida' ||
          parsed.type === 'media' ||
          parsed.type === 'store' ||
          parsed.type === 'propaganda' ||
          parsed.type === 'developer'
        ) {
          setActiveModalState({ type: parsed.type });
        } else {
          setActiveModalState({ type: 'none' });
        }
      };
      window.addEventListener('popstate', onPopState);
      return () => window.removeEventListener('popstate', onPopState);
    }
  }, []);

  useEffect(() => {
    fetch('/api/state')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        if (data.trailerViews) setTrailerViews(data.trailerViews);
        if (data.radioStationPlays) setRadioPlays(data.radioStationPlays);
        if (data.propagandaCount) setPropagandaCount(data.propagandaCount);
        if (Array.isArray(data.preorders)) setReservations(data.preorders);
        if (data.developerProfile && typeof window !== 'undefined') {
          const hasLocalOverride = window.localStorage.getItem(DEV_STORAGE_KEY);
          if (!hasLocalOverride) {
            setDeveloperProfile(data.developerProfile);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleUpdateDeveloperProfile = (updated: DeveloperProfile) => {
    setDeveloperProfile(updated);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(DEV_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
    }
    fetch('/api/developer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(() => {});
  };

  const handleRecordTrailerView = (id: string) => {
    setTrailerViews((prev) => ({ ...prev, [id]: (prev[id] || 100000) + 1 }));
    fetch(`/api/trailers/${id}/view`, { method: 'POST' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.trailerViews) setTrailerViews(data.trailerViews);
      })
      .catch(() => {});
  };

  const handleRecordRadioPlay = (stationId: string) => {
    setRadioPlays((prev) => ({ ...prev, [stationId]: (prev[stationId] || 10000) + 1 }));
    fetch(`/api/radio/${stationId}/listen`, { method: 'POST' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.radioStationPlays) setRadioPlays(data.radioStationPlays);
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#11101d] text-white selection:bg-[#ffb8c9] selection:text-[#11101d]">
      <main>
        <NavbarAndHero
          onOpenTrailer={(trailerId) => setActiveModal({ type: 'trailer', trailerId })}
          onOpenPreorder={(initialEdition) => setActiveModal({ type: 'preorder', initialEdition })}
          onOpenNavMenu={() => setActiveModal({ type: 'nav' })}
          onOpenDeveloper={() => setActiveModal({ type: 'developer' })}
          reservationCount={reservations.length}
          developerName={developerProfile.name}
        />

        <TrailersAndEditionsSection
          onOpenTrailer={(trailerId) => setActiveModal({ type: 'trailer', trailerId })}
          onOpenPreorder={(initialEdition) => setActiveModal({ type: 'preorder', initialEdition })}
        />

        <WorldShopAndNewsSection
          onOpenRadio={() => setActiveModal({ type: 'radio' })}
          onOpenLeonida={() => setActiveModal({ type: 'leonida' })}
          onOpenMedia={() => setActiveModal({ type: 'media' })}
          onOpenStore={(initialCategory) => setActiveModal({ type: 'store', initialCategory })}
          onOpenArticle={(article) => setActiveModal({ type: 'article', article })}
          onOpenPropaganda={() => setActiveModal({ type: 'propaganda' })}
          onOpenDeveloper={() => setActiveModal({ type: 'developer' })}
          propagandaCount={propagandaCount}
          developerProfile={developerProfile}
        />
      </main>

      <InteractiveModals
        activeModal={activeModal}
        onClose={() => setActiveModal({ type: 'none' })}
        onSelectModal={(modal) => setActiveModal(modal)}
        trailerViews={trailerViews}
        onRecordTrailerView={handleRecordTrailerView}
        radioPlays={radioPlays}
        onRecordRadioPlay={handleRecordRadioPlay}
        reservations={reservations}
        onReservationCreated={(record) => setReservations((prev) => [record, ...prev])}
        onPropagandaSubscribed={(newTotal) => setPropagandaCount(newTotal)}
        developerProfile={developerProfile}
        onUpdateDeveloperProfile={handleUpdateDeveloperProfile}
      />
    </div>
  );
}
