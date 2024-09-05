import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const { componentInstance: app } = fixture;
    expect(app).toBeTruthy();
  });

  it(`should have the 'lingua-puzzle' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const { componentInstance: app } = fixture;
    expect(app.title).toEqual('lingua-puzzle');
  });
});
