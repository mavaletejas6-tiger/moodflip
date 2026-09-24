import React, { useState } from 'react';
import { RefreshCw, Sparkles, ArrowRightLeft } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface FlipCardProps {
  detectedEmotion: string;
  vibeSummary: string;
  flippedState: string;
  flipQuote: string;
  language?: Language;
  useVladimirScript?: boolean;
}

export const FlipCard: React.FC<FlipCardProps> = ({
  detectedEmotion,
  vibeSummary,
  flippedState,
  flipQuote,
  language = 'en',
  useVladimirScript = true
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const t = TRANSLATIONS[language].flipCard;

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-2xl mx-auto perspective-1200 my-6">
      <div
        onClick={toggleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleFlip()}
        className={`relative w-full min-h-[260px] sm:min-h-[280px] cursor-pointer transition-transform duration-700 transform-style-3d select-none group ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT FACE (Before / Current State) */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-neutral-950 border-2 border-neutral-700 p-6 sm:p-8 flex flex-col justify-between shadow-2xl group-hover:border-neutral-500 transition-colors">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
              <span className="text-[11px] font-mono-code uppercase tracking-widest text-neutral-400">
                {t.beforeLabel}
              </span>
              <span className="text-[11px] font-mono-code px-2 py-0.5 border border-neutral-700 text-neutral-300">
                {t.currentBadge}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono-code text-neutral-500 uppercase tracking-widest">
                {t.resonanceTitle}
              </span>
              <h3 className={`text-3xl sm:text-5xl text-white font-normal tracking-wide ${useVladimirScript ? 'font-vladimir' : 'font-serif-title'}`}>
                {detectedEmotion}
              </h3>
              <p className={`text-lg sm:text-2xl text-neutral-200 leading-relaxed max-w-xl ${useVladimirScript ? 'font-vladimir' : 'text-sm font-mono-code text-neutral-300'}`}>
                {vibeSummary}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono-code text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              {t.clickToFlip}
            </span>
            <span className="border border-neutral-800 px-2 py-0.5 uppercase tracking-wider text-[10px]">
              Tap
            </span>
          </div>
        </div>

        {/* BACK FACE (After / The Positive Flip) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-neutral-900 border-2 border-white p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-700 pb-3 mb-4">
              <span className="text-[11px] font-mono-code uppercase tracking-widest text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {t.afterLabel}
              </span>
              <span className="text-[11px] font-mono-code px-2 py-0.5 bg-white text-black font-semibold">
                {t.transformedBadge}
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono-code text-neutral-400 uppercase tracking-widest">
                {t.stateTitle}
              </span>
              <h3 className={`text-3xl sm:text-5xl text-white font-normal tracking-wide ${useVladimirScript ? 'font-vladimir' : 'font-serif-title'}`}>
                {flippedState}
              </h3>
              <blockquote className={`text-xl sm:text-3xl text-neutral-100 border-l-2 border-white pl-4 my-2 leading-relaxed ${useVladimirScript ? 'font-vladimir not-italic' : 'text-sm sm:text-base italic font-serif text-neutral-200'}`}>
                "{flipQuote}"
              </blockquote>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono-code text-neutral-300">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" />
              {t.clickToBack}
            </span>
            <span className="bg-neutral-800 px-2 py-0.5 text-neutral-400 uppercase text-[10px]">
              {t.transformedBadge}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
