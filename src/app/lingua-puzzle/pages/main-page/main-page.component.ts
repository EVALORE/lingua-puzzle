import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SourceBlockComponent } from '../../components/source-block/source-block.component';
import { ResultBlockComponent } from '../../components/result-block/result-block.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SourceBlockComponent, ResultBlockComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {}
