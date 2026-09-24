import React from 'react';
import { BookItem, LIBRARY_TIP } from '../data/books';
import { BookCover } from './BookCover';
import { ExternalLink, Filter, X } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface BookDetailModalProps {
  book: BookItem | null;
  onClose: () => void;
  onFilterByTag: (tag: string) => void;
  language?: Language;
  useVladimirScript?: boolean;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onFilterByTag,
  language = 'en',
  useVladimirScript = true
}) => {
  if (!book) return null;
  const t = TRANSLATIONS[language];

  const handleOpenLibrarySearch = () => {
    const query = encodeURIComponent(`${book.title} ${book.author}`);
    window.open(`https://openlibrary.org/search?q=${query}`, '_blank', 'noopener,noreferrer');
  };

  const handleMoreLikeThis = () => {
    if (book.tags && book.tags.length > 0) {
      onFilterByTag(book.tags[0]);
    }
    onClose();
  };

  const tipText = language === 'it' 
    ? "Chiedi al bibliotecario della scuola per prendere in prestito questo libro!" 
    : LIBRARY_TIP;

  const displayCategory = t.categories[book.cat] || book.cat;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-neutral-950 border border-neutral-700 p-6 sm:p-8 shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white border border-transparent hover:border-neutral-700 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-center">
          {/* Cover Column */}
          <div className="sm:col-span-2 max-w-[170px] mx-auto w-full">
            <BookCover title={book.title} author={book.author} showCoverFetch={true} />
          </div>

          {/* Details Column */}
          <div className="sm:col-span-3 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono-code px-2 py-0.5 border border-neutral-700 text-neutral-300">
                  {displayCategory}
                </span>
                {book.readerLevel && (
                  <span className="text-[10px] font-mono-code text-neutral-400">
                    {book.readerLevel === 'Junior' 
                      ? (language === 'it' ? 'Livello Medie' : 'Junior Level')
                      : book.readerLevel === 'Senior'
                      ? (language === 'it' ? 'Livello Superiori' : 'Senior Level')
                      : (language === 'it' ? 'Per Tutti' : 'Any Level')}
                  </span>
                )}
              </div>

              <h3 className={`${useVladimirScript ? 'font-vladimir text-2xl sm:text-3xl font-normal' : 'font-serif-title text-2xl font-bold'} tracking-tight text-white leading-tight`}>
                {book.title}
              </h3>
              <p className={`${useVladimirScript ? 'font-vladimir text-lg text-neutral-300' : 'text-sm font-mono-code text-neutral-400'} mt-1`}>
                {language === 'it' ? 'di' : 'by'} {book.author}
              </p>
            </div>

            {/* Tags */}
            <div>
              <span className="text-[10px] font-mono-code uppercase tracking-wider text-neutral-500 block mb-1.5">
                {language === 'it' ? 'Risonanze Emotive' : 'Mood Resonances'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {book.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono-code px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-200"
                  >
                    #{t.moodTags[tag] || tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleOpenLibrarySearch}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono-code font-semibold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {t.findBook}
              </button>

              <button
                onClick={handleMoreLikeThis}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono-code uppercase tracking-wider border border-neutral-700 text-neutral-300 hover:border-white hover:text-white transition-colors cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5" />
                {t.moreLikeThis} ({t.moodTags[book.tags[0]] || book.tags[0]})
              </button>
            </div>

            {/* School Library Tip */}
            <p className="text-[11px] text-neutral-400 italic pt-1 border-t border-neutral-900">
              {tipText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
