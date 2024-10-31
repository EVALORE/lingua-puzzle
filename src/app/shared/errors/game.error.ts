import { CustomError } from './custom.error';

export class GameError extends CustomError {
  constructor(message: string) {
    super({ message: `GameError: ${message}` });
  }
}
