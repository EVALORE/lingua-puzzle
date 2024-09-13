import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceBlockComponent } from './source-block.component';

describe('SourceBlockComponent', () => {
  let component: SourceBlockComponent;
  let fixture: ComponentFixture<SourceBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourceBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SourceBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
