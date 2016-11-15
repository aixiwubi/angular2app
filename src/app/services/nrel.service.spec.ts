/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NrelService } from './nrel.service';

describe('Service: Nrel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NrelService]
    });
  });

  it('should ...', inject([NrelService], (service: NrelService) => {
    expect(service).toBeTruthy();
  }));
});
