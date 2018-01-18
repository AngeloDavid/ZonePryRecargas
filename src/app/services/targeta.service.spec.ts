import { TestBed, inject } from '@angular/core/testing';

import { TargetaService } from './targeta.service';

describe('TargetaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TargetaService]
    });
  });

  it('should be created', inject([TargetaService], (service: TargetaService) => {
    expect(service).toBeTruthy();
  }));
});
