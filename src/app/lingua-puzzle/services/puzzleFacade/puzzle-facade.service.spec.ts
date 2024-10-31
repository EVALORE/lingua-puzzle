import { TestBed } from '@angular/core/testing';

import { PuzzleFacadeService } from './puzzle-facade.service';

describe('PuzzleFacadeService', () => {
  let service: PuzzleFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
