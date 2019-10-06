import { TestBed } from '@angular/core/testing';

import { FishService } from './fish.service';

describe('FishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FishService = TestBed.get(FishService);
    expect(service).toBeTruthy();
  });
});
