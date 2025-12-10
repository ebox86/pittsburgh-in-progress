import { statusMetadata, type ProjectStatus } from "@/data/projects";

type LegendProps = {
  activeStatuses: Record<ProjectStatus, boolean>;
  onToggleStatus: (status: ProjectStatus) => void;
};

export default function Legend({ activeStatuses, onToggleStatus }: LegendProps) {
  return (
    <div className="space-y-4">
      {Object.entries(statusMetadata).map(([status, meta]) => {
        const projectStatus = status as ProjectStatus;
        return (
          <label
            key={status}
            className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 p-3"
          >
            <span
              className="mt-1 h-3 w-3 rounded-full border border-white/30"
              style={{ backgroundColor: meta.color }}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-white">
                {meta.label}
              </p>
              <p className="text-xs text-white/60">{meta.description}</p>
            </div>
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/40 bg-white/5 text-[var(--color-gold)] accent-[var(--color-gold)]"
              checked={activeStatuses[projectStatus]}
              onChange={() => onToggleStatus(projectStatus)}
              aria-label={`Show ${meta.label} projects`}
            />
          </label>
        );
      })}
    </div>
  );
}
