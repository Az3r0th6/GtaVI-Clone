export interface TrailerItem {
  id: 'launch' | 'extended' | 'trailer2' | 'trailer1';
  kicker: string;
  title: string;
  duration: string;
  releaseDate: string;
  thumbnail: string;
  description: string;
  musicTrack: string;
  highlights: string[];
  chapters: { time: string; label: string }[];
}

export interface RadioStation {
  id: string;
  name: string;
  frequency: string;
  genre: string;
  host: string;
  tagline: string;
  accentColor: string;
  bpm: number;
  baseFreq: number;
  tracks: { artist: string; title: string; year: string }[];
}

export interface LeonidaLocation {
  id: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  image: string;
  landmarks: string[];
  protagonistNote: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  category: 'Key Art' | 'Screenshots' | 'Wallpapers';
  resolution: string;
  aspect: string;
  src: string;
  caption: string;
}

export interface StoreProduct {
  id: string;
  category: 'Merchandise' | 'Collector’s Box';
  name: string;
  subtitle: string;
  priceUsd: number;
  image: string;
  specs: string[];
}

export interface NewswireArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  summary: string;
  content: string[];
}

export const TRAILERS: TrailerItem[] = [
  {
    id: 'launch',
    kicker: 'WATCH',
    title: 'LAUNCH TRAILER',
    duration: '02:48',
    releaseDate: 'October 15, 2026',
    thumbnail: '/assets/vi/featured_launch.jpg',
    description:
      'Step into the sun-soaked streets and neon back-alleys of Vice City and the wider state of Leonida. Jason and Lucia face a sprawling state-wide conspiracy where loyalty is the only currency left.',
    musicTrack: 'Hot Together — The Pointer Sisters (Vice Remix)',
    highlights: [
      'Captured in real-time 4K 60FPS on PlayStation 5 & Xbox Series X',
      'Showcases dynamic hurricane weather fronts across the Leonida Keys',
      'First look at synchronized dual-protagonist heist planning',
    ],
    chapters: [
      { time: '00:00', label: 'Ocean View Sunrise' },
      { time: '00:42', label: 'The Port Gellhorn Job' },
      { time: '01:28', label: 'Grassrivers Airboat Chase' },
      { time: '02:10', label: 'Trust — Jason & Lucia' },
    ],
  },
  {
    id: 'extended',
    kicker: 'WATCH',
    title: 'AN EXTENDED LOOK',
    duration: '05:14',
    releaseDate: 'September 24, 2026',
    thumbnail: '/assets/vi/extended_look.jpg',
    description:
      'An in-depth gameplay breakdown exploring Leonida’s living ecosystem, seamless character switching between Lucia and Jason, vehicle customization, and street-level hustles.',
    musicTrack: 'Childish Gambino — Miami Midnight (Original Score)',
    highlights: [
      'Deep-dive into seamless instant switching between Lucia and Jason',
      'Next-generation vehicle physics, lowrider hydraulics, and marine craft',
      'Interactive social media & Vice City nightlife economy',
    ],
    chapters: [
      { time: '00:00', label: 'Welcome to Leonida' },
      { time: '01:35', label: 'Dual Protagonist Mechanics' },
      { time: '03:10', label: 'Vice Beach Nightlife' },
      { time: '04:20', label: 'High-Stakes Robberies' },
    ],
  },
  {
    id: 'trailer2',
    kicker: 'WATCH',
    title: 'TRAILER 2',
    duration: '01:56',
    releaseDate: 'May 12, 2026',
    thumbnail: '/assets/vi/trailer_2.jpg',
    description:
      'Jason Duval’s past catches up with him as an easy score in Vice Beach spirals into a federal crackdown across three counties.',
    musicTrack: 'Flock of Seagulls — I Ran (Leonida Edit)',
    highlights: [
      'Introduces Port Gellhorn and Lake Leonida industrial corridors',
      'High-speed causeway pursuit with Leonida Highway Patrol',
      'First narrative reveal of the Vice City cartel syndicates',
    ],
    chapters: [
      { time: '00:00', label: 'Motel Briefing' },
      { time: '00:50', label: 'Venetian Causeway Ambush' },
      { time: '01:30', label: 'No Turning Back' },
    ],
  },
  {
    id: 'trailer1',
    kicker: 'WATCH',
    title: 'TRAILER 1',
    duration: '01:31',
    releaseDate: 'December 4, 2023',
    thumbnail: '/assets/vi/trailer_1.jpg',
    description:
      'The record-shattering debut reveal of Grand Theft Auto VI. Meet Lucia and return to Vice City, the brightest neon jewel of the state of Leonida.',
    musicTrack: 'Tom Petty — Love Is A Long Road',
    highlights: [
      'Over 248 Million global views across official channels',
      'Iconic introduction of Lucia at Leonida Department of Corrections',
      'First glimpse of Ocean Beach, Kelly County wetlands, and Vice City skyline',
    ],
    chapters: [
      { time: '00:00', label: 'Bad Luck, I Guess' },
      { time: '00:35', label: 'Ocean Beach Boulevard' },
      { time: '01:12', label: 'Trust.' },
    ],
  },
];

export const RADIO_STATIONS: RadioStation[] = [
  {
    id: 'flash_fm',
    name: 'FLASH FM 102.7',
    frequency: '102.7 FM',
    genre: '80s Pop Classics & Modern Synthwave',
    host: 'Toni & Julian',
    tagline: 'Still flashing across the Vice City skyline since 1986.',
    accentColor: '#ff799d',
    bpm: 118,
    baseFreq: 220,
    tracks: [
      { artist: 'Tom Petty', title: 'Love Is A Long Road', year: '1989' },
      { artist: 'The Weeknd', title: 'Out of Time (Vice Edit)', year: '2022' },
      { artist: 'Hall & Oates', title: 'Out of Touch', year: '1984' },
      { artist: 'Kavinsky & Daft Club', title: 'Venetian Causeway', year: '2026' },
    ],
  },
  {
    id: 'calle_ocho',
    name: 'CALLE OCHO 98.3',
    frequency: '98.3 FM',
    genre: 'Reggaeton, Latin Trap & Miami Dembow',
    host: 'DJ Laz & Bad Gyal',
    tagline: 'El ritmo que quema el asfalto desde Little Havana hasta Vice Beach.',
    accentColor: '#fbd08c',
    bpm: 96,
    baseFreq: 165,
    tracks: [
      { artist: 'Bad Bunny & Feid', title: 'Noche en Leonida', year: '2026' },
      { artist: 'Rosalía', title: 'Despechá (Ocean Drive Dub)', year: '2023' },
      { artist: 'Don Omar', title: 'Danza Kuduro', year: '2010' },
      { artist: 'Rauw Alejandro', title: 'Biscayne Boulevard', year: '2026' },
    ],
  },
  {
    id: 'vice_beach_underground',
    name: 'CLUB MIRAGE 106.1',
    frequency: '106.1 FM',
    genre: 'Miami Bass, Electro & Afterhours House',
    host: 'Peggy Gou & Danny Tenaglia',
    tagline: 'Live from the rooftop terraces of Starfish Island until sunrise.',
    accentColor: '#e8f878',
    bpm: 128,
    baseFreq: 261.6,
    tracks: [
      { artist: '2 Live Crew', title: 'Shake A Lil Somethin', year: '1996' },
      { artist: 'Peggy Gou', title: '(It Goes Like) Nanana', year: '2023' },
      { artist: 'Disclosure', title: 'Starfish Sunrise', year: '2026' },
      { artist: 'Egyptian Lover', title: 'Freak-A-Holic', year: '1986' },
    ],
  },
  {
    id: 'gator_country',
    name: 'GRASSRIVERS 94.5',
    frequency: '94.5 FM',
    genre: 'Southern Rock, Outlaw Country & Swamp Blues',
    host: 'Cletus & Billy Ray',
    tagline: 'Broadcasting 100,000 watts of pure fanboat horsepower from Kelly County.',
    accentColor: '#f79d84',
    bpm: 104,
    baseFreq: 196,
    tracks: [
      { artist: 'Creedence Clearwater Revival', title: 'Run Through the Jungle', year: '1970' },
      { artist: 'Chris Stapleton', title: 'White Horse', year: '2023' },
      { artist: 'Lynyrd Skynyrd', title: 'Call Me the Breeze', year: '1974' },
      { artist: 'Sturgill Simpson', title: 'Gator Hook Blues', year: '2026' },
    ],
  },
];

export const LEONIDA_LOCATIONS: LeonidaLocation[] = [
  {
    id: 'vice_city',
    name: 'Vice City & Ocean Beach',
    region: 'Vice-Dale County',
    tagline: 'The darkest side of the sunniest place in America.',
    description:
      'Pastel Art Deco hotels, luxury glass penthouses, and packed beachfront boulevards hide a cutthroat underground economy ruled by syndicates, influencers, and corrupt officials.',
    image: '/assets/vi/divider_skyline.jpg',
    landmarks: ['Ocean View Hotel', 'Starfish Island Mansions', 'Vice Port Container Terminal', 'Little Cuba & Calle Ocho'],
    protagonistNote: 'Lucia grew up running the blocks behind Ocean Drive — every alley is either an escape route or an ambush.',
  },
  {
    id: 'leonida_keys',
    name: 'The Leonida Keys',
    region: 'Southern Archipelago',
    tagline: 'One highway in. One highway out. Endless open water.',
    description:
      'Connected by the monumental Overseas Causeway, the Keys are a sun-bleached paradise for smugglers, charter captains, and fugitives looking to vanish off the grid.',
    image: '/assets/vi/divider_car.jpg',
    landmarks: ['Seven-Mile Overseas Bridge', 'Pelican Bay Marina', 'Sunken Reef Drop-Off', 'Conch Republic Tiki Bar'],
    protagonistNote: 'Jason worked the docks in the Keys before meeting Lucia — he knows which coast guard patrols can be bought.',
  },
  {
    id: 'grassrivers',
    name: 'Grassrivers & Kelly County',
    region: 'Central Wetlands',
    tagline: 'Untamed marshes where evidence disappears beneath the sawgrass.',
    description:
      'Vast subtropical wetlands teeming with alligators, airboat poachers, off-grid compounds, and mud-bogging tracks where state troopers rarely venture after dusk.',
    image: '/assets/vi/leonida_card.jpg',
    landmarks: ['Gator Keys Airboat Outpost', 'Kelly County Mud Flats', 'Abandoned Sugar Mill', 'Cypress Moonshine Stills'],
    protagonistNote: 'When the heat in Vice City turns federal, the Grassrivers are the only place radar cannot track a low-flying plane.',
  },
  {
    id: 'port_gellhorn',
    name: 'Port Gellhorn',
    region: 'West Coast Industrial',
    tagline: 'Rust-belt grit meets Gulf Coast hustle.',
    description:
      'A sprawling working-class port town of pawn shops, strip malls, motel strips, and high-octane street takeovers where Jason and Lucia pull their first string of robberies.',
    image: '/assets/vi/media_card.jpg',
    landmarks: ['Uncle Jack’s Liquor & Pawn', 'Gellhorn Speedway', 'Flamingo Motel Strip', 'West Coast Shipyards'],
    protagonistNote: 'Where the easy score went sideways and triggered the state-wide manhunt.',
  },
];

export const MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'media-1',
    title: 'Jason & Lucia — Vice City Sunset Key Art',
    category: 'Key Art',
    resolution: '3840 × 2160 (4K UHD)',
    aspect: '16:9',
    src: '/assets/vi/featured_launch.jpg',
    caption: 'Official Grand Theft Auto VI Launch Key Art featuring Jason and Lucia in Vice City.',
  },
  {
    id: 'media-2',
    title: 'Ocean Beach Classic Convertible',
    category: 'Screenshots',
    resolution: '3840 × 2160 (4K UHD)',
    aspect: '16:9',
    src: '/assets/vi/divider_car.jpg',
    caption: 'Jason and Lucia on the Vice Beach coast in a custom classic sports coupe.',
  },
  {
    id: 'media-3',
    title: 'Vice City Dusk Skyline & Port',
    category: 'Screenshots',
    resolution: '3840 × 2160 (4K UHD)',
    aspect: '16:9',
    src: '/assets/vi/divider_skyline.jpg',
    caption: 'Aerial view over Vice Port and downtown Vice City at twilight.',
  },
  {
    id: 'media-4',
    title: 'Ocean View Hotel — Vintage Vice City',
    category: 'Screenshots',
    resolution: '3840 × 2160 (4K UHD)',
    aspect: '16:9',
    src: '/assets/vi/vintage_pack.jpg',
    caption: 'Neon glow outside the historic Ocean View Hotel on Ocean Drive.',
  },
  {
    id: 'media-5',
    title: 'Port Gellhorn Vault Heist',
    category: 'Screenshots',
    resolution: '3840 × 2160 (4K UHD)',
    aspect: '16:9',
    src: '/assets/vi/media_card.jpg',
    caption: 'High-stakes tactical robbery deep inside Leonida’s financial district.',
  },
  {
    id: 'media-6',
    title: 'Grand Theft Auto VI Collage Poster',
    category: 'Wallpapers',
    resolution: '2560 × 1440 (QHD)',
    aspect: '16:9',
    src: '/assets/vi/poster_full.jpg',
    caption: 'Official multi-panel Grand Theft Auto VI illustration mosaic.',
  },
];

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'merch-apparel',
    category: 'Merchandise',
    name: 'Premium Apparel, Collectibles & More',
    subtitle: 'Official Grand Theft Auto VI Embroidered Denim, Vice City Tees, Caps & Accessories',
    priceUsd: 54.99,
    image: '/assets/vi/merch_card.jpg',
    specs: [
      'Heavyweight 450GSM Embroidered VI Palm Denim Jacket & Tees',
      'Official Vice City "The Goodtime State" Graphic Collection',
      'Rockstar Store Exclusive Enamel Keychains & Snapback Caps',
      'Ships worldwide with complimentary Rockstar VI vinyl sticker pack',
    ],
  },
  {
    id: 'collectors-box',
    category: 'Collector’s Box',
    name: 'The Vice City Collection',
    subtitle: 'Limited-Run Collector’s Box featuring Custom Apparel, Art Prints & Leonida Memorabilia',
    priceUsd: 199.99,
    image: '/assets/vi/collectors_card.png',
    specs: [
      'Numbered Collector’s Presentation Box with UV Neon Foil Finish',
      'Includes "The Goodtime State" Vintage Postcard & Poster Set',
      'Exclusive Leonida License Plate Replica & Ocean View Room Keytag',
      'Priority pre-order allocation for Rockstar Store members',
    ],
  },
];

export const NEWSWIRE_ARTICLES: NewswireArticle[] = [
  {
    id: 'news-launch-trailer',
    title: 'Watch the Grand Theft Auto VI Launch Trailer',
    date: 'October 15, 2026',
    category: 'Grand Theft Auto VI',
    image: '/assets/vi/news_1.jpg',
    summary:
      'Grand Theft Auto VI arrives November 19, 2026 on PlayStation 5 and Xbox Series X|S. Watch the new Launch Trailer now and pre-order your copy today.',
    content: [
      'Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet.',
      'Watch the official Launch Trailer above, captured entirely in-game on PlayStation 5, and pre-order the Standard or Ultimate Edition today to receive the Vintage Vice City Pack bonus at launch on November 19, 2026.',
    ],
  },
  {
    id: 'news-store-collection',
    title: 'Grand Theft Auto VI Collection Now at the Rockstar Store',
    date: 'October 8, 2026',
    category: 'Rockstar Store',
    image: '/assets/vi/news_2.jpg',
    summary:
      'Gear up for your trip to Leonida with the official Grand Theft Auto VI Merchandise Collection and The Vice City Collector’s Box.',
    content: [
      'The first wave of official Grand Theft Auto VI apparel and collectibles has arrived at the Rockstar Store, featuring heavyweight embroidered VI palm tees, two-tone snapback caps, canvas totes, and limited-edition collectibles.',
      'Explore the full lineup or reserve The Vice City Collection Collector’s Box while supplies last.',
    ],
  },
  {
    id: 'news-radio-music',
    title: 'The Music of Grand Theft Auto VI: In-Game Radio Stations',
    date: 'October 8, 2026',
    category: 'Music & Radio',
    image: '/assets/vi/news_3.jpg',
    summary:
      'Preview hand-picked stations from the biggest and widest-ranging selection of in-game radio yet, plus details on GTAVI: The Album.',
    content: [
      'From 80s synth-pop classics on Flash FM to booming Miami bass, Latin trap on Calle Ocho, and swamp-rock anthems echoing across the Grassrivers, Grand Theft Auto VI features over 30 curated radio stations.',
      'Tune in with our interactive station previewer and pre-order GTAVI: The Album on vinyl and digital formats.',
    ],
  },
];
