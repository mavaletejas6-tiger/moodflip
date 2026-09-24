// ====== MOODFLIP LIBRARY SECTION ======
import React, { useState, useMemo } from 'react';
import { BOOKS, BookItem, MOOD_TAGS } from '../data/books';
import { BookDetailModal } from './BookDetailModal';
import { Search, Sparkles, ArrowLeft, BookOpen, Shuffle } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface LibraryScreenProps {
  onBackToMoodFlip: () => void;
  initialTagFilter?: string | null;
  language?: Language;
  useVladimirScript?: boolean;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  onBackToMoodFlip,
  initialTagFilter = null,
  language = 'en',
  useVladimirScript = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTagFilter);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalBook, setActiveModalBook] = useState<BookItem | null>(null);
  const t = TRANSLATIONS[language];

  // Extract all categories dynamically from BOOKS
  const categories = useMemo(() => {
    const set = new Set<string>();
    BOOKS.forEach(b => set.add(b.cat));
    return ['ALL', ...Array.from(set).sort()];
  }, []);

  // Filter books based on search, tag, category
  const filteredBooks = useMemo(() => {
    return BOOKS.filter(book => {
      // Search query (title or author)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = book.title.toLowerCase().includes(q);
        const matchAuthor = book.author.toLowerCase().includes(q);
        if (!matchTitle && !matchAuthor) return false;
      }

      // Mood Tag filter
      if (selectedTag && selectedTag !== 'ALL') {
        if (!book.tags.includes(selectedTag)) return false;
      }

      // Category filter
      if (selectedCategory && selectedCategory !== 'ALL') {
        if (book.cat !== selectedCategory) return false;
      }

      return true;
    });
  }, [searchQuery, selectedTag, selectedCategory]);

  const handleSurpriseMe = () => {
    const pool = filteredBooks.length > 0 ? filteredBooks : BOOKS;
    const randomBook = pool[Math.floor(Math.random() * pool.length)];
    setActiveModalBook(randomBook);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 sm:px-8 py-8 animate-in fade-in duration-300">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMoodFlip}
              className="flex items-center gap-2 px-3 py-1.5 border border-neutral-800 text-xs font-mono-code text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {t.backToScanner}
            </button>
            <div className="h-4 w-[1px] bg-neutral-800" />
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-white" />
              <h1 className="font-serif-title text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {t.libraryTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono-code">
            <span className="text-neutral-400">
              {t.collection}: <strong className="text-white">100 {t.booksWord}</strong>
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-300">
              {t.showing}: <strong className="text-white">{filteredBooks.length}</strong> {t.matching}
            </span>
            <button
              onClick={handleSurpriseMe}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black hover:bg-neutral-200 font-semibold tracking-wider transition-colors cursor-pointer"
              title="Open a random book"
            >
              <Shuffle className="w-3.5 h-3.5" />
              {t.surpriseMe}
            </button>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
          {/* Search box (title or author) */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 text-sm font-mono-code text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 bg-neutral-950 border border-neutral-800 text-sm font-mono-code text-neutral-200 focus:outline-none focus:border-white transition-colors cursor-pointer"
            >
              <option value="ALL">
                {t.allCategories} ({categories.length - 1})
              </option>
              {categories.filter(c => c !== 'ALL').map(cat => (
                <option key={cat} value={cat}>
                  {t.categories[cat] || cat}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Quick Button */}
          {(selectedTag || selectedCategory !== 'ALL' || searchQuery) && (
            <div className="md:col-span-4 flex items-center justify-end">
              <button
                onClick={() => {
                  setSelectedTag(null);
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="text-xs font-mono-code text-neutral-400 hover:text-white underline cursor-pointer"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </div>

        {/* Mood Tag Filter Chips (8 mood tags) */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono-code uppercase tracking-widest text-neutral-400">
              {t.filterByMood}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-xs font-mono-code uppercase tracking-wider transition-colors cursor-pointer border ${
                selectedTag === null
                  ? 'bg-white text-black border-white font-semibold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-neutral-200'
              }`}
            >
              {t.allTags}
            </button>
            {MOOD_TAGS.map(tag => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(active ? null : tag)}
                  className={`px-3 py-1 text-xs font-mono-code uppercase tracking-wider transition-colors cursor-pointer border ${
                    active
                      ? 'bg-white text-black border-white font-semibold'
                      : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                  }`}
                >
                  #{t.moodTags[tag] || tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of Typographic Book Cards */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20 border border-neutral-900 bg-neutral-950/50 space-y-3">
            <BookOpen className="w-8 h-8 text-neutral-600 mx-auto" />
            <h3 className="font-serif-title text-xl text-neutral-300">
              {t.noBooksFound}
            </h3>
            <p className="text-xs font-mono-code text-neutral-400">
              {t.noBooksHint}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4">
            {filteredBooks.map(book => (
              <div
                key={book.id}
                onClick={() => setActiveModalBook(book)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveModalBook(book)}
                className="group relative bg-neutral-950 border border-neutral-800 hover:border-white p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[210px] text-left hover:shadow-lg"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between text-[10px] font-mono-code border-b border-neutral-900 pb-2 mb-3">
                    <span className="text-neutral-500 font-bold group-hover:text-neutral-300">
                      #{book.id.toString().padStart(3, '0')}
                    </span>
                    <span className="text-neutral-400 px-1.5 py-0.5 border border-neutral-800 text-[9px]">
                      {t.categories[book.cat] || book.cat}
                    </span>
                  </div>

                  {/* Title & Author */}
                  <h4 className={`${useVladimirScript ? 'font-vladimir text-xl sm:text-2xl font-normal' : 'font-serif-title text-lg font-bold'} text-white group-hover:underline line-clamp-2 leading-snug`}>
                    {book.title}
                  </h4>
                  <p className={`${useVladimirScript ? 'font-vladimir text-base text-neutral-300' : 'text-xs font-mono-code text-neutral-400'} mt-1 line-clamp-1`}>
                    {book.author}
                  </p>
                </div>

                {/* Mood Tags & Action */}
                <div className="pt-3 border-t border-neutral-900/90 mt-3">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {book.tags.map(tagItem => (
                      <span
                        key={tagItem}
                        className="text-[9px] font-mono-code px-1.5 py-0.2 bg-neutral-900 border border-neutral-800 text-neutral-400"
                      >
                        {t.moodTags[tagItem] || tagItem}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono-code text-neutral-400 group-hover:text-white transition-colors">
                    <span>{t.detailsBtn}</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Book Detail Modal */}
      {activeModalBook && (
        <BookDetailModal
          book={activeModalBook}
          onClose={() => setActiveModalBook(null)}
          onFilterByTag={(tag) => {
            setSelectedTag(tag);
            setSelectedCategory('ALL');
            setSearchQuery('');
          }}
          language={language}
        />
      )}
    </div>
  );
};
