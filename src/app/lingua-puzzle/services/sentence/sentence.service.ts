import { inject, Injectable } from '@angular/core';
import { RoundService } from '../round/round.service';
import { Sentence } from '../../../shared/types/http-data.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SentenceService {
  private readonly roundService = inject(RoundService);
  private sentences: Sentence[] = [];
  public sentence = new Subject<Sentence>();
  public sentenceIndex = 0;

  constructor() {
    this.roundService.round.subscribe((round) => {
      this.sentences = round.words;
      this.sentenceIndex = 0;
      this.setSentence();
    });
  }

  public setSentence(): void {
    this.sentence.next(this.sentences[this.sentenceIndex]);
  }

  public nextSentence(): void {
    if (this.sentenceIndex < this.sentences.length - 1) {
      this.sentenceIndex += 1;
      this.setSentence();
    }
  }
}
