export interface localStorageStore {
  game: {
    level: number;
    round: number;
    sentenceIndex: number;
  };
  user: {
    name: string;
    surname: string;
  };
}
