import { TestBed } from '@angular/core/testing';

import { WorkStructureStateService } from './work-structure-store.service';

describe('WorkStructureStateService', () => {
  let service: WorkStructureStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkStructureStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
