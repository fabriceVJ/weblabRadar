import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarAdminComponent } from './radar-admin.component';

describe('RadarAdminComponent', () => {
  let component: RadarAdminComponent;
  let fixture: ComponentFixture<RadarAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
