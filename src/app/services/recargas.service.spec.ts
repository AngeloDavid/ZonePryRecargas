import { TestBed, inject } from '@angular/core/testing';

import { RecargasService } from './recargas.service';

describe('RecargasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecargasService]
    });
  });

  it('should be created', inject([RecargasService], (service: RecargasService) => {
    expect(service).toBeTruthy();
  }));
});
