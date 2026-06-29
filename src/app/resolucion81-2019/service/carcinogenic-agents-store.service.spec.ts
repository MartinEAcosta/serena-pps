import { TestBed } from '@angular/core/testing';

import { CarcinogenicAgentsStoreService } from './carcinogenic-agents-store.service';

describe('CarcinogenicAgentsStoreService', () => {
  let service: CarcinogenicAgentsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarcinogenicAgentsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
