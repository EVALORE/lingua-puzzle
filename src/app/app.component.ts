import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalComponent, HeaderComponent],
  templateUrl: './app.component.html',
  providers: [],
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
