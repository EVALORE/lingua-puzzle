import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PuzzleComponent } from './puzzle/puzzle.component';

@Component({
  selector: 'app-root',
  imports: [PuzzleComponent],
  templateUrl: './app.component.html',
  providers: [],
  styleUrl: './app.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
