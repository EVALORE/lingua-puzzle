import { CompletionStatus } from '../enums/completion-status';
import { Round } from './http-data';

export interface RoundData {
  round: Round;
  completionStatus: CompletionStatus;
}
