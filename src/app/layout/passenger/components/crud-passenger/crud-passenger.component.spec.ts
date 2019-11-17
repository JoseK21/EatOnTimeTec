import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPassengerComponent } from './crud-passenger.component';

describe('CrudPassengerComponent', () => {
  let component: CrudPassengerComponent;
  let fixture: ComponentFixture<CrudPassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudPassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
