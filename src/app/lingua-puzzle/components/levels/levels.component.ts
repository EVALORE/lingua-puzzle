import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
  MatSelectTrigger,
} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { LevelService } from '../../services/level/level.service';
import { RoundService } from '../../services/round/round.service';

@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [MatSelect, FormsModule, MatFormField, MatSelectTrigger, MatOption, MatLabel],
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelsComponent {
  private readonly levelService = inject(LevelService);
  protected levels = this.levelService.levels;
  protected levelIndex = this.levelService.currentLevel;

  private readonly roundService = inject(RoundService);
  protected rounds = this.roundService.rounds;
  protected roundIndex = this.roundService.roundIndex;

  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    this.roundService.round.subscribe(() => {
      this.roundIndex = this.roundService.roundIndex;
      this.rounds = this.roundService.rounds;
      this.cdr.detectChanges();
    });
  }

  public changeLevel(): void {
    this.levelService.setLevel(this.levelIndex());
    this.roundIndex = 0;
    this.changeRound();
  }

  protected changeRound(): void {
    this.roundService.setRound(this.roundIndex);
  }
}
