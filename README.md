# Tiya-style portfolio (clone)

A Vite + React portfolio inspired by https://tiya-portfolio-orpin.vercel.app/

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Notes:
- Theme toggle persists to `localStorage` under `tiya-theme`.
- Project preview images are embedded; SyncSpace uses the original SVG asset from `public/`.
- The original site's interactive 3D "Madame Fluffington" mascot is replaced here with a lightweight
  static stand-in. The full Three.js mascot (drag to rotate, gaze tracking, wardrobe) is not included.
