import { TestBed } from '@angular/core/testing';

import { ShopwareService } from './shopware.service';

describe('ShopwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopwareService = TestBed.get(ShopwareService);
    expect(service).toBeTruthy();
  });
});
