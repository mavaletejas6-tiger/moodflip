// Utility to fetch book covers from Open Library in strict grayscale

const coverCache = new Map<string, string | null>();

export async function fetchOpenLibraryCover(title: string, author: string): Promise<string | null> {
  const cacheKey = `${title}__${author}`.toLowerCase();
  if (coverCache.has(cacheKey)) {
    return coverCache.get(cacheKey) ?? null;
  }

  try {
    const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&limit=1&fields=cover_i`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      coverCache.set(cacheKey, null);
      return null;
    }

    const data = await res.json();
    const doc = data?.docs?.[0];
    const coverId = doc?.cover_i;

    if (coverId && typeof coverId === 'number' && coverId > 0) {
      const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
      coverCache.set(cacheKey, coverUrl);
      return coverUrl;
    }

    coverCache.set(cacheKey, null);
    return null;
  } catch {
    // Fail silently without showing any error to user
    coverCache.set(cacheKey, null);
    return null;
  }
}
