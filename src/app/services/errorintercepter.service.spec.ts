import { TestBed } from '@angular/core/testing';

import { ErrorintercepterService } from './errorintercepter.service';

describe('ErrorintercepterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorintercepterService = TestBed.get(ErrorintercepterService);
    expect(service).toBeTruthy();
  });
});
