import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
  MatSelectTrigger,
} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { LevelsService } from '../../services/levels/levels.service';

@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [MatSelect, FormsModule, MatFormField, MatSelectTrigger, MatOption, MatLabel],
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelsComponent {
  public readonly levelsService = inject(LevelsService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.levelsService.getLevel().pipe().subscribe((level) => {});
  }

  public changeLevel(): void {}

  protected changeRound(): void {}
}
