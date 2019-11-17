import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOfficialComponent } from './navbar-official.component';

describe('NavbarOfficialComponent', () => {
  let component: NavbarOfficialComponent;
  let fixture: ComponentFixture<NavbarOfficialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarOfficialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
