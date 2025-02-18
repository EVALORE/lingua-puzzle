import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TimesDirective } from '../../../shared/times.directive';

@Component({
  selector: 'app-level-round-dropdown',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, TimesDirective],
  templateUrl: './level-round-dropdown.component.html',
  styleUrl: './level-round-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelRoundDropdownComponent {
  public levels = model.required<number>();
  public rounds = model.required<number>();

  public roundsCount = input.required<number>();
  public levelsCount = input.required<number>();
}
