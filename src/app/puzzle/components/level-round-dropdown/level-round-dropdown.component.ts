import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
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

  // public levelsCount = input.required<{ count: number; current: Signal<number> }>();
  // public roundsCount = input.required<{ count: Signal<number>; current: Signal<number> }>();

  public levelsCount = input.required<{ count: number; current: number }>();
  public roundsCount = input.required<{ count: number; current: number }>();

  protected level = new FormControl(DEFAULT_LEVEL, { nonNullable: true });
  protected round = new FormControl(DEFAULT_ROUND_INDEX, { nonNullable: true });

  constructor() {
    effect(() => {
      this.level.setValue(this.levelsCount().current);
      this.round.setValue(this.roundsCount().current);
    });
  }

  protected createOptions(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index);
  }

  protected onLevelChange(): void {
    this.levelChange.emit(this.level.value);
  }

  protected onRoundChange(): void {
    this.roundChange.emit(this.round.value);
  }
}
