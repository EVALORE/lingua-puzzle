import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartPageComponent {}
