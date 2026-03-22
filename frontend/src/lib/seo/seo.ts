// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

import type { Metadata } from "next";
import { SEO_CONFIG } from "./config";

export function generateSEO({
  title,
  description,
  path = "",
  keywords,
  ogImage,
}: {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
}): Metadata {
  const url = `${SEO_CONFIG.siteUrl}${path}`;
  const resolvedTitle = title || SEO_CONFIG.title;
  const resolvedDesc = description || SEO_CONFIG.description;
  const resolvedOg = ogImage || SEO_CONFIG.ogImage;
  const resolvedKeywords = keywords || SEO_CONFIG.keywords;

  return {
    title: resolvedTitle,
    description: resolvedDesc,
    keywords: resolvedKeywords,

    authors: [{ name: SEO_CONFIG.author, url: SEO_CONFIG.siteUrl }],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: resolvedTitle,
      description: resolvedDesc,
      url,
      siteName: SEO_CONFIG.siteName,
      type: "website",
      images: [
        {
          url: resolvedOg,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDesc,
      creator: SEO_CONFIG.twitterHandle,
      images: [resolvedOg],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
