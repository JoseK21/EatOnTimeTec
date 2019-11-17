import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultInfoPassengerComponent } from './consult-info-passenger.component';

describe('ConsultInfoPassengerComponent', () => {
  let component: ConsultInfoPassengerComponent;
  let fixture: ComponentFixture<ConsultInfoPassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultInfoPassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultInfoPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
