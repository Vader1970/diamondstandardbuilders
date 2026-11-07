export const site = {
  name: "Diamond Standard Builders",
  email: "diamondstandardbuilders@gmail.com",
  title: "Diamond Standard Builders | Woodend & North Canterbury",
  description:
    "Diamond Standard Builders is a Woodend-based residential building company. Explore building, renovation and outdoor living services in North Canterbury.",
  ogTitle: "Diamond Standard Builders | Built to a Higher Standard",
  ogDescription:
    "Quality building, renovations and outdoor projects across North Canterbury. Based in Woodend.",
  locality: "Woodend",
  region: "Canterbury",
  area: "North Canterbury",
} as const;

export function siteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return raw.replace(/\/$/, "");
}
