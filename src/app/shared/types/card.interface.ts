import { PositionStatus } from './../enums/position-status';
export interface Card {
  word: string;
  width: string;
  positionStatus: PositionStatus;
}
