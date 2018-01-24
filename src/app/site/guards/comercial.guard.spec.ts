import { TestBed, async, inject } from '@angular/core/testing';

import { ComercialGuard } from './comercial.guard';

describe('ComercialGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComercialGuard]
    });
  });

  it('should ...', inject([ComercialGuard], (guard: ComercialGuard) => {
    expect(guard).toBeTruthy();
  }));
});
