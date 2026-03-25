import React from 'react';
import Link from 'next/link';
import { blogPostsData } from '@/app/blog/[slug]/blogData';

export default function NotFound() {
  // Extract a few featured posts for the 404 page
  const featuredPosts = Object.entries(blogPostsData).map(([slug, content]) => ({
    slug,
    ...content.en
  }));

  return (
    <div className="min-h-screen py-32 bg-mesh relative overflow-hidden flex flex-col items-center">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>

      <div className="w-full max-w-5xl mx-auto px-6 relative z-10 text-center animate-fade-in flex flex-col items-center">
        {/* Cinematic 404 Header */}
        <div className="relative mb-16">
          <h1 className="font-display font-black text-[10rem] md:text-[15rem] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/20 to-transparent opacity-40 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-black text-[10px] tracking-[0.2em] uppercase mb-6 animate-pulse">
              <span className="size-2 rounded-full bg-primary"></span>
              SIGNAL INTERRUPTED
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Node Not Found
            </h2>
            <p className="text-slate-400 font-body text-lg max-w-md mt-4 leading-relaxed">
              The intelligence node you requested has migrated to a different sector or no longer exists in this grid.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-24">
          <Link href="/" className="h-16 px-10 rounded-2xl bg-primary text-background-dark font-display font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:translate-y-[-4px] transition-all shadow-[0_0_40px_rgba(13,227,242,0.2)] group">
            <span className="material-symbols-outlined group-hover:rotate-180 transition-transform duration-700">refresh</span>
            Re-Initialize Grid
          </Link>
          <Link href="/blog" className="h-16 px-10 rounded-2xl bg-white/5 border border-white/10 text-white font-display font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-white/10 transition-all backdrop-blur-md">
            <span className="material-symbols-outlined">auto_stories</span>
            Intelligence Archive
          </Link>
        </div>

        {/* Blog Gateway Section */}
        <div className="w-full space-y-12">
          <div className="flex flex-col items-center gap-4">
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            <h3 className="font-display font-bold text-2xl text-white uppercase tracking-[0.3em] font-black">
              Suggested Intelligence Nodes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {featuredPosts.slice(0, 4).map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="glass-premium p-8 rounded-[2.5rem] border border-white/5 group hover:border-primary/30 transition-all duration-700"
              >
                <div className="flex items-start gap-6">
                  <div className="size-16 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all duration-500 shadow-inner">
                    <span className="material-symbols-outlined text-3xl">{post.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-display font-black text-primary uppercase tracking-[0.2em] mb-2">{post.category}</p>
                    <h4 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-slate-500 text-sm font-body mt-3 line-clamp-2 group-hover:text-slate-400 transition-colors">
                      {post.description}
                    </p>
                  </div>
                  <div className="size-10 rounded-full border border-white/10 flex items-center justify-center text-slate-700 group-hover:text-primary group-hover:translate-x-1 transition-all">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* System Meta */}
        <p className="mt-32 text-slate-600 font-display font-black text-[10px] tracking-[0.5em] uppercase border-t border-white/5 pt-12 w-full">
          AITDL Network • System Integrity Verified • Vikram Samvat 2083
        </p>
      </div>

      {/* Aesthetic Background Grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:48px_48px] opacity-40"></div>
    </div>
  );
}
