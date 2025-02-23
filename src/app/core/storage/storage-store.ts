import { CompletionStatus } from '../../puzzle/enums/completion-status';

type LevelKey = `level${number}`;
type Progress = Record<LevelKey, CompletionStatus[]>;

export interface LocalStorageStore {
  game: {
    level: number;
    puzzle: number;
    sentenceIndex: number;
  };
  hintsSettings: {
    translation: boolean;
    audio: boolean;
    picture: boolean;
  };
  user: {
    name: string;
    surname: string;
    progress: Progress;
  };
}
