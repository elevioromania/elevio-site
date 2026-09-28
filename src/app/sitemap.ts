import type { MetadataRoute } from "next";

const BASE_URL = "https://elevio-agency.ro";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: BASE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/preturi`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/demo`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/marketing`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/despre`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
}
