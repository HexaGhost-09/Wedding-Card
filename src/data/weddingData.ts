export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface EventDetail {
  id: string;
  title: string;
  time: string;
  location: string;
  address: string;
  description: string;
  iconName: "ring" | "glass" | "utensils" | "music";
}

export interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: "Couple" | "Moments" | "Venue" | "Celebration";
  aspectRatio?: "square" | "tall" | "wide";
}

export interface WeddingData {
  couple: {
    brideFirstName: string;
    brideLastName: string;
    groomFirstName: string;
    groomLastName: string;
    initials: string;
    tagline: string;
    welcomeMessage: string;
    heroImage: string;
    closingImage: string;
    storyHeading: string;
    storyContent: string[];
    bridePhoto: string;
    groomPhoto: string;
    couplePhoto: string;
  };
  date: {
    targetIsoDate: string; // e.g., "2026-09-20T16:00:00"
    displayDate: string;
    displayTime: string;
    dayOfWeek: string;
  };
  venue: {
    name: string;
    subtitle: string;
    cityState: string;
    address: string;
    description: string;
    image: string;
    mapCoordinates: {
      lat: number;
      lng: number;
    };
    googleMapsUrl: string;
    parkingInfo: string;
    dressCode: string;
    dressCodeNote: string;
  };
  timeline: TimelineItem[];
  events: EventDetail[];
  gallery: GalleryImage[];
  rsvpOptions: {
    mealPreferences: string[];
    maxGuestsAllowed: number;
  };
}

export const weddingData: WeddingData = {
  couple: {
    brideFirstName: "Eleanor",
    brideLastName: "Vance",
    groomFirstName: "Alexander",
    groomLastName: "Wright",
    initials: "E & A",
    tagline: "Together with their families, invite you to celebrate their wedding day.",
    welcomeMessage: "We are deeply grateful for your presence in our lives and cannot wait to share this magical day of love, joy, and new beginnings with you in Florence.",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000",
    closingImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=2000",
    storyHeading: "Our Journey of Love",
    storyContent: [
      "Our story began five years ago on a crisp autumn evening in Paris. A chance encounter at a cozy bookstore café quickly turned into endless conversations about art, travel, and our shared dreams for the future.",
      "Over the years, we've explored cobblestone streets across Europe, hiked mountain peaks, and built a sanctuary of warmth and laughter in our home. Every moment has brought us closer together.",
      "Last summer, amidst the olive groves of Tuscany at sunset, Alexander asked the easiest question Eleanor has ever answered. We are overjoyed to welcome you to the next chapter of our journey."
    ],
    bridePhoto: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200",
    groomPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200",
    couplePhoto: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
  },
  date: {
    targetIsoDate: "2026-09-20T16:00:00",
    displayDate: "September 20, 2026",
    displayTime: "4:00 PM CEST",
    dayOfWeek: "Sunday",
  },
  venue: {
    name: "Villa Bella Vista",
    subtitle: "Historic Tuscan Estate",
    cityState: "Florence, Italy",
    address: "Via di Bellosguardo 14, 50124 Firenze FI, Italy",
    description: "Nestled high above the hills of Florence with sweeping panoramic views of the Duomo and Tuscan countryside, Villa Bella Vista offers a serene and enchanting backdrop for our wedding celebration.",
    image: "https://images.unsplash.com/photo-1545232979-fbfd4370a256?auto=format&fit=crop&q=80&w=1600",
    mapCoordinates: {
      lat: 43.7654,
      lng: 11.2398,
    },
    googleMapsUrl: "https://maps.google.com/?q=Villa+Bella+Vista+Florence",
    parkingInfo: "Complimentary valet parking will be provided at the main gates of the estate.",
    dressCode: "Black Tie Optional",
    dressCodeNote: "We kindly ask our guests to wear formal attire. Floor-length evening gowns or elegant cocktail dresses for women, and tuxedos or dark suits with bowties for men.",
  },
  timeline: [
    {
      year: "October 2021",
      title: "First Encounter",
      description: "Met at a quiet boutique cafe in Le Marais, Paris over espresso and vintage books.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800",
    },
    {
      year: "Summer 2023",
      title: "First Home Together",
      description: "Moved into our sunlit apartment and adopted our sweet golden retriever, Oliver.",
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=800",
    },
    {
      year: "August 2025",
      title: "The Proposal",
      description: "Alexander proposed under the golden hour light in the olive orchards of Bellosguardo.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
    },
    {
      year: "September 2026",
      title: "Our Wedding Day",
      description: "Beginning forever surrounded by our dearest family and loved ones.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    },
  ],
  events: [
    {
      id: "ceremony",
      title: "The Holy Ceremony",
      time: "4:00 PM — 5:00 PM",
      location: "The Villa Cypress Terrace",
      address: "Main Terrace Gardens",
      description: "Exchange of vows under the open sky overlooking the Tuscan hills. Please arrive 20 minutes prior.",
      iconName: "ring",
    },
    {
      id: "cocktails",
      title: "Aperitivo & Cocktail Hour",
      time: "5:15 PM — 6:45 PM",
      location: "The Olive Grove Courtyard",
      address: "Lower Gardens",
      description: "Artisanal Italian aperitifs, fine Prosecco, live acoustic strings, and savory Tuscan antipasti.",
      iconName: "glass",
    },
    {
      id: "reception",
      title: "Gala Dinner & Toasts",
      time: "7:00 PM — 9:30 PM",
      location: "The Grand Glass Orangerie",
      address: "Orangerie Ballroom",
      description: "A candlelit four-course Tuscan feast paired with vintage Chianti, followed by heartfelt toasts.",
      iconName: "utensils",
    },
    {
      id: "party",
      title: "Dancing & Midnight Toast",
      time: "9:30 PM — 1:00 AM",
      location: "The Villa Lawn & Ballroom",
      address: "Main Ballroom & Terrace",
      description: "Late night dancing with a live orchestra, midnight gelato bar, espresso, and fireworks.",
      iconName: "music",
    },
  ],
  gallery: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
      title: "Golden Hour Embrace",
      category: "Couple",
      aspectRatio: "tall",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
      title: "Tuscan Sunset Stroll",
      category: "Moments",
      aspectRatio: "wide",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1200",
      title: "Joyful Whisper",
      category: "Couple",
      aspectRatio: "square",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=1200",
      title: "Villa Bella Vista Gardens",
      category: "Venue",
      aspectRatio: "tall",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200",
      title: "Floral Elegance",
      category: "Venue",
      aspectRatio: "wide",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&q=80&w=1200",
      title: "Sparkler Toast",
      category: "Celebration",
      aspectRatio: "square",
    },
  ],
  rsvpOptions: {
    mealPreferences: [
      "Slow-braised Tuscan Beef Tenderloin with Truffle Reduction",
      "Pan-seared Mediterranean Sea Bass with Herbs & Lemon",
      "Wild Mushroom & Sage Risotto (Vegetarian / Gluten-Free)",
      "Roasted Artisan Vegetable Terrine (Vegan)",
    ],
    maxGuestsAllowed: 5,
  },
};
