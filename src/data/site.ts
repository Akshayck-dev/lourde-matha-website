/* ------------------------------------------------------------------ */
/*  Lourde Matha Church, Thalayanadu — central content                   */
/*  Parish identity facts below are real. Items marked "confirm" are     */
/*  placeholders the parish office should verify before publishing.      */
/* ------------------------------------------------------------------ */

export const PARISH = {
  name: 'Lourde Matha Church',
  place: 'Thalayanadu',
  tagline: 'A Place of Faith, Hope & Grace',
  diocese: 'Eparchy of Kothamangalam · Thodupuzha Forane',
  rite: 'Syro-Malabar Catholic',
  established: '26 October 1935',
  establishedYear: 1935,
  patrons: 'Our Lady of Lourdes & St. Sebastian',
  vicar: 'Fr. Sebastian Thumbamattam',
  vicarRole: 'Vicar',
  phone: '+91 4862 258 257',
  phoneHref: 'tel:+914862258257',
  email: 'lourdemathathalayanadu@gmail.com',
  addressLines: [
    'Kolapra–Thalayanadu Road, Thalayanadu P.O.',
    'Thodupuzha, Idukki, Kerala 685585',
  ],
  // verified from the parish's Google Maps listing (shared 2026-09-23)
  malayalamName: 'ലൂർദ് മാതാ പള്ളി',
  plusCode: 'RQQF+WV4',
  coordinates: { lat: 9.8397585, lng: 76.7747155 },
  googleRating: { stars: 4.5, reviews: 76 },
  amenities: 'Wheelchair-accessible parking · Restroom',
  grotto: 'The Lourde Matha Grotto stands nearby — a quiet place for prayer.',
  // confirm: office hours with the parish office
  officeHours: 'Mon – Sat · 9:00 AM – 1:00 PM',
  mapsUrl:
    'https://www.google.com/maps/place/Lourde+Matha+Church,+Thalayanadu/@9.8397585,76.7747155,17z',
  mapsEmbed:
    'https://www.google.com/maps?q=9.8397585,76.7747155&z=17&output=embed',
};

/* ------------------------- Mass / Qurbana --------------------------- */
/* Timings as used on the parish site (provided 2026-09-20).            */
/* Confirm with the parish office before any public announcement.       */

export interface MassEntry {
  id: string;
  label: string;
  days: number[]; // JS getDay(): 0 = Sunday … 6 = Saturday
  times: string[];
  note: string;
}

export const MASS_SCHEDULE: MassEntry[] = [
  {
    id: 'sunday',
    label: 'Sunday Mass',
    days: [0],
    times: ['6:00 AM', '9:30 AM'],
    note: 'Sunday Holy Qurbana',
  },
  {
    id: 'weekday',
    label: 'Tuesday – Friday Mass',
    days: [2, 3, 4, 5],
    times: ['6:00 AM'],
    note: 'Weekday Holy Qurbana',
  },
  {
    id: 'saturday',
    label: 'Saturday Mass',
    days: [6],
    times: ['6:30 AM'],
    note: 'Saturday Holy Qurbana',
  },
  {
    id: 'confession',
    label: 'Confession',
    days: [6],
    times: ['5:00 – 6:00 PM'],
    note: 'Sacrament of Reconciliation · also available on request',
  },
  {
    id: 'novena',
    label: 'Novena to Our Lady',
    days: [6],
    times: ['5:30 PM'],
    note: 'Saturday evening novena & devotion',
  },
];

export function todaysMassEntries(): MassEntry[] {
  const today = new Date().getDay();
  return MASS_SCHEDULE.filter((m) => m.days.includes(today));
}

/* ------------------------------ Events ------------------------------ */

export type EventCategory = 'Feast' | 'Mass' | 'Community' | 'Prayer' | 'Special';

export interface ParishEvent {
  id: string;
  title: string;
  category: EventCategory;
  dateLabel: string;
  time: string;
  location: string;
  description: string;
  image: string; // key into IMAGES
}

export const EVENT_CATEGORIES: ('All' | EventCategory)[] = [
  'All',
  'Feast',
  'Mass',
  'Community',
  'Prayer',
  'Special',
];

// confirm: dates & details with the parish office before publishing
export const EVENTS: ParishEvent[] = [
  {
    id: 'feast-lourdes',
    title: 'Feast of Our Lady of Lourdes',
    category: 'Feast',
    dateLabel: 'February 11',
    time: '5:00 PM onwards',
    location: 'Parish Church',
    description:
      'Our patronal feast — solemn festal Holy Qurbana, candlelight Marian procession and parish agape.',
    image: 'event-feast',
  },
  {
    id: 'novena-lourdes',
    title: 'Novena to Our Lady of Lourdes',
    category: 'Prayer',
    dateLabel: 'February 2 – 10',
    time: '6:00 PM daily',
    location: 'Parish Church',
    description:
      'Nine evenings of rosary, reflection and intercession preparing our hearts for the patronal feast.',
    image: 'gallery-candles',
  },
  {
    id: 'feast-sebastian',
    title: 'Feast of St. Sebastian',
    category: 'Feast',
    dateLabel: 'January 20',
    time: '6:00 AM & 5:00 PM',
    location: 'Parish Church',
    description:
      'Honouring our co-patron — festal Qurbana and special intercessory prayers for the parish.',
    image: 'gallery-altar',
  },
  {
    id: 'holy-hour',
    title: 'First Friday Holy Hour',
    category: 'Prayer',
    dateLabel: 'First Friday, monthly',
    time: '6:00 PM',
    location: 'Parish Church',
    description:
      'An hour of Eucharistic adoration, silent prayer and blessing for families and the parish.',
    image: 'life-prayer',
  },
  {
    id: 'youth-gathering',
    title: 'Youth & Choir Gathering',
    category: 'Community',
    dateLabel: 'Second Sunday, monthly',
    time: '11:00 AM',
    location: 'Parish Hall',
    description:
      'Our young parishioners and choir come together for fellowship, music practice and planning.',
    image: 'event-youth',
  },
  {
    id: 'christmas',
    title: 'Christmas — Midnight Qurbana',
    category: 'Special',
    dateLabel: 'December 24 – 25',
    time: '11:30 PM onwards',
    location: 'Parish Church',
    description:
      'Carols, the midnight Qurbana and the joy of the Nativity shared by the whole parish family.',
    image: 'interior-nave',
  },
];

/* ------------------------------ Gallery ----------------------------- */

export type GalleryCategory = 'Church' | 'Holy Mass' | 'Feast' | 'Community' | 'Events';

export interface GalleryItem {
  image: string;
  caption: string;
  category: GalleryCategory;
  tall?: boolean;
}

export const GALLERY_CATEGORIES: ('All' | GalleryCategory)[] = [
  'All',
  'Church',
  'Holy Mass',
  'Feast',
  'Community',
  'Events',
];

export const GALLERY: GalleryItem[] = [
  { image: 'gallery-exterior', caption: 'Church Exterior', category: 'Church', tall: true },
  { image: 'interior-nave', caption: 'The Nave', category: 'Church' },
  { image: 'gallery-altar', caption: 'The Altar', category: 'Holy Mass', tall: true },
  { image: 'life-mass', caption: 'Sunday Qurbana', category: 'Holy Mass' },
  { image: 'gallery-stainedglass', caption: 'Stained Glass', category: 'Church' },
  { image: 'event-feast', caption: 'Feast Procession', category: 'Feast', tall: true },
  { image: 'gallery-candles', caption: 'Votive Candles', category: 'Feast' },
  { image: 'community-group', caption: 'Parish Family', category: 'Community' },
  { image: 'life-community', caption: 'After Sunday Mass', category: 'Community', tall: true },
  { image: 'life-prayer', caption: 'In Prayer', category: 'Events' },
  { image: 'welcome-facade', caption: 'The Entrance', category: 'Church' },
  { image: 'event-youth', caption: 'Youth Choir', category: 'Events' },
];

/* --------------------------- Parish story --------------------------- */

export interface Milestone {
  year: string;
  title: string;
  text: string;
}

export const MILESTONES: Milestone[] = [
  {
    year: '1935',
    title: 'A Parish is Born',
    text: 'Lourde Matha Church is established at Thalayanadu on 26 October 1935, under the Eparchy of Kothamangalam — a new spiritual home for the Catholic families of the region.',
  },
  {
    year: 'Early Decades',
    title: 'Faith Takes Root',
    text: 'Generations gather around the altar. Devotion to Our Lady of Lourdes and St. Sebastian shapes the rhythm of parish life — feasts, novenas and quiet daily prayer.',
  },
  {
    year: 'Growth',
    title: 'A Community Flourishes',
    text: 'The parish family grows. Catechism, choir, youth and charitable works take shape, carrying the light of the Gospel into homes across Thalayanadu.',
  },
  {
    year: 'Today',
    title: 'Ninety Years of Grace',
    text: 'Nine decades on, the bells still ring over Thalayanadu. Ancient Syro-Malabar liturgy, living community, and a welcome open to every seeker who walks through our doors.',
  },
];

export const VALUES = [
  {
    title: 'Faith',
    text: 'Rooted in the Syro-Malabar tradition, we gather around the Eucharist as the source and summit of our life.',
  },
  {
    title: 'Service',
    text: 'From the altar to the neighbourhood — we serve the poor, the sick and the lonely in Christ’s name.',
  },
  {
    title: 'Community',
    text: 'One parish family across generations, bound by prayer, fellowship and shared responsibility.',
  },
  {
    title: 'Compassion',
    text: 'Every person who enters our doors is met with warmth, dignity and the mercy of God.',
  },
];

export const MISSION =
  'To be a living sanctuary of faith in Thalayanadu — where the Holy Qurbana is celebrated with reverence, every family is known by name, and the love of Christ reaches beyond our walls into the world.';

/* ---------------------------- Offerings ------------------------------ */
// NOTE (2026-09-23): structure modelled on peringuzhachurch.org/offerings,
// shared by the user as the reference. Amounts and bank details below are
// PLACEHOLDERS ('—') — confirm the real rate list and the parish's bank
// account with the parish office before publishing.

export interface OfferingItem {
  ml: string;
  en: string;
  amount: string;
}

export const OFFERING_RATES: OfferingItem[] = [
  { ml: 'പാട്ടുകുർബാന', en: 'Sung Mass', amount: '—' },
  { ml: 'കുർബാന', en: 'Holy Qurbana', amount: '—' },
  { ml: 'നൊവേന', en: 'Novena', amount: '—' },
  { ml: 'ലദീഞ്ഞ്', en: 'Litany', amount: '—' },
  { ml: 'ഇടവക തിരുനാൾ പ്രസുദേന്തി', en: 'Parish Feast Offering', amount: '—' },
  { ml: 'തിരുനാൾ നേർച്ച', en: 'Feast Day Offering', amount: '—' },
];

export const OFFERING_BANK = [
  { label: 'A/c No', value: '—' },
  { label: 'A/c Name', value: '—' },
  { label: 'Branch', value: '—' },
  { label: 'IFSC', value: '—' },
];

/* ------------------------------ Nav --------------------------------- */

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Mass Timings', to: '/mass-timings' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Offerings', to: '/offerings' },
  { label: 'Contact', to: '/contact' },
];
