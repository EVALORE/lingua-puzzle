import { inject, Injectable, signal } from '@angular/core';
import { RoundService } from '../round/round.service';
import { Sentence } from '../../../shared/types/http-data.interface';

@Injectable({
  providedIn: 'root',
})
export class SentenceService {
  private readonly roundService = inject(RoundService);
  private sentences: Sentence[] = [];
  public sentence = signal({} as Sentence);
  public sentenceIndex = 0;

  constructor() {
    this.roundService.round.subscribe((round) => {
      this.sentences = round.words;
      this.sentenceIndex = 0;
      this.setSentence();
    });
  }

  public setSentence(): void {
    this.sentence.set(this.sentences[this.sentenceIndex]);
  }

  public nextSentence(): void {
    this.sentenceIndex = (this.sentenceIndex + 1) % this.sentences.length;
    this.setSentence();
  }
}
