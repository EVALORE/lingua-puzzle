import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { MatCard } from '@angular/material/card';
import { cardHeight, puzzleWidth } from '../../consts/ui-layout.const';
import { GameService } from '../../services/game/game.service';
import { Card } from '../../types/card';
import { Sentence } from '../../types/http-data';
import { CardService } from '../../services/card/card.service';
import { MatButton } from '@angular/material/button';
import { CardListComponent } from '../card-list/card-list.component';
import { PositionStatus } from '../../enums/position-status';
import { HintsComponent } from '../hints/hints.component';
import { HttpDataService } from '../../services/http-data/http-data.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { shuffle } from '../../utils/shuffle';

interface BoardStyles {
  width: string;
  height: string;
}

@Component({
  selector: 'app-game',
  imports: [MatCard, MatButton, CardListComponent, HintsComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  private readonly gameService = inject(GameService);
  private readonly cardService = inject(CardService);
  private readonly httpDataService = inject(HttpDataService);

  public sentences = input.required<Sentence[]>();
  protected puzzleSolved = output();

  private readonly sentence = computed(() => {
    const sentenceIndex = this.gameService.sentenceIndex();
    const sentences = this.sentences();

    return sentences[sentenceIndex];
  });

  protected readonly completedSentences: Card[][] = [];
  protected readonly source = signal<Card[]>([]);
  protected readonly result = signal<Card[]>([]);

  private numberOfSentences = computed(() => this.sentences().length);
  protected isSourceEmpty = computed(() => !this.source().length);
  protected isResultCorrect = computed(() =>
    this.result().every((card) => card.positionStatus === PositionStatus.CORRECT),
  );
  protected isSolved = computed(
    () => this.gameService.sentenceIndex() === this.numberOfSentences() - 1,
  );

  private newPuzzle$ = toObservable(this.sentences).pipe(
    takeUntilDestroyed(),
    tap(() => {
      this.setSource();
      this.gameService.sentenceIndex.set(0);
    }),
  );

  constructor() {
    this.newPuzzle$.subscribe();
  }

  public setSource(): void {
    const { textExample } = this.sentence();
    const cards = this.cardService.createCardsFromSentence(textExample);
    this.source.set(shuffle(cards));
  }

  protected hintsToShow(): { audio?: string; translation?: string } {
    const sentence = this.sentence();

    return {
      audio: this.httpDataService.getAudioFullPath(sentence.audioExample),
      translation: sentence.textExampleTranslate,
    };
  }

  protected checkCards(): void {
    this.result.update((cards) => this.cardService.updateCardsPositionStatus(cards));
  }

  protected handleNextStep(): void {
    this.finalizeResult();

    if (this.isSolved()) {
      this.puzzleSolved.emit();
      this.clearCompletedSentences();
      return;
    }

    this.nextSentence();
  }

  private nextSentence(): void {
    const nextSentenceIndex = this.gameService.sentenceIndex() + 1;
    this.gameService.setSentenceIndex(nextSentenceIndex);
    this.setSource();
  }

  protected finalizeResult(): void {
    this.completedSentences.push(this.result());
    this.clearResult();
  }

  private clearResult(): void {
    this.result.set([]);
  }

  private clearCompletedSentences(): void {
    this.completedSentences.length = 0;
  }

  protected moveToResult(cardIndex: number): void {
    this.gameService.moveCard(cardIndex, this.source, this.result);
  }

  protected moveToSource(cardIndex: number): void {
    this.result.update(this.cardService.resetCardsPositionStatus.bind(this));
    this.gameService.moveCard(cardIndex, this.result, this.source);
  }

  protected getBoardStyles(): BoardStyles {
    return {
      width: puzzleWidth.px,
      height: `${String(cardHeight.number * this.numberOfSentences())}px`,
    };
  }

  protected autoCompleteSentence(): void {
    this.result.update(this.cardService.sortCardsByOriginalIndex.bind(this));
    this.checkCards();
  }
}
