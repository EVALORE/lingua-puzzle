import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
  MatSelectTrigger,
} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { LevelService } from '../../services/level/level.service';

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
  protected currentLevel = this.levelService.currentLevel;
}
