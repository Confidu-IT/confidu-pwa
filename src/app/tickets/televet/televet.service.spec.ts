import { TestBed } from '@angular/core/testing';

import { TelevetService } from './televet.service';

describe('TelevetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelevetService = TestBed.get(TelevetService);
    expect(service).toBeTruthy();
  });
});
