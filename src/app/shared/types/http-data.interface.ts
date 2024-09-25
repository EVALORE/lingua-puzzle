export interface Level {
  rounds: Round[];
  roundsCount: number;
}

export interface Round {
  levelData: Picture;
  words: Sentence[];
}

export interface Picture {
  author: string;
  cutSrc: string;
  id: string;
  imageSrc: string;
  name: string;
  year: string;
}

export interface Sentence {
  audioExample: string;
  id: number;
  textExample: string;
  textExampleTranslate: string;
  word: string;
  wordTranslate: string;
}
