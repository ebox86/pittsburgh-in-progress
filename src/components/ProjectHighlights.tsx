import { statusMetadata, type CityProject } from "@/data/projects";

type ProjectHighlightsProps = {
  projects: CityProject[];
};

export default function ProjectHighlights({ projects }: ProjectHighlightsProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-white/60">
        No projects are visible with the current filters.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <article
          key={project.id}
          className="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-sm shadow-black/20"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-white">{project.name}</h3>
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
              style={{ backgroundColor: `${statusMetadata[project.status].color}22` }}
            >
              {statusMetadata[project.status].label}
            </span>
          </div>
          <p className="mt-2 text-sm text-white/70">{project.description}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-white/50">
            <span>{project.address}</span>
            <span>Updated {project.updatedAt}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
