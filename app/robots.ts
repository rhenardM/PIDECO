import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Tant que le site est en démonstration, il n'est pas indexé.
  const demo = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";
  return {
    rules: demo ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
