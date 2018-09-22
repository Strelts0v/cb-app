import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSearchFormComponent } from './map-search-form.component';

describe('MapSearchFormComponent', () => {
  let component: MapSearchFormComponent;
  let fixture: ComponentFixture<MapSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
