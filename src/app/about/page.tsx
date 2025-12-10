import HeaderBar from "@/components/HeaderBar";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <HeaderBar className="relative z-10" />
      <main className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-12 pt-24">
        <div className="w-full max-w-4xl space-y-8 rounded-3xl border border-white/10 bg-black/90 p-10 shadow-2xl shadow-black/50 backdrop-blur">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">About</p>
            <h1 className="text-3xl font-semibold">Pittsburgh In Progress</h1>
            <p className="text-lg text-white/70">
              A live permit map for Pittsburgh that layers City of Pittsburgh + WPRDC building permit
              records onto Mapbox GL and lets you drill into project status, permit type, and location right from the browser.
            </p>
          </div>

          <div className="space-y-4 text-sm text-white/70">
            <p>
              Data flows in from the WPRDC PLI Permits feed, projects are normalized into the shared legend, and the new filters
              let you narrow the signal to building-oriented work while hiding mechanical/electrical/general permit groups that you
              don&apos;t care about. Hover a pin to see the address tooltip and click a marker to open the full detail modal.
            </p>
            <p>
              Because we kept the UI headless, you also still have the curated legend, optional filters, and modal content
              that highlight why a given project matters to the neighborhood you&apos;re exploring.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
            <p>Built with Next.js + Tailwind + Mapbox</p>
            <p>Focused on Pittsburgh city planning and community transparency</p>
          </div>
        </div>
      </main>
    </div>
  );
}
