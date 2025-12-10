const PITT_CENTER: [number, number] = [-79.9959, 40.4406];

export const buildStaticMapUrl = () => {
  const url = new URL("https://staticmap.openstreetmap.de/staticmap.php");
  url.searchParams.set("center", `${PITT_CENTER[1]},${PITT_CENTER[0]}`);
  url.searchParams.set("zoom", "14");
  url.searchParams.set("size", "1600x900");
  url.searchParams.set("scale", "2");
  url.searchParams.set("markers", `${PITT_CENTER[1]},${PITT_CENTER[0]}`);
  return url.toString();
};
