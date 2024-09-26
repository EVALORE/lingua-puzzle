import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CardListComponent } from '../card-list/card-list.component';
import { MatCard } from '@angular/material/card';
import { WordCardDirective } from '../../directives/word-card.directive';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { GameService } from '../../services/game.service';
import { Card } from '../../../shared/types/card.interface';
import { PictureService } from '../../services/picture/picture.service';

@Component({
  selector: 'app-puzzle',
  standalone: true,
  imports: [MatCard, WordCardDirective, CdkDrag, CdkDropList, CardListComponent],
  templateUrl: './puzzle.component.html',
  styleUrl: './puzzle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PuzzleComponent {
  private readonly gameService = inject(GameService);
  private readonly pictureService = inject(PictureService);
  protected source = this.gameService.source;
  protected result = this.gameService.result;
  protected completedSentences: Card[][] = [];
  protected picture = computed(() => this.pictureService.src);

  protected moveToSource(wordIndex: number): void {
    this.gameService.moveToSource(wordIndex);
  }

  protected moveToResult(wordIndex: number): void {
    this.gameService.moveToResult(wordIndex);
  }

  protected drop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
