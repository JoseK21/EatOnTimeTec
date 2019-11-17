import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCheckInComponent } from './verify-check-in.component';

describe('VerifyCheckInComponent', () => {
  let component: VerifyCheckInComponent;
  let fixture: ComponentFixture<VerifyCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyCheckInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
