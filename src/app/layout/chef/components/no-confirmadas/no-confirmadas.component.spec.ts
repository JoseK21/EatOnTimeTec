import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoConfirmadasComponent } from './no-confirmadas.component';

describe('NoConfirmadasComponent', () => {
  let component: NoConfirmadasComponent;
  let fixture: ComponentFixture<NoConfirmadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoConfirmadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoConfirmadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
