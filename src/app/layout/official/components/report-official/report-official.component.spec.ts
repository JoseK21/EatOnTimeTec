import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOfficialComponent } from './report-official.component';

describe('ReportOfficialComponent', () => {
  let component: ReportOfficialComponent;
  let fixture: ComponentFixture<ReportOfficialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOfficialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOfficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
