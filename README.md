# 💍 Modern Wedding Invitation Website Template

A beautiful, elegant, and fully customizable wedding invitation website built with **Next.js**, **React**, and **Tailwind CSS**. Designed to be easily used as a template for your own wedding or client project!

---

## 🚀 Quick Start & Customization Guide

Use this repository as a template to quickly create your own wedding invitation website in 4 simple steps.

### 1. Use as Template / Clone Repository

Click **"Use this template"** on GitHub or clone the repository:

```bash
git clone https://github.com/HexaGhost-09/Wedding-Card.git
cd Wedding-Card
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Customize Your Wedding Details ✍️

All data (couple names, date, venue, location link, story, photos, schedule, FAQs, registry, etc.) is configured in a single file!

Open [`src/data/weddingData.ts`](./src/data/weddingData.ts) and edit:

```typescript
export const weddingData: WeddingData = {
  couple: {
    brideFirstName: "Thasni",
    brideLastName: "",
    groomFirstName: "Midlaj",
    groomLastName: "",
    initials: "T & M",
    tagline: "Together with their families, invite you to celebrate their wedding day.",
    welcomeMessage: "We are deeply grateful for your presence in our lives...",
    heroImage: "https://your-image-url.com/hero.jpg",
    bridePhoto: "https://your-image-url.com/bride.jpg",
    groomPhoto: "https://your-image-url.com/groom.jpg",
    // ...
  },
  date: {
    targetIsoDate: "2026-09-06T12:00:00", // ISO format for countdown timer
    displayDate: "September 6, 2026",
    displayTime: "12:00 PM",
    dayOfWeek: "Sunday",
  },
  venue: {
    name: "Parkon Auditorium",
    googleMapsUrl: "https://g.shrinkrl.com/XerRPs", // Your Google Maps location link
    // ...
  },
  // Customize timeline, events, gallery images, gift registry, FAQs, etc.
};
```

### 4. Update Site Metadata

Update page titles and open-graph metadata for link previews in [`src/app/layout.tsx`](./src/app/layout.tsx):

```typescript
export const metadata: Metadata = {
  title: "Bride & Groom — Wedding Celebration",
  description: "Join us in celebrating our wedding on [Date] at [Venue].",
};
```

---

## 💻 Local Development

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your invitation!

---

## 🛠️ Build & Verification

Test production build locally:

```bash
npm run build
npm run start
```

---

## 🌐 Free Deployment (Vercel / Netlify)

1. Push your customized repository to GitHub.
2. Sign up on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. Import your GitHub repository — it will automatically detect Next.js and deploy your live wedding invitation site in under a minute!

---

## 🌟 Features Included

- ⏳ **Live Countdown Timer** to the wedding date
- 📍 **Venue & Interactive Map Links**
- 📖 **Couple Story & Journey Timeline**
- 📅 **Schedule & Events Itinerary**
- 💌 **RSVP Form**
- 🖼️ **Photo Gallery**
- 🎁 **Gift Registry Information**
- 📱 **Fully Responsive Mobile & Desktop Design**

---

Made with ❤️. Feel free to star ⭐️ this repository if you found it helpful!
