import React, { useState } from 'react';
import { getStoredApiKey, setStoredApiKey } from '../services/gemini';
import { X, Key, CheckCircle, ShieldAlert, Cpu, Globe } from 'lucide-react';
import { Language } from '../utils/i18n';

interface GeminiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export const GeminiSettingsModal: React.FC<GeminiSettingsModalProps> = ({
  isOpen,
  onClose,
  language = 'en',
  onLanguageChange
}) => {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const isIt = language === 'it';

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredApiKey(apiKey);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    setApiKey('');
    setStoredApiKey('');
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-700 p-6 sm:p-8 shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white border border-transparent hover:border-neutral-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-neutral-800 pb-4 mb-5">
          <div className="p-2 border border-neutral-800 bg-neutral-900">
            <Key className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-serif-title text-xl font-bold text-white">
              {isIt ? 'Impostazioni Gemini AI & Lingua' : 'Gemini AI & Language Settings'}
            </h3>
            <p className="text-xs font-mono-code text-neutral-400">
              {isIt ? 'Configura modello, lingua e credenziali API' : 'Configure models, language and API credentials'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Language Selector in Settings */}
          {onLanguageChange && (
            <div className="p-3 bg-neutral-900/60 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-300">
                  <Globe className="w-4 h-4 text-white" />
                  <span>{isIt ? 'Lingua dell\'applicazione:' : 'Application Language:'}</span>
                </div>
                <span className="text-[10px] font-mono-code text-neutral-400 uppercase">
                  {language.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  className={`py-2 px-3 border text-xs font-mono-code uppercase tracking-wider transition-colors cursor-pointer text-center ${
                    language === 'en'
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-black text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('it')}
                  className={`py-2 px-3 border text-xs font-mono-code uppercase tracking-wider transition-colors cursor-pointer text-center ${
                    language === 'it'
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-black text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                  }`}
                >
                  Italiano 🇮🇹
                </button>
              </div>
            </div>
          )}

          {/* Active Model */}
          <div className="p-3 bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-xs font-mono-code">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-300">{isIt ? 'Modello Attivo:' : 'Target Model:'}</span>
            </div>
            <span className="px-2 py-0.5 bg-black border border-neutral-700 text-white font-semibold">
              gemini-3.8-flash
            </span>
          </div>

          {/* API Key Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono-code uppercase tracking-wider text-neutral-300 block">
              {isIt ? 'Chiave API Gemini:' : 'Gemini API Key:'}
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={isIt ? "AIzaSy... (lascia vuoto per fallback istantaneo)" : "AIzaSy... (leave blank for instant smart fallback)"}
              className="w-full px-3 py-2.5 bg-black border border-neutral-800 text-sm font-mono-code text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
            />
            <p className="text-[11px] font-mono-code text-neutral-400">
              {isIt 
                ? 'La tua chiave viene salvata localmente nel browser. Se vuota, MoodFlip funziona istantaneamente con intelligenza locale.'
                : 'Your key is saved locally in your browser storage. If left empty, MoodFlip seamlessly runs with built-in instant local intelligence.'}
            </p>
          </div>

          {/* Status pill */}
          <div className="flex items-center gap-2 text-xs font-mono-code">
            {apiKey ? (
              <span className="flex items-center gap-1.5 text-neutral-200">
                <CheckCircle className="w-4 h-4 text-white" />
                {isIt ? 'Chiave Gemini Personalizzata Attiva' : 'Custom Gemini Key Configured'}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-neutral-400">
                <ShieldAlert className="w-4 h-4 text-neutral-500" />
                {isIt ? 'Fallback Locale Attivo (Zero Latenza)' : 'Instant Local Fallback Active (Zero Latency)'}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-neutral-800">
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2 text-xs font-mono-code text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 cursor-pointer"
              >
                {isIt ? 'Rimuovi Chiave' : 'Clear Key'}
              </button>
            )}
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono-code text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600 cursor-pointer"
              >
                {isIt ? 'Annulla' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-mono-code uppercase tracking-wider bg-white text-black font-semibold hover:bg-neutral-200 cursor-pointer flex items-center gap-1.5"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    {isIt ? 'Salvato' : 'Saved'}
                  </>
                ) : (
                  isIt ? 'Salva Impostazioni' : 'Save Settings'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
