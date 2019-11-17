import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPassengerComponent } from './report-passenger.component';

describe('ReportPassengerComponent', () => {
  let component: ReportPassengerComponent;
  let fixture: ComponentFixture<ReportPassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
