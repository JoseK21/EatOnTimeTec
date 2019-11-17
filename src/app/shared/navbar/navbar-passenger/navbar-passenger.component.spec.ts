import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPassengerComponent } from './navbar-passenger.component';

describe('NavbarPassengerComponent', () => {
  let component: NavbarPassengerComponent;
  let fixture: ComponentFixture<NavbarPassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarPassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
