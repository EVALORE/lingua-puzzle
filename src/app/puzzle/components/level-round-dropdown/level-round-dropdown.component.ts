import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LevelData } from '../../types/level-data';
import { DEFAULT_LEVEL, DEFAULT_ROUND_INDEX } from '../../consts/default_values.const';

@Component({
  selector: 'app-level-round-dropdown',
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './level-round-dropdown.component.html',
  styleUrl: './level-round-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelRoundDropdownComponent {
  protected levelChange = output<number>();
  protected roundChange = output<number>();

  public levels = input.required<LevelData[]>();
  public rounds = input.required<LevelData[] | null>();

  protected level = new FormControl(DEFAULT_LEVEL, { nonNullable: true });
  protected round = new FormControl(DEFAULT_ROUND_INDEX, { nonNullable: true });

  constructor() {
    this.onLevelChange();
  }

  protected onLevelChange(): void {
    this.levelChange.emit(this.level.value);
  }

  protected onRoundChange(): void {
    this.roundChange.emit(this.round.value);
  }
}
