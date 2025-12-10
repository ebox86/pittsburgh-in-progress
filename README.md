# Pittsburgh In Progress

Single-page Next.js shell visualizing Pittsburgh building activity on a Mapbox-powered city map.

## Features

- Mapbox GL map centered on Pittsburgh with color-coded pins for Applied, Approved, and Completed permits.
- Status legend and highlighted project list to explain what each pin means.
- Lightweight layout built with the Next.js App Router and Tailwind CSS.

## Getting started

1. Create a `.env.local` file in the repo root with:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_public_token_here
   ```
2. Install dependencies and run the dev server:
   ```
   npm install
   npm run dev
   ```
3. Open `http://localhost:3000` once the server is ready.

The map will render once Mapbox receives your token. Without it, the page shows a friendly reminder instead of the interactive globe.

## Code overview

- `src/app/page.tsx` orchestrates the layout, menu, map, legend, and project list.
- `src/components/PittsburghMap.tsx` handles the Mapbox GL initialization and markers.
- `src/components/Legend.tsx` and `src/components/ProjectHighlights.tsx` render the legend items and project cards.
- `src/data/projects.ts` contains mocked permit data and metadata for styling the legend.

## Next steps

1. Replace the mock `projects` data with real feeds from the City of Pittsburgh building records API.
2. Build historical filtering and “recently completed” timelines once the data source supports it.
3. Add search or neighborhood filters for residents and planners to explore nearby projects.
