import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TimesPipe } from '../../../shared/pipes/times/times.pipe';

@Component({
  selector: 'app-puzzle-selector',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, TimesPipe],
  templateUrl: './puzzle-selector.component.html',
  styleUrl: './puzzle-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PuzzleSelectorComponent {
  public puzzleIndex = model.required<number>();
  public levelNumber = model.required<number>();

  public totalPuzzles = input.required<number>();
  public totalLevels = input.required<number>();
}
