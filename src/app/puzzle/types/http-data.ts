// export interface Word {
//   audioExample: string;
//   id: number;
//   textExample: string;
//   textExampleTranslate: string;
//   value: string;
//   valueTranslate: string;
// }
//
// export interface RoundImageMeta {
//   author: string;
//   cutSrc: string;
//   id: string;
//   imageSrc: string;
//   name: string;
//   year: string;
// }
//
// export interface Round {
//   roundData: RoundImageMeta;
//   words: Word[];
// }
//
// export interface Level {
//   rounds: Round[];
//   roundsCount: number;
// }

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
