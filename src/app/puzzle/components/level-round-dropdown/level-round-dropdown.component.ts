import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DEFAULT_LEVEL, DEFAULT_ROUND_COUNT } from '../../consts/level-info.const';
import { LevelInformation } from '../../types/level-information';

@Component({
  selector: 'app-level-round-dropdown',
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './level-round-dropdown.component.html',
  styleUrl: './level-round-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelRoundDropdownComponent {
  protected selectedLevel = output<number>();
  protected selectedRound = output<number>();

  public levels = input.required<LevelInformation[]>();
  public rounds = input.required<LevelInformation[]>();

  protected level = new FormControl(DEFAULT_LEVEL, { nonNullable: true });
  protected round = new FormControl(DEFAULT_ROUND_COUNT, { nonNullable: true });
}
