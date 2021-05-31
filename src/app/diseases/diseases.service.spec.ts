import { TestBed } from '@angular/core/testing';

import { DiseasesService } from './diseases.service';

describe('DiseasesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiseasesService = TestBed.get(DiseasesService);
    expect(service).toBeTruthy();
  });
});
