import {CompletionStatus} from '../enums/completion-status';
import {Puzzle} from './http-data';

export interface RoundData {
  puzzle: Puzzle;
  completionStatus: CompletionStatus;
}
