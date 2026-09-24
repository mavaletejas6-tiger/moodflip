// ====== BOOK LIBRARY (add or remove books here) ======
export interface BookItem {
  id: number;
  title: string;
  author: string;
  cat: string;
  tags: string[];
  readerLevel?: 'Junior' | 'Senior' | 'Any';
}

export const LIBRARY_TIP = "Ask our school librarian to borrow this book!"; // edit this line

export const BOOKS: BookItem[] = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", cat: "Classic", tags: ["COURAGE", "COMFORT"], readerLevel: "Senior" },
  { id: 2, title: "Pride and Prejudice", author: "Jane Austen", cat: "Classic", tags: ["LAUGH", "ESCAPE"], readerLevel: "Senior" },
  { id: 3, title: "The Old Man and the Sea", author: "Ernest Hemingway", cat: "Classic", tags: ["MOTIVATE", "CALM"], readerLevel: "Senior" },
  { id: 4, title: "Nineteen Eighty-Four", author: "George Orwell", cat: "Classic", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 5, title: "Animal Farm", author: "George Orwell", cat: "Classic", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 6, title: "Jane Eyre", author: "Charlotte Brontë", cat: "Classic", tags: ["COURAGE"], readerLevel: "Senior" },
  { id: 7, title: "Great Expectations", author: "Charles Dickens", cat: "Classic", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 8, title: "A Christmas Carol", author: "Charles Dickens", cat: "Classic", tags: ["CHEER", "COMFORT"], readerLevel: "Any" },
  { id: 9, title: "The Adventures of Tom Sawyer", author: "Mark Twain", cat: "Classic", tags: ["LAUGH", "ESCAPE"], readerLevel: "Junior" },
  { id: 10, title: "Adventures of Huckleberry Finn", author: "Mark Twain", cat: "Classic", tags: ["ESCAPE"], readerLevel: "Any" },
  { id: 11, title: "Little Women", author: "Louisa May Alcott", cat: "Classic", tags: ["COMFORT", "CHEER"], readerLevel: "Any" },
  { id: 12, title: "Anne of Green Gables", author: "L. M. Montgomery", cat: "Classic", tags: ["CHEER", "COMFORT"], readerLevel: "Any" },
  { id: 13, title: "The Secret Garden", author: "Frances Hodgson Burnett", cat: "Classic", tags: ["CALM", "CHEER"], readerLevel: "Junior" },
  { id: 14, title: "Alice's Adventures in Wonderland", author: "Lewis Carroll", cat: "Classic", tags: ["LAUGH", "ESCAPE"], readerLevel: "Junior" },
  { id: 15, title: "Treasure Island", author: "Robert Louis Stevenson", cat: "Classic", tags: ["ESCAPE"], readerLevel: "Junior" },
  { id: 16, title: "Frankenstein", author: "Mary Shelley", cat: "Classic", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 17, title: "The Picture of Dorian Gray", author: "Oscar Wilde", cat: "Classic", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 18, title: "The Count of Monte Cristo", author: "Alexandre Dumas", cat: "Classic", tags: ["MOTIVATE", "ESCAPE"], readerLevel: "Senior" },
  { id: 19, title: "Les Misérables", author: "Victor Hugo", cat: "Classic", tags: ["COURAGE", "COMFORT"], readerLevel: "Senior" },
  { id: 20, title: "The Wind in the Willows", author: "Kenneth Grahame", cat: "Classic", tags: ["CALM", "COMFORT"], readerLevel: "Junior" },
  { id: 21, title: "The Little Prince", author: "Antoine de Saint-Exupéry", cat: "Modern", tags: ["COMFORT", "CALM"], readerLevel: "Any" },
  { id: 22, title: "Charlotte's Web", author: "E. B. White", cat: "Kids", tags: ["COMFORT", "CHEER"], readerLevel: "Junior" },
  { id: 23, title: "Matilda", author: "Roald Dahl", cat: "Kids", tags: ["LAUGH", "COURAGE"], readerLevel: "Junior" },
  { id: 24, title: "Charlie and the Chocolate Factory", author: "Roald Dahl", cat: "Kids", tags: ["LAUGH", "ESCAPE"], readerLevel: "Junior" },
  { id: 25, title: "The BFG", author: "Roald Dahl", cat: "Kids", tags: ["LAUGH", "COMFORT"], readerLevel: "Junior" },
  { id: 26, title: "The Wonderful Wizard of Oz", author: "L. Frank Baum", cat: "Kids", tags: ["ESCAPE", "CHEER"], readerLevel: "Junior" },
  { id: 27, title: "Where the Sidewalk Ends", author: "Shel Silverstein", cat: "Poetry", tags: ["LAUGH", "CHEER"], readerLevel: "Junior" },
  { id: 28, title: "Diary of a Wimpy Kid", author: "Jeff Kinney", cat: "Kids", tags: ["LAUGH"], readerLevel: "Junior" },
  { id: 29, title: "Holes", author: "Louis Sachar", cat: "Young Adult", tags: ["LAUGH", "ESCAPE"], readerLevel: "Any" },
  { id: 30, title: "Hatchet", author: "Gary Paulsen", cat: "Young Adult", tags: ["COURAGE", "ESCAPE"], readerLevel: "Any" },
  { id: 31, title: "Wonder", author: "R. J. Palacio", cat: "Young Adult", tags: ["COMFORT", "COURAGE"], readerLevel: "Any" },
  { id: 32, title: "The Giver", author: "Lois Lowry", cat: "Young Adult", tags: ["CURIOUS"], readerLevel: "Any" },
  { id: 33, title: "A Wrinkle in Time", author: "Madeleine L'Engle", cat: "Young Adult", tags: ["CURIOUS", "COURAGE"], readerLevel: "Any" },
  { id: 34, title: "Coraline", author: "Neil Gaiman", cat: "Young Adult", tags: ["COURAGE", "ESCAPE"], readerLevel: "Junior" },
  { id: 35, title: "The Book Thief", author: "Markus Zusak", cat: "Young Adult", tags: ["COMFORT", "COURAGE"], readerLevel: "Senior" },
  { id: 36, title: "The Hunger Games", author: "Suzanne Collins", cat: "Young Adult", tags: ["COURAGE", "ESCAPE"], readerLevel: "Senior" },
  { id: 37, title: "Harry Potter and the Philosopher's Stone", author: "J. K. Rowling", cat: "Fantasy", tags: ["ESCAPE", "COMFORT"], readerLevel: "Any" },
  { id: 38, title: "The Lion, the Witch and the Wardrobe", author: "C. S. Lewis", cat: "Fantasy", tags: ["ESCAPE", "COURAGE"], readerLevel: "Junior" },
  { id: 39, title: "The Hobbit", author: "J. R. R. Tolkien", cat: "Fantasy", tags: ["ESCAPE", "COURAGE"], readerLevel: "Any" },
  { id: 40, title: "Percy Jackson and the Lightning Thief", author: "Rick Riordan", cat: "Fantasy", tags: ["LAUGH", "ESCAPE"], readerLevel: "Junior" },
  { id: 41, title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", cat: "Sci-Fi", tags: ["LAUGH", "ESCAPE"], readerLevel: "Senior" },
  { id: 42, title: "Dune", author: "Frank Herbert", cat: "Sci-Fi", tags: ["ESCAPE", "CURIOUS"], readerLevel: "Senior" },
  { id: 43, title: "Ender's Game", author: "Orson Scott Card", cat: "Sci-Fi", tags: ["COURAGE", "CURIOUS"], readerLevel: "Senior" },
  { id: 44, title: "I, Robot", author: "Isaac Asimov", cat: "Sci-Fi", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 45, title: "Twenty Thousand Leagues Under the Seas", author: "Jules Verne", cat: "Adventure", tags: ["ESCAPE", "CURIOUS"], readerLevel: "Any" },
  { id: 46, title: "Around the World in Eighty Days", author: "Jules Verne", cat: "Adventure", tags: ["ESCAPE", "LAUGH"], readerLevel: "Any" },
  { id: 47, title: "The Adventures of Sherlock Holmes", author: "Arthur Conan Doyle", cat: "Mystery", tags: ["ESCAPE", "CURIOUS"], readerLevel: "Any" },
  { id: 48, title: "And Then There Were None", author: "Agatha Christie", cat: "Mystery", tags: ["ESCAPE"], readerLevel: "Senior" },
  { id: 49, title: "Life of Pi", author: "Yann Martel", cat: "Modern", tags: ["COURAGE", "CURIOUS"], readerLevel: "Senior" },
  { id: 50, title: "The Alchemist", author: "Paulo Coelho", cat: "Modern", tags: ["MOTIVATE", "CALM"], readerLevel: "Any" },
  { id: 51, title: "Man's Search for Meaning", author: "Viktor E. Frankl", cat: "Self-growth", tags: ["MOTIVATE", "COMFORT"], readerLevel: "Senior" },
  { id: 52, title: "Atomic Habits", author: "James Clear", cat: "Self-growth", tags: ["MOTIVATE"], readerLevel: "Senior" },
  { id: 53, title: "Mindset", author: "Carol S. Dweck", cat: "Self-growth", tags: ["MOTIVATE", "COURAGE"], readerLevel: "Senior" },
  { id: 54, title: "Grit", author: "Angela Duckworth", cat: "Self-growth", tags: ["MOTIVATE", "COURAGE"], readerLevel: "Senior" },
  { id: 55, title: "Ikigai", author: "Héctor García and Francesc Miralles", cat: "Self-growth", tags: ["CALM", "MOTIVATE"], readerLevel: "Senior" },
  { id: 56, title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", cat: "Self-growth", tags: ["MOTIVATE"], readerLevel: "Senior" },
  { id: 57, title: "How to Win Friends and Influence People", author: "Dale Carnegie", cat: "Self-growth", tags: ["COMFORT", "MOTIVATE"], readerLevel: "Senior" },
  { id: 58, title: "Deep Work", author: "Cal Newport", cat: "Self-growth", tags: ["MOTIVATE", "CALM"], readerLevel: "Senior" },
  { id: 59, title: "The Power of Now", author: "Eckhart Tolle", cat: "Self-growth", tags: ["CALM"], readerLevel: "Senior" },
  { id: 60, title: "Think and Grow Rich", author: "Napoleon Hill", cat: "Self-growth", tags: ["MOTIVATE"], readerLevel: "Senior" },
  { id: 61, title: "Who Moved My Cheese?", author: "Spencer Johnson", cat: "Self-growth", tags: ["MOTIVATE", "CALM"], readerLevel: "Any" },
  { id: 62, title: "The Obstacle Is the Way", author: "Ryan Holiday", cat: "Self-growth", tags: ["MOTIVATE", "CALM"], readerLevel: "Senior" },
  { id: 63, title: "Daring Greatly", author: "Brené Brown", cat: "Self-growth", tags: ["COURAGE", "COMFORT"], readerLevel: "Senior" },
  { id: 64, title: "Quiet", author: "Susan Cain", cat: "Self-growth", tags: ["COMFORT"], readerLevel: "Senior" },
  { id: 65, title: "The Happiness Project", author: "Gretchen Rubin", cat: "Self-growth", tags: ["CHEER"], readerLevel: "Senior" },
  { id: 66, title: "Meditations", author: "Marcus Aurelius", cat: "Philosophy", tags: ["CALM"], readerLevel: "Senior" },
  { id: 67, title: "The Art of War", author: "Sun Tzu", cat: "Philosophy", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 68, title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", cat: "Money", tags: ["CURIOUS", "MOTIVATE"], readerLevel: "Senior" },
  { id: 69, title: "The Psychology of Money", author: "Morgan Housel", cat: "Money", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 70, title: "The Monk Who Sold His Ferrari", author: "Robin Sharma", cat: "Self-growth", tags: ["CALM", "MOTIVATE"], readerLevel: "Senior" },
  { id: 71, title: "Sapiens", author: "Yuval Noah Harari", cat: "History", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 72, title: "A Brief History of Time", author: "Stephen Hawking", cat: "Science", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 73, title: "Cosmos", author: "Carl Sagan", cat: "Science", tags: ["CURIOUS", "CALM"], readerLevel: "Senior" },
  { id: 74, title: "The Selfish Gene", author: "Richard Dawkins", cat: "Science", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 75, title: "Astrophysics for People in a Hurry", author: "Neil deGrasse Tyson", cat: "Science", tags: ["CURIOUS"], readerLevel: "Any" },
  { id: 76, title: "Surely You're Joking, Mr. Feynman!", author: "Richard P. Feynman", cat: "Science", tags: ["LAUGH", "CURIOUS"], readerLevel: "Senior" },
  { id: 77, title: "Guns, Germs, and Steel", author: "Jared Diamond", cat: "History", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 78, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", cat: "Psychology", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 79, title: "Sophie's World", author: "Jostein Gaarder", cat: "Philosophy", tags: ["CURIOUS"], readerLevel: "Any" },
  { id: 80, title: "Silent Spring", author: "Rachel Carson", cat: "Science", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 81, title: "Educated", author: "Tara Westover", cat: "Memoir", tags: ["COURAGE", "MOTIVATE"], readerLevel: "Senior" },
  { id: 82, title: "Born a Crime", author: "Trevor Noah", cat: "Memoir", tags: ["LAUGH", "COURAGE"], readerLevel: "Senior" },
  { id: 83, title: "I Am Malala", author: "Malala Yousafzai", cat: "Memoir", tags: ["COURAGE"], readerLevel: "Any" },
  { id: 84, title: "The Diary of a Young Girl", author: "Anne Frank", cat: "Memoir", tags: ["COMFORT", "COURAGE"], readerLevel: "Any" },
  { id: 85, title: "Long Walk to Freedom", author: "Nelson Mandela", cat: "Memoir", tags: ["COURAGE", "MOTIVATE"], readerLevel: "Senior" },
  { id: 86, title: "Steve Jobs", author: "Walter Isaacson", cat: "Biography", tags: ["MOTIVATE"], readerLevel: "Senior" },
  { id: 87, title: "Becoming", author: "Michelle Obama", cat: "Memoir", tags: ["MOTIVATE", "COMFORT"], readerLevel: "Senior" },
  { id: 88, title: "Wings of Fire", author: "A. P. J. Abdul Kalam", cat: "Indian", tags: ["MOTIVATE", "COURAGE"], readerLevel: "Any" },
  { id: 89, title: "My Experiments with Truth", author: "M. K. Gandhi", cat: "Indian", tags: ["CALM", "CURIOUS"], readerLevel: "Senior" },
  { id: 90, title: "The Discovery of India", author: "Jawaharlal Nehru", cat: "Indian", tags: ["CURIOUS"], readerLevel: "Senior" },
  { id: 91, title: "Malgudi Days", author: "R. K. Narayan", cat: "Indian", tags: ["CHEER", "COMFORT"], readerLevel: "Any" },
  { id: 92, title: "The Room on the Roof", author: "Ruskin Bond", cat: "Indian", tags: ["COMFORT", "CHEER"], readerLevel: "Junior" },
  { id: 93, title: "The Blue Umbrella", author: "Ruskin Bond", cat: "Indian", tags: ["CHEER", "COMFORT"], readerLevel: "Junior" },
  { id: 94, title: "Gitanjali", author: "Rabindranath Tagore", cat: "Indian", tags: ["CALM", "COMFORT"], readerLevel: "Senior" },
  { id: 95, title: "The Bhagavad Gita", author: "Vyasa", cat: "Indian", tags: ["CALM", "COURAGE"], readerLevel: "Senior" },
  { id: 96, title: "Panchatantra", author: "Vishnu Sharma", cat: "Indian", tags: ["LAUGH", "CURIOUS"], readerLevel: "Junior" },
  { id: 97, title: "The Palace of Illusions", author: "Chitra Banerjee Divakaruni", cat: "Indian", tags: ["ESCAPE"], readerLevel: "Senior" },
  { id: 98, title: "The Immortals of Meluha", author: "Amish Tripathi", cat: "Indian", tags: ["ESCAPE"], readerLevel: "Any" },
  { id: 99, title: "Godaan", author: "Munshi Premchand", cat: "Indian", tags: ["COMFORT", "CURIOUS"], readerLevel: "Senior" },
  { id: 100, title: "Swami and Friends", author: "R. K. Narayan", cat: "Indian", tags: ["LAUGH", "CHEER"], readerLevel: "Junior" }
];

export const MOOD_TAGS = [
  "CALM",
  "CHEER",
  "MOTIVATE",
  "LAUGH",
  "COMFORT",
  "CURIOUS",
  "COURAGE",
  "ESCAPE"
] as const;

export type MoodTag = typeof MOOD_TAGS[number];

// Emotion mapping for fallback:
// sad -> COMFORT,CHEER | stressed/anxious/angry -> CALM | bored -> ESCAPE,LAUGH
// tired/unmotivated -> MOTIVATE | lonely -> COMFORT | nervous/scared -> COURAGE
// confused -> CURIOUS | happy/excited -> LAUGH,ESCAPE | neutral -> CURIOUS,ESCAPE
export const EMOTION_TAG_MAP: Record<string, string[]> = {
  sad: ["COMFORT", "CHEER"],
  grief: ["COMFORT", "CHEER"],
  depressed: ["COMFORT", "CHEER"],
  stressed: ["CALM"],
  anxious: ["CALM"],
  angry: ["CALM"],
  frustrated: ["CALM"],
  overwhelmed: ["CALM"],
  bored: ["ESCAPE", "LAUGH"],
  tired: ["MOTIVATE"],
  unmotivated: ["MOTIVATE"],
  exhausted: ["MOTIVATE", "CALM"],
  lonely: ["COMFORT"],
  isolated: ["COMFORT"],
  nervous: ["COURAGE"],
  scared: ["COURAGE"],
  fearful: ["COURAGE"],
  confused: ["CURIOUS"],
  lost: ["CURIOUS", "COMFORT"],
  happy: ["LAUGH", "ESCAPE"],
  excited: ["LAUGH", "ESCAPE"],
  neutral: ["CURIOUS", "ESCAPE"]
};

// Compact representation generator for Gemini prompt
export function getCompactBooksPrompt(): string {
  return BOOKS.map(b => `${b.id}:${b.title} - ${b.author} [${b.tags.join(',')}]`).join('\n');
}

// Fallback book picker
export function getFallbackBooks(emotion: string, readerLevel: string = "Any"): { id: number; why: string }[] {
  const normEmotion = emotion.toLowerCase();
  let matchedTags: string[] = ["CURIOUS", "ESCAPE"];
  
  for (const [key, tags] of Object.entries(EMOTION_TAG_MAP)) {
    if (normEmotion.includes(key)) {
      matchedTags = tags;
      break;
    }
  }

  // Filter books matching at least one tag
  let candidates = BOOKS.filter(b => b.tags.some(t => matchedTags.includes(t)));
  if (readerLevel !== "Any") {
    const levelFiltered = candidates.filter(b => b.readerLevel === readerLevel || b.readerLevel === "Any");
    if (levelFiltered.length >= 3) {
      candidates = levelFiltered;
    }
  }
  
  if (candidates.length < 3) {
    candidates = [...BOOKS];
  }

  // Shuffle and pick 3
  const shuffled = [...candidates].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  const fallbackWhys: Record<string, string[]> = {
    COMFORT: ["A warm, reassuring narrative that reminds you that you are never truly alone.", "Gentle storytelling to bring solace and ease your mind."],
    CHEER: ["An uplifting story full of warmth, humor, and brighter horizons.", "A delightful page-turner guaranteed to lift your spirits."],
    CALM: ["A tranquil read that steadies the pulse and offers peaceful perspective.", "Provides timeless clarity when everything feels fast and hectic."],
    MOTIVATE: ["Spark your drive and rediscover your inner resilience and purpose.", "A powerful reminder that small steps create profound transformation."],
    LAUGH: ["Witty, clever humor to replace heaviness with genuine laughter.", "An amusing, joyful escapade that makes life feel much lighter."],
    CURIOUS: ["Fascinating questions and discoveries that expand the mind.", "Explores deeper mysteries that spark wonder and curiosity."],
    COURAGE: ["A hero's fortitude to help you stand firm against whatever you face.", "Inspiring bravery to overcome doubts and conquer fear."],
    ESCAPE: ["Immerse yourself into a gripping world far away from daily pressures.", "An adventurous journey that lets you unplug and recharge completely."]
  };

  return selected.map(book => {
    const tag = book.tags[0] || "CURIOUS";
    const whys = fallbackWhys[tag] || ["A wonderful perspective shift for your day."];
    const why = whys[Math.floor(Math.random() * whys.length)];
    return {
      id: book.id,
      why
    };
  });
}
