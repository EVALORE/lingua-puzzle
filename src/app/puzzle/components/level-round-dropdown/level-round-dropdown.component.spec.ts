import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelRoundDropdownComponent } from './level-round-dropdown.component';

describe('LevelRoundDropdownComponent', () => {
  let component: LevelRoundDropdownComponent;
  let fixture: ComponentFixture<LevelRoundDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelRoundDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelRoundDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
