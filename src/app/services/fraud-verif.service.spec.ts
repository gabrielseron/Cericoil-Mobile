import { TestBed } from '@angular/core/testing';

import { FraudVerifService } from './fraud-verif.service';

describe('FraudVerifService', () => {
  let service: FraudVerifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FraudVerifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
