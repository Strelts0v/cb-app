import { TestBed, inject } from '@angular/core/testing';

import { MapSearchService } from './map-search.service';

describe('MapSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapSearchService]
    });
  });

  it('should be created', inject([MapSearchService], (service: MapSearchService) => {
    expect(service).toBeTruthy();
  }));
});
