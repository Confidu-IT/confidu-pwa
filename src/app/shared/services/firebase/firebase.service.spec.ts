import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';

describe('FirebseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    expect(service).toBeTruthy();
  });
});
