import { CityProject } from "@/data/projects";

export const PLI_PERMITS_API = "https://data.wprdc.org/api/3/action/datastore_search";
export const PLI_PERMITS_RESOURCE_ID = "f4d1177a-f597-4c32-8cbf-7885f56253f6";

type RawPliRecord = {
  permit_id: string;
  permit_type?: string | null;
  owner_name?: string | null;
  contractor_name?: string | null;
  work_description?: string | null;
  work_type?: string | null;
  commercial_or_residential?: string | null;
  total_project_value?: number | null;
  issue_date?: string | null;
  parcel_num?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  council_district?: string | null;
  neighborhood?: string | null;
  ward?: string | null;
  zip_code?: string | null;
  status?: string | null;
};

const PLI_STATUS_TO_CITY_STATUS: Record<string, CityProject["status"]> = {
  "In Review": "applied",
  "Stop Work": "applied",
  "Amendment Application Incomplete": "applied",
  "Ready For Issue": "approved",
  "Amendment Review": "applied",
  "Amendment Requested": "applied",
  Expired: "completed",
  Issued: "approved",
  "Applicant Revisions": "applied",
  Revoked: "completed",
  "Amendment Applicant Revisions": "applied",
  "Application Finalization": "applied",
  Completed: "completed",
};

function formatName(record: RawPliRecord): string {
  return (
    record.permit_type ??
    record.work_type ??
    record.address ??
    `Permit ${record.permit_id}`
  );
}

function formatDescription(record: RawPliRecord): string {
  const parts: string[] = [];
  if (record.work_description) {
    parts.push(record.work_description);
  }
  if (record.work_type) {
    parts.push(record.work_type);
  }
  if (record.commercial_or_residential) {
    parts.push(record.commercial_or_residential);
  }

  return (
    parts.filter(Boolean).join(" • ") ||
    record.permit_type ||
    record.address ||
    "City permit data"
  );
}

function resolveStatus(record: RawPliRecord): CityProject["status"] {
  const status = record.status ?? "";
  return PLI_STATUS_TO_CITY_STATUS[status] ?? "applied";
}

function pliRecordToCityProject(record: RawPliRecord): CityProject | null {
  const latitude = record.latitude;
  const longitude = record.longitude;
  const address = record.address;

  if (
    latitude == null ||
    longitude == null ||
    latitude === 0 ||
    longitude === 0 ||
    !address
  ) {
    return null;
  }

  return {
    id: record.permit_id,
    name: formatName(record),
    status: resolveStatus(record),
    description: formatDescription(record),
    address,
    latitude,
    longitude,
    updatedAt: record.issue_date ?? "Unknown",
    permitType: record.permit_type ?? record.work_type ?? undefined,
  };
}

type DatastoreSearchResponse<T> = {
  success: boolean;
  result: {
    records: T[];
  };
};

export async function fetchPliPermits(limit = 1000): Promise<CityProject[]> {
  const url = `${PLI_PERMITS_API}?resource_id=${PLI_PERMITS_RESOURCE_ID}&limit=${limit}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`PLI API error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as DatastoreSearchResponse<RawPliRecord>;

  if (!data.success) {
    throw new Error("PLI API returned success: false");
  }

  return data.result.records
    .map(pliRecordToCityProject)
    .filter((project): project is CityProject => project !== null);
}
