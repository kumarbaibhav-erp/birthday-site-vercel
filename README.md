# Birthday Site (React + TypeScript + Vite)

This is a lightweight, mobile-first React + TypeScript site prepped for a personalized birthday page.
It includes:
- Countdown to midnight (placeholder set to *tomorrow midnight*).
- Confetti at midnight.
- Responsive photo gallery (replace `/public/photos/*.jpg` with your real photos).
- Memories timeline and interactive message panel.

## Run locally (VS Code)

1. Node 18+ recommended.
2. Install deps:
   ```
   npm install
   ```
3. Start dev server:
   ```
   npm run dev
   ```
4. Open the URL shown (default http://localhost:5173) on your phone or emulator.

## Notes

- Replace the `/public/photos` images with your photos (keep same filenames or update `Gallery.tsx`).
- The birthday target is set to *tomorrow midnight* as a placeholder. Update `BIRTHDAY_ISO` in `src/App.tsx` to your gf's birthday midnight ISO if needed.
- This project uses Tailwind CSS (already configured).

Have fun! ❤️
