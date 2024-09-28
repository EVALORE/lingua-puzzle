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
import { Card } from '../../../shared/types/card.interface';
import { PictureService } from '../../services/picture/picture.service';
import { PuzzleService } from '../../services/puzzle/puzzle.service';

@Component({
  selector: 'app-puzzle',
  standalone: true,
  imports: [MatCard, WordCardDirective, CdkDrag, CdkDropList, CardListComponent],
  templateUrl: './puzzle.component.html',
  styleUrl: './puzzle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PuzzleComponent {
  private readonly puzzleService = inject(PuzzleService);
  private readonly pictureService = inject(PictureService);

  protected result = this.puzzleService.result;
  protected source = this.puzzleService.source;
  protected completedSentences = this.puzzleService.completedSentences;
  protected picture = computed(() => this.pictureService.src);

  protected moveToSource(wordIndex: number): void {
    this.puzzleService.moveToSource(wordIndex);
  }

  protected moveToResult(wordIndex: number): void {
    this.puzzleService.moveToResult(wordIndex);
  }

  protected drop(event: CdkDragDrop<Card[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
