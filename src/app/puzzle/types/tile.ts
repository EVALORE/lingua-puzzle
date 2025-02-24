import { PositionStatus } from '../enums/position-status';

export interface Tile {
  word: string;
  width: number;
  initialIndex: number;
  positionStatus: PositionStatus;
  xOffset?: number;
  yOffset?: number;
}
