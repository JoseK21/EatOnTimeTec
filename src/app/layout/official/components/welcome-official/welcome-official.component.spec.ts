import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeOfficialComponent } from './welcome-official.component';

describe('WelcomeOfficialComponent', () => {
  let component: WelcomeOfficialComponent;
  let fixture: ComponentFixture<WelcomeOfficialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeOfficialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
