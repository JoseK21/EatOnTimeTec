import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeAdministratorComponent } from './welcome-administrator.component';

describe('WelcomeAdministratorComponent', () => {
  let component: WelcomeAdministratorComponent;
  let fixture: ComponentFixture<WelcomeAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
