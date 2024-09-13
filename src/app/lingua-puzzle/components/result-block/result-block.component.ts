import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-result-block',
  standalone: true,
  imports: [],
  templateUrl: './result-block.component.html',
  styleUrl: './result-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultBlockComponent {

}
