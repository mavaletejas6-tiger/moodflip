import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, sendChatMessage } from '../services/gemini';
import { X, Send, Bot, User, Sparkles, BookOpen, RotateCcw } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLibraryWithTag?: (tag: string) => void;
  initialPrompt?: string | null;
  language?: Language;
  useVladimirScript?: boolean;
}

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({
  isOpen,
  onClose,
  onOpenLibraryWithTag,
  initialPrompt,
  language = 'en',
  useVladimirScript = true
}) => {
  const t = TRANSLATIONS[language];

  const getInitialBotMessage = (): ChatMessage => ({
    id: `welcome-${language}`,
    role: 'model',
    text: t.assistantWelcome,
    timestamp: Date.now()
  });

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialBotMessage()]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasHandledInitialPrompt = useRef<string | null>(null);

  // Update welcome message if language changes and only welcome message is in history
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].role === 'model') {
        return [getInitialBotMessage()];
      }
      return prev;
    });
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (initialPrompt && initialPrompt !== hasHandledInitialPrompt.current) {
        hasHandledInitialPrompt.current = initialPrompt;
        handleSend(initialPrompt);
      }
    }
  }, [isOpen, initialPrompt]);

  const handleResetChat = () => {
    setMessages([getInitialBotMessage()]);
    setInputText('');
    hasHandledInitialPrompt.current = null;
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text,
      timestamp: Date.now()
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const replyText = await sendChatMessage(newHistory, text, language);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: Date.now()
      };
      setMessages([...newHistory, botMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: language === 'it' 
          ? "Sto prendendo una breve pausa di quiete. Fai un respiro lento e riprova tra poco, oppure esplora direttamente la Biblioteca MoodFlip."
          : "I am taking a mindful pause. Take a slow breath, and feel free to try again or browse the MoodFlip Library directly.",
        timestamp: Date.now()
      };
      setMessages([...newHistory, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const starterPrompts = t.assistantSuggestions;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-neutral-950 border-l border-neutral-800 shadow-2xl flex flex-col text-white animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 bg-black">
        <div className="flex items-center gap-3">
          <div className="p-1.5 border border-neutral-700 bg-neutral-900">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif-title text-lg font-bold text-white leading-none">
                {t.assistantTitle}
              </h3>
              <span className="text-[10px] font-mono-code px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-300">
                {t.assistantRole}
              </span>
            </div>
            <span className="text-[10px] font-mono-code text-neutral-400">
              Powered by Gemini 3.8 Flash
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            className="p-1.5 text-neutral-400 hover:text-white border border-transparent hover:border-neutral-800 transition-colors cursor-pointer"
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white border border-transparent hover:border-neutral-800 transition-colors cursor-pointer"
            title="Close Assistant"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="w-6 h-6 border border-neutral-700 bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            )}

            <div
              className={`max-w-[85%] p-3.5 leading-relaxed ${
                msg.role === 'user'
                  ? useVladimirScript
                    ? 'bg-white text-black font-normal border border-white font-vladimir text-lg sm:text-xl'
                    : 'bg-white text-black font-medium border border-white text-xs sm:text-sm font-mono-code'
                  : 'bg-neutral-900 text-neutral-200 border border-neutral-800 text-xs sm:text-sm font-mono-code'
              }`}
            >
              {msg.text}
            </div>

            {msg.role === 'user' && (
              <div className="w-6 h-6 border border-white bg-white text-black flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3 h-3 text-black" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-6 h-6 border border-neutral-700 bg-neutral-900 flex items-center justify-center shrink-0">
              <Sparkles className="w-3 h-3 text-neutral-400 animate-spin" />
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 text-xs font-mono-code text-neutral-400 italic">
              {t.assistantReframing}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompt Chips */}
      {messages.length <= 2 && (
        <div className="p-3 border-t border-neutral-900 bg-neutral-950">
          <span className="text-[10px] font-mono-code uppercase tracking-wider text-neutral-500 block mb-2">
            {language === 'it' ? 'Spunti di riflessione:' : 'Suggested Inquiries:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {starterPrompts.map(prompt => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="text-[11px] font-mono-code text-left px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:text-white transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-neutral-800 bg-black flex gap-2 items-center"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.assistantInputPlaceholder}
          disabled={isLoading}
          className={`flex-1 bg-neutral-950 border border-neutral-800 px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors disabled:opacity-50 ${
            useVladimirScript
              ? 'font-vladimir text-lg sm:text-xl placeholder:font-mono-code placeholder:text-xs'
              : 'font-mono-code text-xs sm:text-sm'
          }`}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="px-3.5 py-2 bg-white text-black hover:bg-neutral-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
