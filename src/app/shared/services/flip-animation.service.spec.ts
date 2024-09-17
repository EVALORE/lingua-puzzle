import { TestBed } from '@angular/core/testing';

import { FlipAnimationService } from './flip-animation.service';

describe('FlipAnimationService', () => {
  let service: FlipAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlipAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
