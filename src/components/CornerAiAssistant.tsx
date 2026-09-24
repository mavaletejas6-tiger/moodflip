import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  X, 
  BookOpen, 
  Compass, 
  Settings, 
  MessageSquare, 
  ChevronUp, 
  ChevronDown,
  Languages
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface CornerAiAssistantProps {
  onOpenChat: (initialPrompt?: string) => void;
  onOpenSettings: () => void;
  onOpenLibrary: () => void;
  isChatOpen: boolean;
  language?: Language;
  onToggleLanguage?: () => void;
}

export const CornerAiAssistant: React.FC<CornerAiAssistantProps> = ({
  onOpenChat,
  onOpenSettings,
  onOpenLibrary,
  isChatOpen,
  language = 'en',
  onToggleLanguage
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCallout, setShowCallout] = useState(true);
  const t = TRANSLATIONS[language];

  // Close menu if chat opens
  useEffect(() => {
    if (isChatOpen) {
      setShowMenu(false);
      setShowCallout(false);
    }
  }, [isChatOpen]);

  const handleSelectOption = (prompt?: string) => {
    setShowMenu(false);
    setShowCallout(false);
    onOpenChat(prompt);
  };

  const bookConciergePrompt = language === 'it'
    ? "Consigliami un libro trasformativo dall'archivio di 100 libri basandoti su come mi sento."
    : "Recommend a transformative book from the 100-book library based on how I'm feeling.";

  const quickResetPrompt = language === 'it'
    ? "Offrimi una tecnica di riformulazione cognitiva rapida in 2 minuti per stress o ansia intensi."
    : "Give me a quick 2-minute cognitive reframe for intense stress or anxiety.";

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* 1. Proactive Welcome Callout Pill (dismissible) */}
      {showCallout && !isChatOpen && !showMenu && (
        <div className="mb-2 bg-neutral-900 border border-neutral-700 text-white p-2.5 max-w-xs shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="text-[11px] font-mono-code text-neutral-300">
                {t.needGuidance}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCallout(false);
              }}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-0.5"
              aria-label="Dismiss message"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={() => handleSelectOption()}
            className="mt-2 text-left w-full text-xs font-mono-code font-bold uppercase tracking-wider text-white hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{t.askAssistant}</span>
          </button>
        </div>
      )}

      {/* 2. Options Dropup Menu */}
      {showMenu && !isChatOpen && (
        <div className="mb-2 w-72 bg-neutral-950 border border-neutral-700 shadow-2xl p-3 text-white animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-white" />
              <span className="text-xs font-mono-code font-bold uppercase tracking-widest text-white">
                {language === 'it' ? 'Opzioni Assistente IA' : 'AI Assistant Options'}
              </span>
            </div>
            <button
              onClick={() => setShowMenu(false)}
              className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            {/* Option A: Chat with Assistant */}
            <button
              onClick={() => handleSelectOption()}
              className="w-full text-left p-2 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors flex items-start gap-2.5 cursor-pointer group"
            >
              <MessageSquare className="w-4 h-4 mt-0.5 text-neutral-400 group-hover:text-white shrink-0" />
              <div>
                <div className="text-xs font-mono-code font-semibold text-white">
                  {t.openChatbot}
                </div>
                <div className="text-[11px] font-mono-code text-neutral-400 leading-tight">
                  {t.openChatbotDesc}
                </div>
              </div>
            </button>

            {/* Option B: Recommend a Book */}
            <button
              onClick={() => handleSelectOption(bookConciergePrompt)}
              className="w-full text-left p-2 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors flex items-start gap-2.5 cursor-pointer group"
            >
              <BookOpen className="w-4 h-4 mt-0.5 text-neutral-400 group-hover:text-white shrink-0" />
              <div>
                <div className="text-xs font-mono-code font-semibold text-white">
                  {t.bookConcierge}
                </div>
                <div className="text-[11px] font-mono-code text-neutral-400 leading-tight">
                  {t.bookConciergeDesc}
                </div>
              </div>
            </button>

            {/* Option C: Quick Mindset Reframe */}
            <button
              onClick={() => handleSelectOption(quickResetPrompt)}
              className="w-full text-left p-2 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors flex items-start gap-2.5 cursor-pointer group"
            >
              <Compass className="w-4 h-4 mt-0.5 text-neutral-400 group-hover:text-white shrink-0" />
              <div>
                <div className="text-xs font-mono-code font-semibold text-white">
                  {t.quickReset}
                </div>
                <div className="text-[11px] font-mono-code text-neutral-400 leading-tight">
                  {t.quickResetDesc}
                </div>
              </div>
            </button>

            {/* Option D: Language Switcher */}
            {onToggleLanguage && (
              <button
                onClick={() => {
                  onToggleLanguage();
                }}
                className="w-full text-left p-2 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors flex items-start gap-2.5 cursor-pointer group"
              >
                <Languages className="w-4 h-4 mt-0.5 text-neutral-400 group-hover:text-white shrink-0" />
                <div>
                  <div className="text-xs font-mono-code font-semibold text-white flex items-center gap-2">
                    <span>{language === 'it' ? 'Lingua: Italiano' : 'Language: English'}</span>
                    <span className="text-[10px] px-1 py-0.2 bg-white text-black font-bold">
                      {language === 'it' ? 'IT' : 'EN'}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono-code text-neutral-400 leading-tight">
                    {language === 'it' ? 'Passa alla lingua inglese (EN)' : 'Switch to Italian (IT)'}
                  </div>
                </div>
              </button>
            )}

            {/* Option E: Gemini API Settings */}
            <button
              onClick={() => {
                setShowMenu(false);
                onOpenSettings();
              }}
              className="w-full text-left p-2 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors flex items-start gap-2.5 cursor-pointer group"
            >
              <Settings className="w-4 h-4 mt-0.5 text-neutral-400 group-hover:text-white shrink-0" />
              <div>
                <div className="text-xs font-mono-code font-semibold text-white">
                  {t.geminiSettings}
                </div>
                <div className="text-[11px] font-mono-code text-neutral-400 leading-tight">
                  {t.geminiSettingsDesc}
                </div>
              </div>
            </button>
          </div>

          <div className="mt-2 pt-2 border-t border-neutral-900 flex items-center justify-between text-[10px] font-mono-code text-neutral-400 px-1">
            <span>Powered by Gemini 3.8 Flash</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
              {language === 'it' ? 'Attivo' : 'Online'}
            </span>
          </div>
        </div>
      )}

      {/* 3. Main Floating Corner Button */}
      <div className="flex items-center shadow-2xl border border-white/90 bg-black group hover:bg-white transition-colors duration-200">
        {/* Primary Click to Open AI Assistant */}
        <button
          onClick={() => {
            if (isChatOpen) {
              onOpenChat(); // toggle or reopen
            } else {
              handleSelectOption();
            }
          }}
          className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-mono-code uppercase tracking-wider text-white group-hover:text-black transition-colors cursor-pointer select-none"
          title="Open AI Assistant"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <Bot className="w-4 h-4 text-white group-hover:text-black transition-colors" />
          <span className="font-bold">{t.assistantTitle}</span>
        </button>

        {/* Dropdown Options Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(prev => !prev);
          }}
          className="px-2 py-2.5 border-l border-neutral-800 group-hover:border-neutral-300 text-neutral-300 group-hover:text-black transition-colors cursor-pointer"
          title="More AI Assistant Options"
          aria-label="More AI Assistant Options"
        >
          {showMenu ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};
