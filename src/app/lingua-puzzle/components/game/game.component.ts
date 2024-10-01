import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { HintsComponent } from '../hints/hints.component';
import { PuzzleComponent } from '../puzzle/puzzle.component';
import { PuzzleService } from '../../services/puzzle/puzzle.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../../core/storage/services/local-storage/local-storage.service';

interface hintsSettingStorage {
  translation: boolean;
  audio: boolean;
  picture: boolean;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatButton, HintsComponent, PuzzleComponent, MatCheckbox, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  private readonly localStorage = inject(LocalStorageService);
  public readonly hintsSetting = {
    translation: signal<boolean>(this.getSettingFromStorage().translation),
    audio: signal<boolean>(this.getSettingFromStorage().audio),
    picture: signal<boolean>(this.getSettingFromStorage().picture),
  };

  private readonly puzzleService = inject(PuzzleService);
  protected isSourceEmpty = this.puzzleService.isSourceEmpty;
  protected isWin = this.puzzleService.arePositionsCorrect;

  constructor() {
    effect(() => {
      this.localStorage.setItem('hintsSetting', {
        translation: this.hintsSetting.translation(),
        audio: this.hintsSetting.audio(),
        picture: this.hintsSetting.picture(),
      });
    });
  }

  protected startResultAutoComplete(): void {
    this.puzzleService.sortCardsByOriginalIndex();
  }

  protected nextSentence(): void {
    this.puzzleService.nextSentence();
  }

  protected checkResultCorrectness(): void {
    this.puzzleService.updateCardsPositionStatus();
  }

  private getSettingFromStorage(): hintsSettingStorage {
    const defaultSettings = {
      translation: true,
      picture: true,
      audio: true,
    };

    return this.localStorage.getItem<hintsSettingStorage>(
      'hintsSetting',
      defaultSettings,
    ) as hintsSettingStorage;
  }

  public ngOnInit(): void {
    this.getSettingFromStorage();
  }
}
