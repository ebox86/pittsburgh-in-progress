"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Legend from "@/components/Legend";
import HeaderBar from "@/components/HeaderBar";
import PermitTypeFilters from "@/components/PermitTypeFilters";
import ProjectDetailsModal from "@/components/ProjectDetailsModal";
import PittsburghMap from "@/components/PittsburghMap";
import { buildStaticMapUrl } from "@/lib/staticMap";
import { fetchPliPermits } from "@/lib/pli";
import {
  type CityProject,
  type ProjectStatus,
  projects as staticProjects,
} from "@/data/projects";

const BUILDING_TYPE_KEYWORDS = [
  "build",
  "construction",
  "development",
  "residential",
  "commercial",
  "housing",
  "renovation",
  "rehab",
  "mixed use",
  "project",
];

const matchesBuildingKeyword = (type: string) => {
  const normalized = type.toLowerCase().replace(/[-_]/g, " ");
  return BUILDING_TYPE_KEYWORDS.some((keyword) => normalized.includes(keyword));
};

export default function Home() {
  const [liveProjects, setLiveProjects] = useState<CityProject[]>([]);
  const [statusFilters, setStatusFilters] = useState<Record<ProjectStatus, boolean>>({
    applied: true,
    approved: true,
    completed: true,
  });
  const [permitTypeVisibility, setPermitTypeVisibility] = useState<Record<string, boolean>>(
    {},
  );
  const [permitFiltersOpen, setPermitFiltersOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<CityProject | null>(null);
  const staticMapUrl = buildStaticMapUrl();

  useEffect(() => {
    let isActive = true;

    fetchPliPermits(800)
      .then((records) => {
        if (isActive) {
          setLiveProjects(records);
        }
      })
      .catch((error) => {
        console.error("Failed to load live permits:", error);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const combinedProjects = useMemo(
    () => [...liveProjects, ...staticProjects],
    [liveProjects],
  );

  const getPermitTypeKey = (project: CityProject) =>
    project.permitType?.trim() || "Other";

  const availablePermitTypes = useMemo(() => {
    const counts = new Map<string, number>();
    combinedProjects.forEach((project) => {
      const type = getPermitTypeKey(project);
      counts.set(type, (counts.get(type) ?? 0) + 1);
    });

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([type]) => type);
  }, [combinedProjects]);

  const getPermitTypeVisibility = useCallback(
    (type: string) => {
      if (Object.prototype.hasOwnProperty.call(permitTypeVisibility, type)) {
        return permitTypeVisibility[type];
      }
      return matchesBuildingKeyword(type);
    },
    [permitTypeVisibility],
  );

  const filteredProjects = useMemo(
    () =>
      combinedProjects.filter((project) => {
        if (!statusFilters[project.status]) {
          return false;
        }

        const type = getPermitTypeKey(project);
        return getPermitTypeVisibility(type);
      }),
    [combinedProjects, statusFilters, getPermitTypeVisibility],
  );

  const toggleStatus = (status: ProjectStatus) => {
    setStatusFilters((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const togglePermitType = (type: string) => {
    setPermitTypeVisibility((prev) => {
      const previousValue = Object.prototype.hasOwnProperty.call(prev, type)
        ? prev[type]
        : matchesBuildingKeyword(type);

      return { ...prev, [type]: !previousValue };
    });
  };

  const clearSelection = () => {
    setSelectedProject(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-slate-950/70 bg-cover bg-center"
          style={{
            backgroundImage: staticMapUrl ? `url(${staticMapUrl})` : undefined,
            filter: "blur(12px)",
            backgroundBlendMode: "darken",
          }}
        />
        <div className="absolute inset-0 z-10">
          <PittsburghMap projects={filteredProjects} onSelectProject={setSelectedProject} />
        </div>
      </div>

      <HeaderBar className="absolute inset-x-0 top-0 z-30" />

      <main className="pointer-events-none">

        <div className="absolute top-24 right-6 z-20 w-72 pointer-events-auto">
          <div className="rounded-2xl border border-[rgba(255,182,18,0.35)] bg-[#020304]/85 p-4 shadow-2xl shadow-black/70 backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-[var(--color-gold)]">Legend</h2>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-gold)/70]">
                Status key
              </span>
            </div>
            <Legend activeStatuses={statusFilters} onToggleStatus={toggleStatus} />
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.45em] text-[var(--color-gold)/70]">
                  Permit type
                </p>
                <button
                  type="button"
                  onClick={() => setPermitFiltersOpen((prev) => !prev)}
                  className="rounded-full border border-[rgba(255,255,255,0.2)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-white transition hover:border-[var(--color-gold)]"
                  aria-expanded={permitFiltersOpen}
                >
                  {permitFiltersOpen ? "Hide filters" : "Show filters"}
                </button>
              </div>
              {permitFiltersOpen && (
                <div className="rounded-3xl border border-white/10 bg-[#020304]/80 p-2 shadow-inner shadow-black/40">
                  <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
                    <PermitTypeFilters
                      types={availablePermitTypes}
                      isTypeVisible={getPermitTypeVisibility}
                      onToggleType={togglePermitType}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
      {selectedProject && (
        <ProjectDetailsModal project={selectedProject} onClose={clearSelection} />
      )}
    </div>
  );
}
