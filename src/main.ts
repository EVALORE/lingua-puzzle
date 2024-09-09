import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((appErr: unknown) => {
  // eslint-disable-next-line no-console
  console.error(appErr);
});
