import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from './core/storage/local-storage/local-storage.service';
import { HttpDataService } from './core/http-data/http-data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  providers: [HttpDataService],
  styleUrl: './app.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'lingua-puzzle';
  private readonly lss = inject(LocalStorageService);
  private readonly httpData = inject(HttpDataService);
  constructor() {
    this.httpData.getLevel(1).subscribe((res) => console.log(res));
  }
}
