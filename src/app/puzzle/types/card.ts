import { PositionStatus } from '../enums/position-status';

export interface Card {
  word: string;
  width: number;
  originalIndex: number;
  positionStatus: PositionStatus;
  xOffset?: number;
  yOffset?: number;
}
