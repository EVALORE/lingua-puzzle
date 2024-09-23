import { PositionStatus } from './../../shared/enums/position-status';
import { inject, Injectable, signal } from '@angular/core';
import { Word } from '../../shared/types/http-data.interface';
import { shuffle } from '../../shared/utils/shuffle';
import { HttpDataService } from '../../core/services/http-data.service';
import { Card } from '../../shared/types/card.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public isWin = signal(false);
  private readonly httpData = inject(HttpDataService);

  private readonly exampleSentence = 'the quick brown fox jumps over the lazy dog';

  public sentences: Word[] = [];
  private sentenceId = 0;
  private currentRound = 0;
  public sentenceTranslation = signal('');
  public sentence = '';
  public sentenceAudio = new Audio();
  public imageSrc = signal<string>('');

  public source = signal<Card[]>([]);
  public result = signal<Card[]>([]);

  constructor() {
    this.httpData.getRound(this.currentRound).subscribe((round) => {
      this.sentences = round.words;
      this.imageSrc.set(`project-data/images/${round.levelData.imageSrc}`);
      this.setSentence(this.sentences);
    });
  }

  public setSentence(sentences: Word[]): void {
    this.result.set([]);
    this.isWin.set(false);
    const sentence = sentences[this.sentenceId];

    this.sentenceAudio.src = `project-data/${sentence.audioExample}`;
    this.sentence = sentence.textExample;
    this.sentenceTranslation.set(sentence.textExampleTranslate);
    this.source.set(this.createCardsFromSentence(this.sentence));
  }

  public nextSentence(): void {
    if (this.isLastSentence()) {
      this.currentRound += 1;
      this.httpData.getRound(this.currentRound).subscribe((round) => {
        this.sentences = round.words;
        this.setSentence(this.sentences);
      });
      return;
    }
    this.sentenceId = (this.sentenceId + 1) % this.sentences.length;
    this.setSentence(this.sentences);
  }

  private isLastSentence(): boolean {
    return this.sentenceId === this.sentences.length - 1;
  }

  private createCardsFromSentence(sentence: string): Card[] {
    return shuffle<Card>(sentence.split(' ').map(this.createCard.bind(this)));
  }

  private createCard(word: string, index: number): Card {
    return {
      word,
      width: this.calculateCardWidth(word.length),
      positionStatus: PositionStatus.PENDING,
      originalIndex: index,
    };
  }

  private calculateCardWidth(numberOfChars: number): string {
    return `${String((numberOfChars * 100) / this.charInSentence)}%`;
  }

  public get charInSentence(): number {
    return this.sentence.replace(/\s/g, '').length;
  }

  public moveToResult(wordIndex: number): void {
    this.result.set([...this.result(), this.source()[wordIndex]]);
    this.source.update((source) => source.filter((_, index) => index !== wordIndex));
  }

  public moveToSource(wordIndex: number): void {
    this.resetCardsStatus();
    this.source.set([...this.source(), this.result()[wordIndex]]);
    this.result.update((result) => result.filter((_, index) => index !== wordIndex));
    this.isWin.set(false);
  }

  public sortCardsInCorrectOrder(): void {
    const sentenceWords = this.sentence.split(' ');
    const cards = this.result();

    for (let index = 0; index < cards.length; index += 1) {
      const card = cards[index];
      if (card.originalIndex !== index && card.word !== sentenceWords[index]) {
        cards.splice(index, 1);
        cards.splice(card.originalIndex, 0, card);
        index -= 1;
      }
    }

    this.checkCards();
  }

  public checkCards(): void {
    this.updateCardsPositionStatus(this.result());
    this.updateIsWin();
  }

  private checkResultCorrectness(): boolean {
    return this.result().every((card) => card.positionStatus === PositionStatus.CORRECT);
  }

  private updateIsWin(): void {
    this.isWin.set(this.checkResultCorrectness());
  }

  private resetCardsStatus(): void {
    this.result().forEach((card) => {
      card.positionStatus = PositionStatus.PENDING;
    });
  }

  private updateCardsPositionStatus(cards: Card[]): void {
    const sentenceWords = this.sentence.split(' ');
    cards.forEach((card, index) => {
      card.positionStatus =
        card.word === sentenceWords[index] ? PositionStatus.CORRECT : PositionStatus.WRONG;
    });
  }
}
