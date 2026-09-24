import { GoogleGenAI } from '@google/genai';
import { BOOKS, getCompactBooksPrompt, getFallbackBooks } from '../data/books';

export interface MoodResult {
  detectedEmotion: string;
  vibeSummary: string;
  flippedState: string;
  flipQuote: string;
  solutions?: Array<{
    step: number;
    title: string;
    detail: string;
  }>;
  songs?: Array<{
    title: string;
    artist: string;
    why: string;
    spotifySearch: string;
  }>;
  books?: Array<{
    id: number;
    title: string;
    author: string;
    cat: string;
    tags: string[];
    why: string;
  }>;
}

export interface MoodFlipOptions {
  includeSolutions: boolean;
  includeSongs: boolean;
  includeBooks: boolean;
  readerLevel: 'Junior' | 'Senior' | 'Any';
  language?: 'en' | 'it';
}

export function getStoredApiKey(): string {
  const fromStorage = localStorage.getItem('moodflip_gemini_api_key');
  if (fromStorage && fromStorage.trim().length > 0) {
    return fromStorage.trim();
  }
  // Try Vite env if available
  const fromEnv = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  if (typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
    return fromEnv.trim();
  }
  return '';
}

export function setStoredApiKey(key: string): void {
  if (key) {
    localStorage.setItem('moodflip_gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('moodflip_gemini_api_key');
  }
}

// Fallback generator for complete offline / keyless experience
export function generateLocalFallback(
  input: string,
  options: MoodFlipOptions
): MoodResult {
  const isIt = options.language === 'it';
  const text = input.toLowerCase();
  
  let emotion = isIt ? 'Stress & Sovraccarico' : 'Stressed & Overwhelmed';
  let flippedState = isIt ? 'Calma Lucidità & Focus Sereno' : 'Calm Composure & Clear Focus';
  let flipQuote = isIt 
    ? 'Dentro di te, in questo preciso istante, c\'è il potere di rallentare il mondo con un unico, profondo respiro.'
    : 'Within you right now is the ability to slow the world down by one single, steady breath.';
  let vibeSummary = isIt
    ? 'Tensione accumulata e sovraccarico cognitivo dovuto a pressioni esterne.'
    : 'Tension and cognitive overload from accumulated pressure.';

  if (text.includes('sad') || text.includes('trist') || text.includes('piant') || text.includes('down') || text.includes('cry') || text.includes('grief') || text.includes('depress')) {
    emotion = isIt ? 'Cuore Pesante & Tristezza' : 'Heavyhearted & Sad';
    flippedState = isIt ? 'Dolce Conforto & Calore Ritrovato' : 'Gentle Comfort & Renewed Warmth';
    flipQuote = isIt
      ? 'Le lacrime nutrono il terreno della resilienza; ogni inverno custodisce la promessa della primavera.'
      : 'Tears water the soil of resilience; every winter carries the promise of spring.';
    vibeSummary = isIt
      ? 'Custodisci un dolore quieto o un peso emotivo che merita gentilezza e ascolto.'
      : 'Carrying quiet sorrow or an emotional weight that needs tenderness.';
  } else if (text.includes('bore') || text.includes('noia') || text.includes('annoiat') || text.includes('nothing to do') || text.includes('dull')) {
    emotion = isIt ? 'Irrequietezza & Noia' : 'Restless & Bored';
    flippedState = isIt ? 'Meraviglia Curiosa & Immaginazione Accesa' : 'Curious Wonder & Sparked Imagination';
    flipQuote = isIt
      ? 'La noia è una tela intonsa in attesa che la tua curiosità tracci la prima pennellata.'
      : 'Boredom is simply an empty canvas awaiting your curiosity to make the first brushstroke.';
    vibeSummary = isIt
      ? 'Mente pronta e sottostimolata, in attesa di un\'avventura coinvolgente o di una scoperta inedita.'
      : 'An understimulated mind ready for an engaging adventure or fresh discovery.';
  } else if (text.includes('tire') || text.includes('stanc') || text.includes('esaust') || text.includes('unmotivat') || text.includes('lazy') || text.includes('exhaust')) {
    emotion = isIt ? 'Energia Esaurita & Demotivazione' : 'Drained & Unmotivated';
    flippedState = isIt ? 'Slancio Ricaricato & Scintilla Interiore' : 'Recharged Drive & Inner Spark';
    flipQuote = isIt
      ? 'L\'azione precede la motivazione: compi semplicemente il passo più piccolo possibile.'
      : 'Action comes before motivation; just take the smallest possible step.';
    vibeSummary = isIt
      ? 'Riserve energetiche temporaneamente al minimo; hai bisogno di ispirazione rigenerante, non di forzature.'
      : 'Energy reserves are depleted, needing restorative inspiration rather than force.';
  } else if (text.includes('lonel') || text.includes('solit') || text.includes('solo') || text.includes('sola') || text.includes('isolate')) {
    emotion = isIt ? 'Isolamento & Solitudine' : 'Isolated & Lonely';
    flippedState = isIt ? 'Appartenenza Connessa & Calore di Sé' : 'Connected Belonging & Self-Warmth';
    flipQuote = isIt
      ? 'I libri e le storie umane condivise sono ponti invisibili che uniscono le nostre anime attraverso il tempo.'
      : 'Books and shared human stories are invisible bridges across time connecting us all.';
    vibeSummary = isIt
      ? 'Desiderio di sincera vicinanza e del conforto di sentirsi compresi nel profondo.'
      : 'Craving genuine kinship and reassurance of being understood.';
  } else if (text.includes('nervous') || text.includes('ansia') || text.includes('ansios') || text.includes('scared') || text.includes('paura') || text.includes('fear') || text.includes('exam') || text.includes('esame')) {
    emotion = isIt ? 'Ansia & Apprensione' : 'Anxious & Apprehensive';
    flippedState = isIt ? 'Coraggio Radicato & Calma Fortezza' : 'Grounded Courage & Quiet Fortitude';
    flipQuote = isIt
      ? 'Il coraggio non è l\'assenza di paura, ma la scelta consapevole di avanzare nonostante essa.'
      : 'Bravery is not the absence of fear, but walking through it anyway.';
    vibeSummary = isIt
      ? 'Timore anticipatorio e battito accelerato dovuti alla percezione di alte aspettative.'
      : 'Anticipatory dread or high stakes causing adrenaline spikes.';
  } else if (text.includes('angr') || text.includes('rabbia') || text.includes('arrabbiat') || text.includes('mad') || text.includes('frustrat')) {
    emotion = isIt ? 'Frustrazione & Rabbia' : 'Frustrated & Boiling';
    flippedState = isIt ? 'Potere Canalizzato & Pace Centrata' : 'Channelled Power & Centered Peace';
    flipQuote = isIt
      ? 'La rabbia è combustibile puro: canalizzala in azione costruttiva, non in auto-combustione.'
      : 'Anger is raw fuel; channel it into constructive creation, not self-combustion.';
    vibeSummary = isIt
      ? 'Attrito emotivo elevato, aspettative deluse o sensazione di ingiustizia subita.'
      : 'High friction, unmet expectations, or perceived injustice.';
  } else if (text.includes('happy') || text.includes('felic') || text.includes('gioia') || text.includes('excit') || text.includes('great')) {
    emotion = isIt ? 'Gioia Radiosa & Vibrazione Alta' : 'Joyful & Vibrating High';
    flippedState = isIt ? 'Armonia Luminosa & Delizia Condivisa' : 'Radiant Harmony & Shared Delight';
    flipQuote = isIt
      ? 'La gioia si moltiplica esponenzialmente nell\'istante in cui viene celebrata e donata all\'esterno.'
      : 'Joy multiplies the moment it is celebrated and channeled outward.';
    vibeSummary = isIt
      ? 'Spirito elevato, entusiasmo contagioso e abbondante vitalità.'
      : 'Elevated spirits and abundant vitality.';
  }

  const result: MoodResult = {
    detectedEmotion: emotion,
    vibeSummary,
    flippedState,
    flipQuote
  };

  if (options.includeSolutions) {
    result.solutions = isIt ? [
      {
        step: 1,
        title: 'Sospiro Fisiologico & Rilascio Corporeo',
        detail: 'Fai due inspirazioni rapide e consecutive con il naso, seguite da un\'espirazione lunga e lenta dalla bocca. Abbassa le spalle lontano dalle orecchie.'
      },
      {
        step: 2,
        title: 'La Micro-Azione da 2 Minuti',
        detail: 'Scegli un\'azione minima da 120 secondi (bere un bicchiere d\'acqua fresca, affacciarsi alla finestra, respirare aria pura) per sbloccare la mente.'
      },
      {
        step: 3,
        title: 'Spostamento dell\'Orizzonte',
        detail: 'Chiediti: "Questo singolo istante avrà davvero importanza tra un mese?" Concediti il permesso di fermarti un attimo senza alcun senso di colpa.'
      }
    ] : [
      {
        step: 1,
        title: 'Physiological Sigh & Body Reset',
        detail: 'Take two quick inhales through the nose, followed by one long, slow sigh out the mouth. Drop your shoulders away from your ears.'
      },
      {
        step: 2,
        title: 'The 2-Minute Micro-Action',
        detail: 'Identify one tiny 120-second task—stepping outside for air, drinking cold water, or sketching on paper—to shift neural momentum.'
      },
      {
        step: 3,
        title: 'Perspective Horizon Shift',
        detail: 'Ask yourself: "Will this specific moment matter in one month?" Give yourself permission to pause without guilt.'
      }
    ];
  }

  if (options.includeSongs) {
    result.songs = [
      {
        title: 'Weightless',
        artist: 'Marconi Union',
        why: isIt 
          ? 'Frequenze ambientali create scientificamente per ridurre il battito cardiaco e quietare il ronzio mentale.'
          : 'Scientifically crafted ambient frequencies that reduce heart rate and quiet mental chatter.',
        spotifySearch: 'Weightless Marconi Union'
      },
      {
        title: 'Here Comes the Sun',
        artist: 'The Beatles',
        why: isIt
          ? 'Calore acustico naturale che risveglia istintivamente speranza e orizzonti luminosi.'
          : 'Gentle acoustic warmth that instinctively signals hope and lighter mornings.',
        spotifySearch: 'Here Comes The Sun The Beatles'
      },
      {
        title: 'Clair de Lune',
        artist: 'Claude Debussy',
        why: isIt
          ? 'Melodia fluida al pianoforte che distende le tensioni interiori in una quieta contemplazione.'
          : 'Flowing piano dynamics that soothe nervous energy into reflective stillness.',
        spotifySearch: 'Clair de Lune Debussy'
      }
    ];
  }

  if (options.includeBooks) {
    const rawBooks = getFallbackBooks(emotion, options.readerLevel);
    result.books = rawBooks.map(item => {
      const bookData = BOOKS.find(b => b.id === item.id) || BOOKS[0];
      return {
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        cat: bookData.cat,
        tags: bookData.tags,
        why: isIt ? `Un classico rifugio letterario che offre una prospettiva indelebile per rigenerare questo stato d'animo.` : item.why
      };
    });
  }

  return result;
}

export async function analyzeMoodWithGemini(
  input: string,
  options: MoodFlipOptions,
  imageBase64?: string
): Promise<MoodResult> {
  const apiKey = getStoredApiKey();

  // If no API key configured, use intelligent local fallback
  if (!apiKey) {
    // Artificial brief delay for realistic tactile feel
    await new Promise(r => setTimeout(r, 650));
    return generateLocalFallback(input, options);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const compactBooks = options.includeBooks ? getCompactBooksPrompt() : '';

    const isItalian = options.language === 'it';
    const systemPrompt = `You are MoodFlip AI, a minimalist black & white emotional wellness and perspective-shifting system for students and readers.
Your mission is to detect the user's emotional state, formulate a "Mood Flip" (transforming negative, blocked, or turbulent energy into grounded, positive fortitude), and provide structured solutions, song recommendations, and curated books.
${isItalian ? `CRITICAL LANGUAGE REQUIREMENT: You MUST output ALL textual content in fluent, elegant, empathetic ITALIAN (italiano). The "detected_emotion", "vibe_summary", "flipped_state", "flip_quote", solutions "title" and "detail", songs "why", and books "why" fields MUST ALL BE IN ITALIAN.` : ''}

The user will provide their current feelings${imageBase64 ? ' and a camera snapshot of their facial expression' : ''}.
Selected Options:
- Solutions requested: ${options.includeSolutions}
- Songs requested: ${options.includeSongs}
- Books requested: ${options.includeBooks}
- Reader level target: ${options.readerLevel}

CRITICAL RULES FOR BOOKS (if requested):
- Choose ONLY from this EXACT list of 100 books. Do NOT invent books or authors.
- You MUST provide EXACTLY 3 books matching the user's emotion, vibe, and reader level (${options.readerLevel}).
- For each book, return ONLY its numeric id from the list, and a "why" line written in your own words (one short line explaining why this book flips or supports this mood). DO NOT quote text from any book.
- Available Books:
${compactBooks}

OUTPUT FORMAT: Return STRICT JSON ONLY (no markdown backticks, no explanations outside JSON):
{
  "detected_emotion": "Short label (e.g. Exam Panic, Drained & Dull, Heavy Sorrow, Restless Boredom)",
  "vibe_summary": "1-2 sentences summarizing their current frequency and tension",
  "flipped_state": "The transformed state (e.g. Grounded Poise, Radiant Vitality, Serene Patience)",
  "flip_quote": "A single poignant, memorable 1-line reframe",
  ${options.includeSolutions ? `"solutions": [
    {"step": 1, "title": "Crisp Action Name", "detail": "1-2 sentence actionable instruction"},
    {"step": 2, "title": "...", "detail": "..."},
    {"step": 3, "title": "...", "detail": "..."}
  ],` : ''}
  ${options.includeSongs ? `"songs": [
    {"title": "Song Title", "artist": "Artist Name", "why": "Why this track flips this mood", "spotify_search": "Title Artist"},
    {"title": "...", "artist": "...", "why": "...", "spotify_search": "..."},
    {"title": "...", "artist": "...", "why": "...", "spotify_search": "..."}
  ],` : ''}
  ${options.includeBooks ? `"books": [
    {"id": <valid id from list 1-100>, "why": "One short line in your own words explaining why"},
    {"id": <valid id from list 1-100>, "why": "..."},
    {"id": <valid id from list 1-100>, "why": "..."}
  ]` : ''}
}`;

    const contents: any[] = [];
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      contents.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: cleanBase64
        }
      });
    }
    contents.push({
      text: `User Feeling Description: "${input || 'Scanning emotional state'}"`
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.7
      }
    });

    const rawText = response.text || '';
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    // Map and sanitize books
    let parsedBooks: any[] | undefined = undefined;
    if (options.includeBooks) {
      if (Array.isArray(parsed.books) && parsed.books.length > 0) {
        parsedBooks = parsed.books.map((b: any) => {
          const id = Number(b.id);
          const found = BOOKS.find(item => item.id === id);
          if (found) {
            return {
              id: found.id,
              title: found.title,
              author: found.author,
              cat: found.cat,
              tags: found.tags,
              why: b.why || 'A wonderful read to flip this emotional state.'
            };
          }
          return null;
        }).filter(Boolean);
      }

      // If Gemini returned invalid IDs or fewer than 3, fallback cleanly
      if (!parsedBooks || parsedBooks.length < 3) {
        const fallbacks = getFallbackBooks(parsed.detected_emotion || input, options.readerLevel);
        parsedBooks = fallbacks.map(item => {
          const bookData = BOOKS.find(b => b.id === item.id) || BOOKS[0];
          return {
            id: bookData.id,
            title: bookData.title,
            author: bookData.author,
            cat: bookData.cat,
            tags: bookData.tags,
            why: item.why
          };
        });
      }
    }

    return {
      detectedEmotion: parsed.detected_emotion || 'Unsettled State',
      vibeSummary: parsed.vibe_summary || 'Tuning into your frequency...',
      flippedState: parsed.flipped_state || 'Grounded Equilibrium',
      flipQuote: parsed.flip_quote || 'You hold the power to reset your perspective at any moment.',
      solutions: options.includeSolutions ? parsed.solutions : undefined,
      songs: options.includeSongs ? parsed.songs : undefined,
      books: parsedBooks
    };
  } catch (err) {
    console.warn('Gemini API call failed or encountered parse error, using fallback:', err);
    return generateLocalFallback(input, options);
  }
}

// Multi-turn Gemini Chat for "MoodFlip Companion"
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export async function sendChatMessage(
  history: ChatMessage[],
  newMessage: string,
  language: 'en' | 'it' = 'en'
): Promise<string> {
  const apiKey = getStoredApiKey();
  const isIt = language === 'it';

  if (!apiKey) {
    // Intelligent empathetic local fallback
    await new Promise(r => setTimeout(r, 600));
    const lower = newMessage.toLowerCase();
    if (lower.includes('book') || lower.includes('read') || lower.includes('libr') || lower.includes('legg')) {
      return isIt
        ? "Se cerchi una lettura trasformativa, consulta la Biblioteca MoodFlip! Per infondere coraggio, scopri 'Il buio oltre la siepe' (#1) o 'Il richiamo della foresta' (#30). Per una prospettiva di quiete, 'Pensieri' di Marco Aurelio (#66) o 'Il Piccolo Principe' (#21) sono gemme preziose. Puoi anche configurare la tua chiave API Gemini nelle Impostazioni per risposte interattive su misura."
        : "If you're looking for something transformative to read, browse the MoodFlip Library! For courage, try 'To Kill a Mockingbird' (#1) or 'Hatchet' (#30). For calm perspective, 'Meditations' (#66) or 'The Little Prince' (#21) work wonders. To configure deep interactive AI answers, set your Gemini API key in Settings.";
    }
    if (lower.includes('stress') || lower.includes('exam') || lower.includes('esame') || lower.includes('ansia') || lower.includes('anxious')) {
      return isIt
        ? "Quando l'ansia per gli esami sale, ricorda: ogni grande percorso si affronta un solo esercizio alla volta. Fai tre respiri profondi e lenti. Vorresti che ti consigliassi un libro specifico dalla nostra biblioteca per distendere i nervi e ritrovare lucidità?"
        : "When exam stress spikes, remind yourself: preparation is built one problem at a time, not all at once. Try taking 3 physiological sighs (two quick inhales, one slow exhale). Would you like a book recommendation from our library to help calm your focus?";
    }
    return isIt
      ? "Ciao! Sono il tuo Assistente e Compagno MoodFlip. Sono qui per aiutarti a riflettere, riformulare momenti di difficoltà e guidarti tra i 100 libri della biblioteca scolastica. Cosa hai nel cuore oggi?"
      : "I am your MoodFlip Companion. I am here to help you reflect, reframe difficult moments, and discover books from our 100-volume school library. What is on your mind right now?";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Format history
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    contents.push({
      role: 'user',
      parts: [{ text: newMessage }]
    });

    const systemInstruction = `You are MoodFlip Companion, an empathetic, wise, and grounded school library and wellness mentor.
Your tone is calm, thoughtful, encouraging, and intellectual, fitting a classic black & white editorial library.
${isIt ? 'LANGUAGE: Respond in fluent, empathetic, literary ITALIAN (italiano) at all times.' : ''}
You help students and readers:
1. Navigate emotional states (stress, anxiety, lack of motivation, loneliness, joy).
2. Recommend relevant titles from the MoodFlip 100-book collection.
3. Offer practical reframing techniques and philosophical wisdom (Stoicism, mindfulness, literature insights).
Keep responses concise, warm, non-judgmental, and readable. Never preach or sound robotic.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    return response.text || "I'm listening. Take a deep breath and tell me more about how you're feeling.";
  } catch (err: any) {
    console.warn('Chat error:', err);
    return "I am currently taking a quiet moment. Remember: whenever emotions feel overwhelming, stepping back and diving into a great book from the library can offer the exact perspective shift you need.";
  }
}
