/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalizedRoutingService } from './localized-routing.service';

describe('Service: LocalizedRouting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizedRoutingService]
    });
  });

  it('should ...', inject([LocalizedRoutingService], (service: LocalizedRoutingService) => {
    expect(service).toBeTruthy();
  }));
});
