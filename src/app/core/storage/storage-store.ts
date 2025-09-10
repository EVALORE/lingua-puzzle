import { User } from './types/user';
import { HintsSettings } from './types/hints-settings';
import { Game } from './types/game';

export interface LocalStorageStore {
  game: Game;
  hintsSettings: HintsSettings;
  user: User;
}
