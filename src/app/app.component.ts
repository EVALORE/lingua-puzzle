import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpDataService } from './core/http-data/http-data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  providers: [HttpDataService],
  styleUrl: './app.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
