import { statusMetadata, type CityProject } from "@/data/projects";

type ProjectDetailsModalProps = {
  project: CityProject;
  onClose: () => void;
};

export default function ProjectDetailsModal({
  project,
  onClose,
}: ProjectDetailsModalProps) {
  const meta = statusMetadata[project.status];

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${project.name}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#03060c] p-6 shadow-2xl shadow-black/80"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:text-white"
        >
          Close
        </button>

        <div className="flex flex-col gap-2 rounded-2xl border border-white/5 bg-white/5 p-4 shadow-inner">
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-white/60">
            {meta.label}
          </p>
          <h2 className="text-2xl font-semibold text-white">{project.name}</h2>
          <p className="text-sm text-white/70">{project.description}</p>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-[0.4em] text-white/50">Address</dt>
            <dd className="mt-1 text-base text-white">{project.address}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.4em] text-white/50">Permit type</dt>
            <dd className="mt-1 text-base text-white">{project.permitType ?? "N/A"}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.4em] text-white/50">Updated</dt>
            <dd className="mt-1 text-base text-white">{project.updatedAt}</dd>
          </div>
        </dl>

        <p className="mt-6 text-sm text-white/60">
          Latitude {project.latitude.toFixed(5)}, Longitude {project.longitude.toFixed(5)}
        </p>
      </div>
    </div>
  );
}
