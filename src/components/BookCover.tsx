import React, { useEffect, useState } from 'react';
import { fetchOpenLibraryCover } from '../utils/openLibrary';
import { Book as BookIcon } from 'lucide-react';

interface BookCoverProps {
  title: string;
  author: string;
  className?: string;
  showCoverFetch?: boolean; // False for fast grid cards, True for details and results
}

export const BookCover: React.FC<BookCoverProps> = ({
  title,
  author,
  className = '',
  showCoverFetch = true
}) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (showCoverFetch) {
      fetchOpenLibraryCover(title, author).then(url => {
        if (isMounted && url) {
          setCoverUrl(url);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [title, author, showCoverFetch]);

  return (
    <div
      className={`relative w-full aspect-[2/3] bg-neutral-950 border border-neutral-700 p-4 flex flex-col justify-between overflow-hidden select-none group ${className}`}
    >
      {/* Real Cover Image Layer if available */}
      {coverUrl && (
        <img
          src={coverUrl}
          alt={`${title} cover`}
          onLoad={() => setImageLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 filter grayscale contrast-125 brightness-95 ${
            imageLoaded ? 'opacity-90' : 'opacity-0'
          }`}
        />
      )}

      {/* Decorative Book Spine & Card Frame overlay */}
      <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-neutral-900 border-r border-neutral-800 pointer-events-none z-10" />

      {/* Typographic Cover (Acts as default and graceful fallback) */}
      <div className={`relative z-20 h-full flex flex-col justify-between ${imageLoaded ? 'bg-black/65 backdrop-blur-[2px] p-2.5 -m-2' : ''}`}>
        <div className="flex justify-between items-start border-b border-neutral-800 pb-2">
          <BookIcon className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[10px] tracking-widest uppercase font-mono-code text-neutral-400">
            MoodFlip
          </span>
        </div>

        <div className="my-auto py-2 text-center">
          <h4 className="font-serif-title text-base sm:text-lg text-white font-medium leading-snug line-clamp-3">
            {title}
          </h4>
          <div className="w-6 h-[1px] bg-neutral-700 mx-auto my-2" />
          <p className="text-[11px] font-mono-code text-neutral-300 uppercase tracking-wider line-clamp-1">
            {author}
          </p>
        </div>

        <div className="pt-2 border-t border-neutral-800/80 flex justify-between items-center text-[9px] font-mono-code text-neutral-500">
          <span>LIBRARY VOL.</span>
          <span>EST. ARCHIVE</span>
        </div>
      </div>
    </div>
  );
};
