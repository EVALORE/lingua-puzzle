export interface WordCollection {
  rounds: Round[];
  roundsCount: number;
}

export interface Round {
  levelData: LevelData;
  words: Word[];
}

export interface LevelData {
  author: string;
  cutSrc: string;
  id: string;
  imageSrc: string;
  name: string;
  year: string;
}

export interface Word {
  audioExample: string;
  id: number;
  textExample: string;
  textExampleTranslate: string;
  word: string;
  wordTranslate: string;
}
