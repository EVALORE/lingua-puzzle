export interface WordEntry {
  id: number;
  term: string;
  translation: string;
  sentence: string;
  sentenceTranslation: string;
  sentenceAudio: string;
}

export interface PuzzleArtwork {
  id: string;
  name: string;
  author: string;
  year: string;
  fullImageSrc: string;
  croppedImageSrc: string;
}

export interface Puzzle {
  artwork: PuzzleArtwork;
  words: WordEntry[];
}

export interface GameLevel {
  puzzles: Puzzle[];
  totalPuzzles: number;
}
