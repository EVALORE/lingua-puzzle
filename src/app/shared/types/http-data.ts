export interface LevelData {
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

export interface Round {
  levelData: LevelData;
  words: Sentence[];
}

export interface LevelResponse {
  rounds: Round[];
  roundsCount: number;
}
