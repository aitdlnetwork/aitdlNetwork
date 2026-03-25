/*
AITDL Network © 2026 | Vikram Samvat 2083
Server component — handles generateMetadata for SEO, renders client UI
*/

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';
import { blogPostsData } from './blogData';
import BlogPostClient from './BlogPostClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = blogPostsData[decodedSlug]?.en;
  
  if (!post) return generateSEO({});

  return generateSEO({
    title: `${post.title} | AITDL Knowledge Centre`,
    description: post.description,
    path: `/blog/${decodedSlug}`,
    keywords: post.keywords,
  });
}

export function generateStaticParams() {
  return Object.keys(blogPostsData).map((slug) => ({
    slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const postData = blogPostsData[decodedSlug];

  if (!postData) {
    notFound();
  }

  return <BlogPostClient postData={postData} />;
}
