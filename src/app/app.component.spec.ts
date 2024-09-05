import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WINDOW } from './core/storage/tokens/window.token';
import { STORAGE_KEY_PREFIX } from './core/storage/tokens/storage-key.token';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: WINDOW, useValue: window },
        { provide: STORAGE_KEY_PREFIX, useValue: 'LP-STORAGE' },
      ],
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'lingua-puzzle' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('lingua-puzzle');
  });
});
