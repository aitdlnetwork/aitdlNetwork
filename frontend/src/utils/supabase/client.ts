/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Safeguard against missing or placeholder URLs
  if (!url || !url.startsWith('https://')) {
    console.warn('Supabase URL is missing or set to placeholder. Client initialized in Mock-Fallback mode.');
    return null;
  }

  return createBrowserClient(url, anonKey!);
}

