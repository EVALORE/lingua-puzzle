import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent {}
