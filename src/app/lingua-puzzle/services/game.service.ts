import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly exampleSentence = 'the quick brown fox jumps over the lazy dog';

  public readonly result = [];
  public source = Array.from(this.exampleSentence);
}
