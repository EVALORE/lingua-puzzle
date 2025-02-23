import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TimesDirective } from '../../../shared/directives/times/times.directive';

@Component({
  selector: 'app-level-round-dropdown',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, TimesDirective],
  templateUrl: './level-round-dropdown.component.html',
  styleUrl: './level-round-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelRoundDropdownComponent {
  public puzzleIndex = model.required<number>();
  public levelNumber = model.required<number>();

  public totalPuzzles = input.required<number>();
  public totalLevels = input.required<number>();
}
