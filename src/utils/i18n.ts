export type Language = 'en' | 'it';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  libraryNav: string;
  aiAssistantNav: string;
  settingsNav: string;
  taglineBanner: string;
  heroTitle: string;
  heroSubtitle: string;
  browseLibraryBtn: string;
  inputLabel: string;
  inputPlaceholder: string;
  cameraBtn: string;
  cameraAttached: string;
  presetsTitle: string;
  presets: Array<{ label: string; query: string }>;
  optionsTitle: string;
  optionsSubtitle: string;
  solutionsToggle: string;
  songsToggle: string;
  booksToggle: string;
  readerLevelTitle: string;
  readerLevelSubtitle: string;
  levels: {
    junior: { title: string; desc: string };
    senior: { title: string; desc: string };
    any: { title: string; desc: string };
  };
  flipButton: string;
  flippingButton: string;
  libraryTip: string;
  flipAnother: string;
  exploreBooks: string;
  flipCard: {
    beforeLabel: string;
    currentBadge: string;
    resonanceTitle: string;
    clickToFlip: string;
    afterLabel: string;
    transformedBadge: string;
    stateTitle: string;
    reframeTitle: string;
    clickToBack: string;
  };
  solutionsSectionTitle: string;
  solutionsSectionSubtitle: string;
  songsSectionTitle: string;
  songsSectionSubtitle: string;
  listenOnSpotify: string;
  booksSectionTitle: string;
  booksReaderLevel: string;
  findBook: string;
  moreLikeThis: string;
  backToInput: string;
  discussWithAssistant: string;
  browseAllBooks: string;
  footerArchive: string;
  footerEdition: string;
  assistantTitle: string;
  assistantRole: string;
  needGuidance: string;
  askAssistant: string;
  openChatbot: string;
  openChatbotDesc: string;
  bookConcierge: string;
  bookConciergeDesc: string;
  quickReset: string;
  quickResetDesc: string;
  geminiSettings: string;
  geminiSettingsDesc: string;
  assistantWelcome: string;
  assistantSuggestions: string[];
  assistantInputPlaceholder: string;
  assistantReframing: string;
  libraryTitle: string;
  librarySubtitle: string;
  backToMoodFlip: string;
  backToScanner: string;
  collection: string;
  booksWord: string;
  showing: string;
  matching: string;
  clearFilters: string;
  filterByMood: string;
  allTags: string;
  allCategories: string;
  noBooksFound: string;
  noBooksHint: string;
  detailsBtn: string;
  searchPlaceholder: string;
  surpriseMe: string;
  allFilter: string;
  showingCount: (filtered: number, total: number) => string;
  moodTags: Record<string, string>;
  categories: Record<string, string>;
  bookModal: {
    title: string;
    recommendedFor: string;
    readerLevel: string;
    moodTags: string;
    findOpenLibrary: string;
    filterByTag: string;
    close: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appTitle: "MoodFlip AI",
    appSubtitle: "Mindset Transformation",
    libraryNav: "MoodFlip Library",
    aiAssistantNav: "AI Assistant",
    settingsNav: "Gemini AI Settings",
    taglineBanner: "Flip Emotional Friction into Grounded Fortitude",
    heroTitle: "Flip Your Mood.",
    heroSubtitle: "Scan your state of mind. Receive cognitive reframing solutions, mood-matching tracks, and transformative books from our 100-volume library.",
    browseLibraryBtn: "Browse the 100-Book Library",
    inputLabel: "What is pressing on your mind?",
    inputPlaceholder: "Tell MoodFlip how you're feeling right now... (e.g. anxious about tomorrow's presentation, feeling drained, restless and lonely, overwhelmed by study schedule...)",
    cameraBtn: "Gemini Camera Scan",
    cameraAttached: "Expression Photo Attached",
    presetsTitle: "Or pick a current feeling resonance:",
    presets: [
      { label: 'Exams Stress', query: 'Completely stressed and overwhelmed by upcoming exams' },
      { label: 'Heavy Heart', query: 'Feeling quiet sadness and heavyhearted today' },
      { label: 'Restless Boredom', query: 'Stuck inside, nothing interesting to do, deeply bored' },
      { label: 'Drained Energy', query: 'Exhausted, low battery, and zero motivation to start work' },
      { label: 'Isolated', query: 'Feeling lonely and disconnected from everyone around me' },
      { label: 'Anxious Dread', query: 'Nervous butterflies and worried about making a mistake' },
      { label: 'Frustrated', query: 'Angry and annoyed because things are not going right' },
      { label: 'Curious Spark', query: 'Thoughtful, seeking deep questions and new ideas' }
    ],
    optionsTitle: "What do you want in your MoodFlip:",
    optionsSubtitle: "(at least one must stay on)",
    solutionsToggle: "Solutions",
    songsToggle: "Songs",
    booksToggle: "Books",
    readerLevelTitle: "Reader level target:",
    readerLevelSubtitle: "Guides Gemini to age-suitable books",
    levels: {
      junior: { title: "Junior", desc: "Classes 5–8" },
      senior: { title: "Senior", desc: "Classes 9–12" },
      any: { title: "Any", desc: "All Ages" }
    },
    flipButton: "FLIP MY MOOD",
    flippingButton: "FLIPPING PERSPECTIVE...",
    libraryTip: "Ask our school librarian to borrow this book!",
    flipAnother: "Flip Another Mood",
    exploreBooks: "Explore 100 Books",
    flipCard: {
      beforeLabel: "STATE: BEFORE / INPUT TENSION",
      currentBadge: "CURRENT",
      resonanceTitle: "Detected Resonance",
      clickToFlip: "Click or tap to flip state",
      afterLabel: "STATE: FLIPPED / INNER SHIFT",
      transformedBadge: "TRANSFORMED",
      stateTitle: "Transformed Mindset",
      reframeTitle: "Perspective Reframe",
      clickToBack: "Tap card to flip back"
    },
    solutionsSectionTitle: "Actionable Solutions",
    solutionsSectionSubtitle: "3 Immediate Reframing Steps",
    songsSectionTitle: "Mood-Flipping Tracks",
    songsSectionSubtitle: "Acoustic Shift",
    listenOnSpotify: "Listen on Spotify",
    booksSectionTitle: "Read this next",
    booksReaderLevel: "Level",
    findBook: "Find this book",
    moreLikeThis: "More like this",
    backToInput: "← Back to Mood Input",
    discussWithAssistant: "Discuss with AI Assistant",
    browseAllBooks: "Browse All 100 Books",
    footerArchive: "MOODFLIP AI • 100-BOOK ARCHIVE & EMOTIONAL REFRAMING",
    footerEdition: "Strict Monochromatic Minimalist Edition",
    assistantTitle: "AI Assistant",
    assistantRole: "Companion",
    needGuidance: "Need guidance or book advice?",
    askAssistant: "Ask AI Assistant →",
    openChatbot: "Open AI Chatbot",
    openChatbotDesc: "Discuss feelings, study stress, or reframing",
    bookConcierge: "Book Concierge",
    bookConciergeDesc: "Get a title matched to your emotional state",
    quickReset: "2-Minute Reset",
    quickResetDesc: "Instant grounding technique & perspective flip",
    geminiSettings: "Gemini AI Settings",
    geminiSettingsDesc: "Configure custom API key & model",
    assistantWelcome: "Hello. I am your MoodFlip AI Assistant & Companion. Whether you are dealing with exam pressure, seeking a tranquil perspective, or looking for an unforgettable book from our 100-title library, I'm here. How are you feeling today?",
    assistantSuggestions: [
      "I'm feeling anxious about school finals",
      "Recommend a book that gives me courage",
      "I'm tired and have zero motivation",
      "Give me a quick 2-minute calming technique"
    ],
    assistantInputPlaceholder: "Share your thoughts or ask for a book...",
    assistantReframing: "Reframing perspective...",
    libraryTitle: "MoodFlip Library",
    librarySubtitle: "100 hand-curated literary refuges, philosophical mirrors, and adventure portals classified by emotional resonance.",
    backToMoodFlip: "← Back to MoodFlip",
    backToScanner: "MoodFlip Scanner",
    collection: "Collection",
    booksWord: "books",
    showing: "Showing",
    matching: "matching",
    clearFilters: "Clear all filters",
    filterByMood: "Filter by Mood Resonance:",
    allTags: "All Tags",
    allCategories: "All Categories",
    noBooksFound: "No matching books found",
    noBooksHint: "Try adjusting your search query, mood tag, or category filter.",
    detailsBtn: "DETAILS",
    searchPlaceholder: "Search by title or author...",
    surpriseMe: "Surprise me",
    allFilter: "ALL",
    showingCount: (filtered, total) => `Showing ${filtered} of ${total} books`,
    moodTags: {
      CALM: "CALM",
      CHEER: "CHEER",
      MOTIVATE: "MOTIVATE",
      LAUGH: "LAUGH",
      COMFORT: "COMFORT",
      CURIOUS: "CURIOUS",
      COURAGE: "COURAGE",
      ESCAPE: "ESCAPE"
    },
    categories: {
      Classic: "Classic",
      Modern: "Modern",
      Kids: "Kids",
      Poetry: "Poetry",
      "Young Adult": "Young Adult",
      Fantasy: "Fantasy",
      "Sci-Fi": "Sci-Fi",
      Philosophy: "Philosophy",
      Memoir: "Memoir",
      Drama: "Drama",
      Adventure: "Adventure",
      Mystery: "Mystery",
      Nonfiction: "Nonfiction",
      Humor: "Humor"
    },
    bookModal: {
      title: "Book Archive Entry",
      recommendedFor: "Recommended emotional resonance:",
      readerLevel: "Reader Level:",
      moodTags: "Mood Tags:",
      findOpenLibrary: "Find this book on Open Library",
      filterByTag: "View more in this category",
      close: "Close"
    }
  },

  it: {
    appTitle: "MoodFlip AI",
    appSubtitle: "Trasformazione Mentale",
    libraryNav: "Biblioteca MoodFlip",
    aiAssistantNav: "Assistente IA",
    settingsNav: "Impostazioni Gemini IA",
    taglineBanner: "Trasforma l'Attrito Emotivo in Solida Forza Interiore",
    heroTitle: "Capovolgi il Tuo Umore.",
    heroSubtitle: "Scansiona il tuo stato d'animo. Ricevi soluzioni di riformulazione cognitiva, brani musicali in sintonia e libri trasformativi dalla nostra biblioteca di 100 volumi.",
    browseLibraryBtn: "Sfoglia la Biblioteca di 100 Libri",
    inputLabel: "Cosa ti preoccupa in questo momento?",
    inputPlaceholder: "Racconta a MoodFlip come ti senti adesso... (es. ansia per gli esami di domani, spossatezza e stanchezza, solitudine, stress da studio...)",
    cameraBtn: "Scansione Fotocamera Gemini",
    cameraAttached: "Foto Espressione Allegata",
    presetsTitle: "Oppure seleziona una risonanza emotiva:",
    presets: [
      { label: 'Stress da Esami', query: 'Completamente sopraffatto e stressato dagli esami imminenti' },
      { label: 'Cuore Pesante', query: 'Tristezza silenziosa e senso di peso emotivo oggi' },
      { label: 'Noia Irrequieta', query: 'Bloccato dentro casa, niente di stimolante da fare, noia profonda' },
      { label: 'Energia Esaurita', query: 'Spossato, batteria scarica e zero motivazione per iniziare a lavorare' },
      { label: 'Isolato', query: 'Mi sento solo e disconnesso da tutti coloro che mi circondano' },
      { label: 'Ansia e Timore', query: 'Batticuore, agitazione e paura costante di sbagliare o fallire' },
      { label: 'Frustrazione', query: 'Arrabbiato e infastidito perché le cose non vanno come vorrei' },
      { label: 'Scintilla Curiosa', query: 'Riflessivo, in cerca di domande profonde e nuove idee stimolanti' }
    ],
    optionsTitle: "Cosa vuoi includere nel tuo MoodFlip:",
    optionsSubtitle: "(almeno un'opzione deve rimanere attiva)",
    solutionsToggle: "Soluzioni",
    songsToggle: "Brani",
    booksToggle: "Libri",
    readerLevelTitle: "Livello di lettura:",
    readerLevelSubtitle: "Guida Gemini verso titoli adatti all'età",
    levels: {
      junior: { title: "Medie", desc: "Classi 1ª–3ª Media" },
      senior: { title: "Superiori", desc: "Classi Superiori" },
      any: { title: "Tutte le età", desc: "Per Tutti" }
    },
    flipButton: "CAPOVOLGI IL MIO UMORE",
    flippingButton: "CAPOVOLGIMENTO IN CORSO...",
    libraryTip: "Chiedi al bibliotecario della scuola per prendere in prestito questo libro!",
    flipAnother: "Capovolgi un Altro Umore",
    exploreBooks: "Esplora i 100 Libri",
    flipCard: {
      beforeLabel: "STATO: PRIMA / TENSIONE INIZIALE",
      currentBadge: "ATTUALE",
      resonanceTitle: "Risonanza Rilevata",
      clickToFlip: "Clicca o tocca per capovolgere lo stato",
      afterLabel: "STATO: CAPOVOLTO / TRASFORMAZIONE",
      transformedBadge: "TRASFORMATO",
      stateTitle: "Mentalità Trasformata",
      reframeTitle: "Riformulazione di Prospettiva",
      clickToBack: "Tocca la scheda per tornare indietro"
    },
    solutionsSectionTitle: "Soluzioni Concrete",
    solutionsSectionSubtitle: "3 Passi Immediati di Riformulazione",
    songsSectionTitle: "Brani per Capovolgere l'Umore",
    songsSectionSubtitle: "Transizione Acustica",
    listenOnSpotify: "Ascolta su Spotify",
    booksSectionTitle: "Leggi questo dopo",
    booksReaderLevel: "Livello",
    findBook: "Trova questo libro",
    moreLikeThis: "Altri simili",
    backToInput: "← Torna all'Inserimento",
    discussWithAssistant: "Discuti con l'Assistente IA",
    browseAllBooks: "Sfoglia Tutti i 100 Libri",
    footerArchive: "MOODFLIP AI • ARCHIVIO DI 100 LIBRI E RIFORMULAZIONE EMOTIVA",
    footerEdition: "Edizione Minimalista Monocromatica Rigorosa",
    assistantTitle: "Assistente IA",
    assistantRole: "Compagno",
    needGuidance: "Hai bisogno di una guida o di un libro?",
    askAssistant: "Chiedi all'Assistente IA →",
    openChatbot: "Apri Chatbot IA",
    openChatbotDesc: "Condividi emozioni, ansia da studio o reframing",
    bookConcierge: "Consulente Libri",
    bookConciergeDesc: "Ricevi un libro abbinato al tuo stato emotivo",
    quickReset: "Reset in 2 Minuti",
    quickResetDesc: "Tecnica rapida di radicamento e prospettiva",
    geminiSettings: "Impostazioni Gemini IA",
    geminiSettingsDesc: "Configura chiave API e modello personalizzato",
    assistantWelcome: "Ciao. Sono il tuo Assistente e Compagno MoodFlip. Che tu stia affrontando la pressione degli esami, cercando una prospettiva tranquilla o desiderando un libro indimenticabile dalla nostra biblioteca di 100 volumi, sono qui per te. Come ti senti oggi?",
    assistantSuggestions: [
      "Mi sento in ansia per gli esami a scuola",
      "Consigliami un libro che mi infonda coraggio",
      "Sono esausto e non ho alcuna motivazione",
      "Dammi una tecnica di rilassamento rapida in 2 minuti"
    ],
    assistantInputPlaceholder: "Condividi i tuoi pensieri o chiedi un libro...",
    assistantReframing: "Riformulazione della prospettiva in corso...",
    libraryTitle: "Biblioteca MoodFlip",
    librarySubtitle: "100 rifugi letterari, specchi filosofici e portali di avventura accuratamente catalogati per risonanza emotiva.",
    backToMoodFlip: "← Torna a MoodFlip",
    backToScanner: "Scanner MoodFlip",
    collection: "Collezione",
    booksWord: "libri",
    showing: "Visualizzati",
    matching: "corrispondenti",
    clearFilters: "Cancella tutti i filtri",
    filterByMood: "Filtra per Risonanza Emotiva:",
    allTags: "Tutti i Tag",
    allCategories: "Tutte le Categorie",
    noBooksFound: "Nessun libro corrispondente trovato",
    noBooksHint: "Prova a modificare la ricerca, il tag emotivo o il filtro di categoria.",
    detailsBtn: "DETTAGLI",
    searchPlaceholder: "Cerca per titolo o autore...",
    surpriseMe: "Sorprendimi!",
    allFilter: "TUTTI",
    showingCount: (filtered, total) => `Mostrati ${filtered} di ${total} libri`,
    moodTags: {
      CALM: "CALMA",
      CHEER: "ALLEGRIA",
      MOTIVATE: "MOTIVAZIONE",
      LAUGH: "RISATE",
      COMFORT: "CONFORTO",
      CURIOUS: "CURIOSITÀ",
      COURAGE: "CORAGGIO",
      ESCAPE: "EVASIONE"
    },
    categories: {
      Classic: "Classico",
      Modern: "Moderno",
      Kids: "Ragazzi",
      Poetry: "Poesia",
      "Young Adult": "Giovani Adulti",
      Fantasy: "Fantasy",
      "Sci-Fi": "Fantascienza",
      Philosophy: "Filosofia",
      Memoir: "Memorie",
      Drama: "Dramma",
      Adventure: "Avventura",
      Mystery: "Mistero",
      Nonfiction: "Saggistica",
      Humor: "Umorismo"
    },
    bookModal: {
      title: "Scheda Archivio Libro",
      recommendedFor: "Risonanza emotiva consigliata:",
      readerLevel: "Livello di Lettura:",
      moodTags: "Tag Emotivi:",
      findOpenLibrary: "Cerca questo libro su Open Library",
      filterByTag: "Vedi altri libri in questa categoria",
      close: "Chiudi"
    }
  }
};

const LANG_KEY = 'moodflip_user_language';

export function getStoredLanguage(): Language {
  try {
    const val = localStorage.getItem(LANG_KEY);
    if (val === 'en') return 'en';
    // If it was 'it', reset it back to 'en' per user request ("i dont want in italian")
    if (val === 'it') {
      localStorage.setItem(LANG_KEY, 'en');
      return 'en';
    }
  } catch {
    // fallback
  }
  return 'en';
}

export function setStoredLanguage(lang: Language): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // ignore
  }
}
