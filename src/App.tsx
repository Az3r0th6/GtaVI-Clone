/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavbarAndHero } from './components/NavbarAndHero';
import { TrailersAndEditionsSection } from './components/TrailersAndEditionsSection';
import { WorldShopAndNewsSection } from './components/WorldShopAndNewsSection';
import { InteractiveModals, type ActiveModal } from './components/InteractiveModals';

export default function App() {
  const [activeModal, setActiveModal] = useState<ActiveModal>({ type: 'none' });
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

  useEffect(() => {
    fetch('/api/state')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        if (data.trailerViews) setTrailerViews(data.trailerViews);
        if (data.radioStationPlays) setRadioPlays(data.radioStationPlays);
        if (data.propagandaCount) setPropagandaCount(data.propagandaCount);
        if (Array.isArray(data.preorders)) setReservations(data.preorders);
      })
      .catch(() => {});
  }, []);

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
          reservationCount={reservations.length}
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
          propagandaCount={propagandaCount}
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
      />
    </div>
  );
}
