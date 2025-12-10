export type ProjectStatus = "applied" | "approved" | "completed";

export const statusMetadata: Record<
  ProjectStatus,
  { label: string; description: string; color: string }
> = {
  applied: {
    label: "Applied",
    description: "Permit submitted / under review",
    color: "#f97316",
  },
  approved: {
    label: "Approved",
    description: "Permit cleared, construction starting soon",
    color: "#22c55e",
  },
  completed: {
    label: "Completed (past year)",
    description: "Work finalized within the last 12 months",
    color: "#38bdf8",
  },
};

export type CityProject = {
  id: string;
  name: string;
  status: ProjectStatus;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  updatedAt: string;
  permitType?: string;
};

export const projects: CityProject[] = [
  {
    id: "north-shore",
    name: "North Shore Transit Hub",
    status: "applied",
    description: "A multi-modal transit and activation center adjacent to the stadiums.",
    address: "North Shore, Pittsburgh",
    latitude: 40.4466,
    longitude: -80.0098,
    updatedAt: "Jan 2024",
    permitType: "Transit & mobility",
  },
  {
    id: "east-ellis",
    name: "East Ellis Near-Site Housing",
    status: "approved",
    description: "Mixed-use housing with ground-floor retail supporting East Liberty.",
    address: "East Liberty, Pittsburgh",
    latitude: 40.4441,
    longitude: -79.9300,
    updatedAt: "Feb 2024",
    permitType: "Residential development",
  },
  {
    id: "shoreline",
    name: "Shoreline Innovation Labs",
    status: "approved",
    permitType: "Innovation / labs",
    description: "Modern lab campus near the river to anchor tech expansion.",
    address: "Strip District, Pittsburgh",
    latitude: 40.4503,
    longitude: -79.9669,
    updatedAt: "Mar 2024",
  },
  {
    id: "hazelwood",
    name: "Hazelwood Green Phase 3",
    status: "completed",
    permitType: "Mixed-use redevelopment",
    description: "Final phase of redevelopment with parks and new office towers.",
    address: "Hazelwood, Pittsburgh",
    latitude: 40.4124,
    longitude: -79.9340,
    updatedAt: "Nov 2023",
  },
  {
    id: "lower-larimer",
    name: "Lower Larimer Mobility Hub",
    status: "completed",
    permitType: "Transit & mobility",
    description: "Transit plaza and active work center delivering affordable rental.",
    address: "Lower Larimer, Pittsburgh",
    latitude: 40.4516,
    longitude: -79.9098,
    updatedAt: "Aug 2023",
  },
];
