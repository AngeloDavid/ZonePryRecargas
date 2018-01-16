import { TestBed, inject } from '@angular/core/testing';

import { MaquinaService } from './maquina.service';

describe('MaquinaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaquinaService]
    });
  });

  it('should be created', inject([MaquinaService], (service: MaquinaService) => {
    expect(service).toBeTruthy();
  }));
});
