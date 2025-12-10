"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { statusMetadata, type CityProject } from "@/data/projects";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

const PITTSBURGH_CENTER: [number, number] = [-79.9959, 40.4406];
type PittsburghMapProps = {
  projects: CityProject[];
  onSelectProject?: (project: CityProject) => void;
};

export default function PittsburghMap({
  projects,
  onSelectProject,
}: PittsburghMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      return;
    }

    if (!mapContainer.current || mapRef.current) {
      return;
    }

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: PITTSBURGH_CENTER,
      zoom: 13,
      minZoom: 10,
    });

    mapRef.current.on("load", () => {
      setReady(true);
    });

    const handleResize = () => mapRef.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      window.removeEventListener("resize", handleResize);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!ready || !mapRef.current) {
      return;
    }

    markersRef.current.forEach((marker) => marker.remove());
    const tooltip = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 12,
      className: "map-tooltip",
    });

    markersRef.current = projects.map((project) => {
      const el = document.createElement("div");
      el.className = "marker-dot";
      el.style.backgroundColor = statusMetadata[project.status].color;

      const labelText =
        project.address?.trim() && project.address.trim().length > 0
          ? project.address
          : project.name;

      el.addEventListener("mouseenter", () => {
        if (!labelText) return;
        tooltip
          .setLngLat([project.longitude, project.latitude])
          .setHTML(`<span>${labelText}</span>`)
          .addTo(mapRef.current!);
      });
      el.addEventListener("mouseleave", () => {
        tooltip.remove();
      });
      el.addEventListener("click", () => {
        onSelectProject?.(project);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([project.longitude, project.latitude])
        .addTo(mapRef.current!);

      return marker;
    });

    return () => {
      tooltip.remove();
      markersRef.current.forEach((marker) => marker.remove());
    };
  }, [projects, ready, onSelectProject]);

  if (!mapboxgl.accessToken) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center text-sm text-white/80">
        <p className="mb-2 font-semibold text-white">Mapbox token not configured</p>
        <p>Set `NEXT_PUBLIC_MAPBOX_TOKEN` to view the interactive map.</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div ref={mapContainer} className="h-full w-full" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 text-sm text-white/80">
          Loading Pittsburgh map…
        </div>
      )}
    </div>
  );
}
