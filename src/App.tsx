/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  analyzeMoodWithGemini, 
  MoodResult, 
  MoodFlipOptions 
} from './services/gemini';
import { BOOKS, BookItem } from './data/books';
import { AutoResetTimer } from './components/AutoResetTimer';
import { FlipCard } from './components/FlipCard';
import { BookCover } from './components/BookCover';
import { BookDetailModal } from './components/BookDetailModal';
import { LibraryScreen } from './components/LibraryScreen';
import { GeminiSettingsModal } from './components/GeminiSettingsModal';
import { CameraScanModal } from './components/CameraScanModal';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { CornerAiAssistant } from './components/CornerAiAssistant';
import { 
  Language, 
  TRANSLATIONS, 
  getStoredLanguage, 
  setStoredLanguage 
} from './utils/i18n';
import { 
  BookOpen, 
  Settings, 
  Camera, 
  ExternalLink, 
  Filter, 
  Music, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight,
  Sparkles,
  BookMarked,
  HeartHandshake,
  Bot,
  Languages,
  PenTool
} from 'lucide-react';

type ScreenMode = 'welcome' | 'results' | 'library';

export default function App() {
  // Screen state
  const [screen, setScreen] = useState<ScreenMode>('welcome');

  // Language state (default English per user request: "i dont want in italian")
  const [language, setLanguageState] = useState<Language>(getStoredLanguage());

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setStoredLanguage(lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'it' ? 'en' : 'it');
  };

  const t = TRANSLATIONS[language];

  // Vladimir Script typography state (default: ON for "my words in vladamir script")
  const [useVladimirScript, setUseVladimirScript] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('moodflip_vladimir_script');
      return saved !== 'false';
    } catch {
      return true;
    }
  });

  const toggleVladimirScript = () => {
    setUseVladimirScript(prev => {
      const next = !prev;
      try {
        localStorage.setItem('moodflip_vladimir_script', String(next));
      } catch {}
      return next;
    });
  };

  // Input & Option state
  const [moodInput, setMoodInput] = useState('');
  const [options, setOptions] = useState<MoodFlipOptions>({
    includeSolutions: true,
    includeSongs: true,
    includeBooks: true,
    readerLevel: 'Any'
  });
  const [cameraImage, setCameraImage] = useState<string | null>(null);

  // Analysis result & loading
  const [isLoading, setIsLoading] = useState(false);
  const [moodResult, setMoodResult] = useState<MoodResult | null>(null);

  // Modals & Panels
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | null>(null);
  const [libraryInitialTag, setLibraryInitialTag] = useState<string | null>(null);
  const [activeModalBook, setActiveModalBook] = useState<BookItem | null>(null);

  const handleOpenChatWithPrompt = (prompt?: string) => {
    setChatInitialPrompt(prompt || null);
    setIsChatOpen(true);
  };

  // Options toggle handler (enforce at least one must stay on)
  const toggleOption = (key: 'includeSolutions' | 'includeSongs' | 'includeBooks') => {
    setOptions(prev => {
      const currentCount = 
        (prev.includeSolutions ? 1 : 0) + 
        (prev.includeSongs ? 1 : 0) + 
        (prev.includeBooks ? 1 : 0);

      // If trying to turn off the last active option, reject
      if (prev[key] && currentCount <= 1) {
        return prev;
      }

      return {
        ...prev,
        [key]: !prev[key]
      };
    });
  };

  // Perform mood flip
  const handleFlipMood = async (customText?: string) => {
    const textToAnalyze = customText || moodInput;
    const defaultPlaceholder = language === 'it' 
      ? 'Mi sento sopraffatto e cerco un reset della mia prospettiva'
      : 'Feeling overwhelmed and looking for a perspective reset';

    if (!textToAnalyze.trim() && !cameraImage) {
      setMoodInput(defaultPlaceholder);
    }

    setIsLoading(true);
    try {
      const result = await analyzeMoodWithGemini(
        textToAnalyze || defaultPlaceholder,
        { ...options, language },
        cameraImage || undefined
      );
      setMoodResult(result);
      setScreen('results');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-reset handler (40-second inactivity)
  const handleAutoReset = () => {
    setScreen('welcome');
    setMoodInput('');
    setCameraImage(null);
    setMoodResult(null);
    setLibraryInitialTag(null);
    setActiveModalBook(null);
    setIsSettingsOpen(false);
    setIsCameraOpen(false);
  };

  // Navigate to library with optional tag filter
  const openLibrary = (tagFilter?: string) => {
    setLibraryInitialTag(tagFilter || null);
    setScreen('library');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Top Universal Navigation Bar */}
      <header className="border-b border-neutral-800 bg-neutral-950/90 backdrop-blur sticky top-0 z-40 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setScreen('welcome')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-7 h-7 border border-white bg-white text-black flex items-center justify-center font-bold font-serif-title text-base group-hover:bg-neutral-200 transition-colors">
              F
            </div>
            <div>
              <span className="font-serif-title font-bold text-lg sm:text-xl tracking-tight text-white block leading-none">
                {t.appTitle}
              </span>
              <span className="text-[10px] font-mono-code text-neutral-400 tracking-widest uppercase">
                {t.appSubtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 40-second Inactivity Auto-Reset Timer */}
          <AutoResetTimer onReset={handleAutoReset} timeoutSeconds={40} />

          {/* Vladimir Script Calligraphy Toggle */}
          <button
            onClick={toggleVladimirScript}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code border transition-colors cursor-pointer ${
              useVladimirScript
                ? 'bg-white text-black border-white font-bold'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
            }`}
            title={useVladimirScript ? 'Vladimir Script font is ACTIVE for your words & emotional reframes' : 'Enable Vladimir Script font'}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Vladimir Script</span>
            <span className={`text-[10px] px-1 py-0.2 ${useVladimirScript ? 'bg-black text-white' : 'bg-neutral-800 text-neutral-400'}`}>
              {useVladimirScript ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Optional Language Switcher (EN by default) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono-code border border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors cursor-pointer"
            title={language === 'en' ? 'Switch to Italian' : 'Switch to English'}
          >
            <Languages className="w-3.5 h-3.5 text-white" />
            <span className="font-bold tracking-wider">{language === 'en' ? 'EN' : 'IT'}</span>
          </button>

          {/* Library Link Button */}
          <button
            onClick={() => openLibrary()}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code border transition-colors cursor-pointer ${
              screen === 'library'
                ? 'bg-white text-black border-white font-semibold'
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-600 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">MoodFlip</span> {language === 'it' ? 'Biblioteca' : 'Library'}
          </button>

          {/* AI Assistant Trigger */}
          <button
            onClick={() => handleOpenChatWithPrompt()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code border border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors cursor-pointer"
            title={t.openChatbot}
          >
            <Bot className="w-3.5 h-3.5 text-white" />
            <span className="hidden md:inline">{t.aiAssistantNav}</span>
          </button>

          {/* Settings Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-1.5 text-neutral-400 hover:text-white border border-neutral-800 bg-neutral-900 hover:border-neutral-600 transition-colors cursor-pointer"
            title={t.settingsNav}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body Content */}
      <main className="flex-1 flex flex-col">
        {/* ============================================================== */}
        {/* 1. WELCOME & SCANNER SCREEN                                   */}
        {/* ============================================================== */}
        {screen === 'welcome' && (
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-10 animate-in fade-in duration-300">
            {/* Title / Hero */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-neutral-800 text-[11px] font-mono-code tracking-widest uppercase text-neutral-400 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                {t.taglineBanner}
              </div>
              <h1 className={`${useVladimirScript ? 'font-vladimir text-5xl sm:text-7xl font-normal' : 'font-serif-title text-4xl sm:text-6xl font-extrabold'} tracking-tight text-white leading-tight`}>
                {t.heroTitle}
              </h1>
              <p className="text-sm sm:text-base font-mono-code text-neutral-400 max-w-xl mx-auto leading-relaxed">
                {t.heroSubtitle}
              </p>
            </div>

            {/* Quick Browse Library Callout */}
            <div className="flex justify-center">
              <button
                onClick={() => openLibrary()}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-700 bg-neutral-950 text-xs font-mono-code uppercase tracking-wider text-neutral-300 hover:border-white hover:text-white transition-all cursor-pointer group"
              >
                <BookMarked className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>{t.browseLibraryBtn}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-neutral-400 group-hover:text-white" />
              </button>
            </div>

            {/* Main Mood Input Box */}
            <div className="border border-neutral-800 bg-neutral-950 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono-code uppercase tracking-widest text-neutral-300 flex items-center gap-2">
                    <span>{t.inputLabel}</span>
                    {useVladimirScript && (
                      <span className="text-[10px] px-2 py-0.5 border border-neutral-700 bg-neutral-900 text-neutral-300 font-mono-code lowercase">
                        [vladimir script]
                      </span>
                    )}
                  </label>
                  <button
                    onClick={() => setIsCameraOpen(true)}
                    className={`flex items-center gap-1.5 text-xs font-mono-code px-2.5 py-1 border transition-colors cursor-pointer ${
                      cameraImage
                        ? 'border-white bg-white text-black font-semibold'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    {cameraImage ? t.cameraAttached : t.cameraBtn}
                  </button>
                </div>

                <textarea
                  value={moodInput}
                  onChange={(e) => setMoodInput(e.target.value)}
                  placeholder={t.inputPlaceholder}
                  rows={4}
                  className={`w-full bg-black border border-neutral-800 p-4 text-white focus:outline-none focus:border-white transition-colors resize-none leading-relaxed ${
                    useVladimirScript
                      ? 'font-vladimir text-2xl sm:text-3xl placeholder:font-mono-code placeholder:text-sm placeholder-neutral-600'
                      : 'font-mono-code text-sm sm:text-base placeholder-neutral-600'
                  }`}
                />
              </div>

              {/* Quick Emotion Presets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-code uppercase tracking-wider text-neutral-500">
                    {t.presetsTitle}
                  </span>
                  {useVladimirScript && (
                    <span className="text-[10px] font-mono-code text-neutral-500 hidden sm:inline">
                      ✒️ Feelings in Vladimir Script
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {t.presets.map(preset => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setMoodInput(preset.query);
                      }}
                      className={`px-3 py-1 bg-neutral-900 border border-neutral-800 hover:border-neutral-500 text-neutral-300 hover:text-white transition-colors cursor-pointer ${
                        useVladimirScript ? 'font-vladimir text-lg sm:text-xl' : 'text-xs font-mono-code'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* OPTIONS SECTION: Toggle Buttons & Reader Level */}
              <div className="border-t border-neutral-900 pt-6 space-y-5">
                {/* 1) What do you want toggle buttons */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-300">
                      {t.optionsTitle}
                    </span>
                    <span className="text-[10px] font-mono-code text-neutral-500">
                      {t.optionsSubtitle}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {/* Solutions Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleOption('includeSolutions')}
                      className={`py-2.5 px-3 border text-xs sm:text-sm font-mono-code uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        options.includeSolutions
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-black text-neutral-500 border-neutral-800 hover:border-neutral-700 hover:text-neutral-400'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${options.includeSolutions ? 'text-black' : 'text-neutral-700'}`} />
                      {t.solutionsToggle}
                    </button>

                    {/* Songs Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleOption('includeSongs')}
                      className={`py-2.5 px-3 border text-xs sm:text-sm font-mono-code uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        options.includeSongs
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-black text-neutral-500 border-neutral-800 hover:border-neutral-700 hover:text-neutral-400'
                      }`}
                    >
                      <Music className={`w-4 h-4 ${options.includeSongs ? 'text-black' : 'text-neutral-700'}`} />
                      {t.songsToggle}
                    </button>

                    {/* Books Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleOption('includeBooks')}
                      className={`py-2.5 px-3 border text-xs sm:text-sm font-mono-code uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        options.includeBooks
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-black text-neutral-500 border-neutral-800 hover:border-neutral-700 hover:text-neutral-400'
                      }`}
                    >
                      <BookOpen className={`w-4 h-4 ${options.includeBooks ? 'text-black' : 'text-neutral-700'}`} />
                      {t.booksToggle}
                    </button>
                  </div>
                </div>

                {/* 2) Reader Level Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-code uppercase tracking-wider text-neutral-300">
                      {t.readerLevelTitle}
                    </span>
                    <span className="text-[10px] font-mono-code text-neutral-400">
                      {t.readerLevelSubtitle}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {(['Junior', 'Senior', 'Any'] as const).map(lvl => {
                      const active = options.readerLevel === lvl;
                      const levelKey = lvl === 'Junior' ? 'junior' : lvl === 'Senior' ? 'senior' : 'any';
                      const levelConfig = t.levels[levelKey];
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setOptions(prev => ({ ...prev, readerLevel: lvl }))}
                          className={`p-2.5 border text-center transition-all cursor-pointer ${
                            active
                              ? 'bg-white text-black border-white'
                              : 'bg-black text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-neutral-200'
                          }`}
                        >
                          <div className="font-mono-code text-xs font-bold uppercase tracking-wider">
                            {levelConfig.title}
                          </div>
                          <div className={`text-[10px] font-mono-code ${active ? 'text-neutral-700' : 'text-neutral-500'}`}>
                            {levelConfig.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Big Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleFlipMood()}
                  disabled={isLoading}
                  className="w-full py-4 bg-white text-black font-bold text-sm sm:text-base font-mono-code uppercase tracking-widest hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RotateCcw className="w-5 h-5 animate-spin" />
                      {t.flippingButton}
                    </>
                  ) : (
                    <>
                      <span>{t.flipButton}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* School Library Tip Badge on Welcome */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-neutral-900 text-xs font-mono-code text-neutral-400">
              <div className="text-[11px]">
                {language === 'it' ? 'Nota di Biblioteca:' : 'Archive Tip:'}{' '}
                <span className="italic text-neutral-300">{t.libraryTip}</span>
              </div>
              <button
                type="button"
                onClick={() => handleOpenChatWithPrompt()}
                className="text-[11px] text-white hover:underline flex items-center gap-1.5 cursor-pointer uppercase tracking-wider font-semibold"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>{t.askAssistant}</span>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. RESULT SCREEN                                              */}
        {/* ============================================================== */}
        {screen === 'results' && moodResult && (
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-12 animate-in fade-in duration-300">
            {/* Top Navigation Back */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <button
                onClick={() => setScreen('welcome')}
                className="flex items-center gap-2 px-3 py-1.5 border border-neutral-800 text-xs font-mono-code text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {t.flipAnother}
              </button>

              <button
                onClick={() => openLibrary()}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-800 text-xs font-mono-code text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                {t.exploreBooks}
              </button>
            </div>

            {/* The 3D Interactive Flip Card */}
            <FlipCard
              detectedEmotion={moodResult.detectedEmotion}
              vibeSummary={moodResult.vibeSummary}
              flippedState={moodResult.flippedState}
              flipQuote={moodResult.flipQuote}
              language={language}
              useVladimirScript={useVladimirScript}
            />

            {/* SECTION 1: SOLUTIONS (if enabled) */}
            {options.includeSolutions && moodResult.solutions && moodResult.solutions.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
                  <HeartHandshake className="w-4 h-4 text-white" />
                  <h3 className="font-serif-title text-2xl font-bold text-white tracking-tight">
                    {t.solutionsSectionTitle}
                  </h3>
                  <span className="text-[10px] font-mono-code text-neutral-500 uppercase ml-auto">
                    {t.solutionsSectionSubtitle}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {moodResult.solutions.map(sol => (
                    <div
                      key={sol.step}
                      className="bg-neutral-950 border border-neutral-800 p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 border border-neutral-700 bg-black text-xs font-mono-code font-bold flex items-center justify-center text-white">
                          0{sol.step}
                        </span>
                        <span className="text-[10px] font-mono-code text-neutral-400 uppercase">
                          {language === 'it' ? 'Azione' : 'Action'}
                        </span>
                      </div>
                      <h4 className={`${useVladimirScript ? 'font-vladimir text-2xl sm:text-3xl font-normal' : 'font-serif-title text-lg font-bold'} text-white leading-snug`}>
                        {sol.title}
                      </h4>
                      <p className="text-xs font-mono-code text-neutral-300 leading-relaxed">
                        {sol.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 2: SPOTIFY SONGS (if enabled) */}
            {options.includeSongs && moodResult.songs && moodResult.songs.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
                  <Music className="w-4 h-4 text-white" />
                  <h3 className="font-serif-title text-2xl font-bold text-white tracking-tight">
                    {t.songsSectionTitle}
                  </h3>
                  <span className="text-[10px] font-mono-code text-neutral-500 uppercase ml-auto">
                    {t.songsSectionSubtitle}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {moodResult.songs.map((song, i) => (
                    <div
                      key={i}
                      className="bg-neutral-950 border border-neutral-800 p-5 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono-code text-neutral-400">
                          <span>{language === 'it' ? `BRANO #${i + 1}` : `TRACK #${i + 1}`}</span>
                          <span className="border border-neutral-800 px-1.5 py-0.2">SPOTIFY</span>
                        </div>
                        <h4 className={`${useVladimirScript ? 'font-vladimir text-2xl sm:text-3xl font-normal' : 'font-serif-title text-xl font-bold'} text-white leading-tight`}>
                          {song.title}
                        </h4>
                        <p className="text-xs font-mono-code text-neutral-400">
                          {song.artist}
                        </p>
                        <p className={`${useVladimirScript ? 'font-vladimir text-lg sm:text-xl text-neutral-200' : 'text-xs font-mono-code text-neutral-300'} leading-relaxed pt-1`}>
                          {song.why}
                        </p>
                      </div>

                      <a
                        href={`https://open.spotify.com/search/${encodeURIComponent(song.spotifySearch || `${song.title} ${song.artist}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-neutral-700 bg-neutral-900 text-xs font-mono-code uppercase tracking-wider text-neutral-200 hover:border-white hover:text-white transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {t.listenOnSpotify}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 3: BOOKS - "Read this next" (if enabled) */}
            {options.includeBooks && moodResult.books && moodResult.books.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-white" />
                    <h3 className="font-serif-title text-2xl font-bold text-white tracking-tight">
                      {t.booksSectionTitle}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono-code text-neutral-400 uppercase">
                    {t.booksReaderLevel}: {options.readerLevel === 'Junior' 
                      ? (language === 'it' ? 'Medie' : 'Junior')
                      : options.readerLevel === 'Senior'
                      ? (language === 'it' ? 'Superiori' : 'Senior')
                      : (language === 'it' ? 'Per Tutti' : 'Any')}
                  </span>
                </div>

                {/* Exactly 3 book cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {moodResult.books.slice(0, 3).map(book => {
                    const displayCategory = t.categories[book.cat] || book.cat;
                    const displayTag = book.tags?.[0] ? (t.moodTags[book.tags[0]] || book.tags[0]) : '';
                    return (
                      <div
                        key={book.id}
                        className="bg-neutral-950 border border-neutral-800 p-5 flex flex-col justify-between space-y-4 hover:border-neutral-600 transition-colors"
                      >
                        {/* Cover and details */}
                        <div className="space-y-4">
                          <div className="max-w-[150px] mx-auto">
                            <BookCover
                              title={book.title}
                              author={book.author}
                              showCoverFetch={true}
                            />
                          </div>

                          <div className="space-y-1 text-center">
                            <div className="flex items-center justify-center gap-1.5 mb-1">
                              <span className="text-[10px] font-mono-code px-1.5 py-0.5 border border-neutral-800 text-neutral-400">
                                {displayCategory}
                              </span>
                              {displayTag && (
                                <span className="text-[10px] font-mono-code px-1.5 py-0.5 bg-neutral-900 text-neutral-400">
                                  #{displayTag}
                                </span>
                              )}
                            </div>
                            <h4 className={`${useVladimirScript ? 'font-vladimir text-2xl sm:text-3xl font-normal' : 'font-serif-title text-xl font-bold'} text-white leading-snug`}>
                              {book.title}
                            </h4>
                            <p className="text-xs font-mono-code text-neutral-400">
                              {language === 'it' ? 'di' : 'by'} {book.author}
                            </p>
                          </div>

                          {/* The "why" line in its own words */}
                          <p className={`${useVladimirScript ? 'font-vladimir text-lg sm:text-xl text-neutral-200' : 'text-xs font-mono-code text-neutral-300'} leading-relaxed border-t border-neutral-900 pt-3`}>
                            "{book.why}"
                          </p>
                        </div>

                        {/* Two Buttons: Find this book + More like this */}
                        <div className="space-y-2 pt-2 border-t border-neutral-900">
                          <a
                            href={`https://openlibrary.org/search?q=${encodeURIComponent(`${book.title} ${book.author}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            {t.findBook}
                          </a>

                          <button
                            onClick={() => openLibrary(book.tags?.[0] || 'CALM')}
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-neutral-800 text-neutral-300 text-xs font-mono-code uppercase tracking-wider hover:border-white hover:text-white transition-colors cursor-pointer"
                          >
                            <Filter className="w-3.5 h-3.5" />
                            {t.moreLikeThis}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Library tip in small grey text under the books */}
                <div className="text-center pt-2">
                  <p className="text-xs font-mono-code text-neutral-400 italic">
                    {t.libraryTip}
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Screen Navigation Controls */}
            <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setScreen('welcome')}
                className="w-full sm:w-auto px-5 py-3 border border-neutral-700 text-xs font-mono-code uppercase tracking-widest text-neutral-200 hover:border-white hover:text-white transition-colors cursor-pointer"
              >
                {t.backToInput}
              </button>

              <button
                onClick={() => handleOpenChatWithPrompt(
                  language === 'it'
                    ? `Ho appena capovolto il mio umore: "${moodResult.detectedEmotion}" in "${moodResult.flippedState}". Quale prospettiva più profonda o libro dalla biblioteca di 100 volumi può sostenermi ora?`
                    : `I just flipped my mood: "${moodResult.detectedEmotion}" into "${moodResult.flippedState}". What deeper perspective or book from the 100-volume library can support me now?`
                )}
                className="w-full sm:w-auto px-5 py-3 border border-neutral-700 text-xs font-mono-code uppercase tracking-widest text-neutral-200 hover:border-white hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-white" />
                <span>{t.discussWithAssistant}</span>
              </button>

              <button
                onClick={() => openLibrary()}
                className="w-full sm:w-auto px-5 py-3 bg-white text-black text-xs font-mono-code uppercase font-bold tracking-widest hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.browseAllBooks}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. MOODFLIP LIBRARY SCREEN                                    */}
        {/* ============================================================== */}
        {screen === 'library' && (
          <LibraryScreen
            onBackToMoodFlip={() => setScreen('welcome')}
            initialTagFilter={libraryInitialTag}
            language={language}
            useVladimirScript={useVladimirScript}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-6 px-4 text-center text-xs font-mono-code text-neutral-400 space-y-1">
        <div>{t.footerArchive}</div>
        <div className="text-[11px] text-neutral-400">
          {t.footerEdition} • {t.libraryTip}
        </div>
      </footer>

      {/* Global Modals */}
      <GeminiSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
      />

      <CameraScanModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(img) => {
          setCameraImage(img);
          handleFlipMood();
        }}
        language={language}
      />

      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatInitialPrompt(null);
        }}
        initialPrompt={chatInitialPrompt}
        onOpenLibraryWithTag={(tag) => openLibrary(tag)}
        language={language}
        useVladimirScript={useVladimirScript}
      />

      {/* Persistent AI Assistant option in the corner */}
      <CornerAiAssistant
        onOpenChat={(prompt) => handleOpenChatWithPrompt(prompt)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenLibrary={() => openLibrary()}
        isChatOpen={isChatOpen}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      {/* Book details modal if opened anywhere */}
      {activeModalBook && (
        <BookDetailModal
          book={activeModalBook}
          onClose={() => setActiveModalBook(null)}
          onFilterByTag={(tag) => {
            setActiveModalBook(null);
            openLibrary(tag);
          }}
          language={language}
          useVladimirScript={useVladimirScript}
        />
      )}
    </div>
  );
}
